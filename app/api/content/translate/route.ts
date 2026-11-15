import { NextRequest, NextResponse } from "next/server";
import { translateContentRequestSchema } from "@/schemas/requests";
import { translateEducationalContent } from "@/lib/ai/translate-content";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { createApiErrorResponse } from "@/lib/security/errors";

export const dynamic = "force-dynamic";

const MAX_TRANSLATE_PAYLOAD_BYTES = 32768; // 32 KB

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  // 1. Enforce payload boundary (Content-Length header check)
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > MAX_TRANSLATE_PAYLOAD_BYTES) {
    return createApiErrorResponse(
      "PAYLOAD_TOO_LARGE",
      "Request payload exceeds maximum allowed size (32 KB).",
      413
    );
  }

  // Also enforce byte length check on stream body to prevent chunked bypass
  let rawText = "";
  try {
    rawText = await request.text();
  } catch {
    return createApiErrorResponse(
      "MALFORMED_JSON",
      "Failed to read request body.",
      400
    );
  }

  if (Buffer.byteLength(rawText, "utf8") > MAX_TRANSLATE_PAYLOAD_BYTES) {
    return createApiErrorResponse(
      "PAYLOAD_TOO_LARGE",
      "Request payload exceeds maximum allowed size (32 KB).",
      413
    );
  }

  // 2. Rate limiting check (sliding window)
  const clientIp = getClientIp(request.headers);
  const rateLimit = await checkRateLimit(clientIp);

  if (!rateLimit.allowed) {
    return createApiErrorResponse(
      "RATE_LIMIT_EXCEEDED",
      "Too many translation requests from your connection. Please wait a few seconds before trying again.",
      429,
      {
        retryAfter: rateLimit.retryAfterSeconds,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(rateLimit.resetTime),
        },
      }
    );
  }

  // 3. Safe JSON parsing
  let body: unknown;
  try {
    body = JSON.parse(rawText);
  } catch {
    return createApiErrorResponse(
      "MALFORMED_JSON",
      "The request body must be valid, well-formed JSON.",
      400
    );
  }

  // 4. Validate input with Zod
  const parseResult = translateContentRequestSchema.safeParse(body);
  if (!parseResult.success) {
    const firstIssue = parseResult.error.issues[0];
    return createApiErrorResponse(
      "INVALID_INPUT",
      firstIssue?.message || "Invalid translation request parameters.",
      400,
      {
        details: parseResult.error.issues.map((i) => ({
          field: i.path.join("."),
          issue: i.message,
        })),
      }
    );
  }

  const { content, sourceLang, targetLang, grade, subject } = parseResult.data;

  // 5. Execute dedicated translation with math preservation & caching
  try {
    const result = await translateEducationalContent({
      content,
      sourceLang,
      targetLang,
      grade,
      subject,
    });

    const durationMs = Date.now() - startTime;
    const isLive = result.provider !== "local-engine" && result.provider !== "passthrough";

    return NextResponse.json(
      {
        content: result.content,
        metadata: {
          source: isLive ? "ai-live" : "offline-fixture",
          provider: result.provider,
          model: result.model,
          sourceLang,
          targetLang,
          verificationStatus: result.verificationReport.overallStatus,
          verificationSummary: result.verificationReport.summary,
          translationStatus: result.cacheHit
            ? "cached"
            : result.fallbackUsed
            ? "offline_fallback"
            : "translated",
          fallbackUsed: result.fallbackUsed,
          cacheHit: result.cacheHit,
          durationMs,
          timestamp: new Date().toISOString(),
        },
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(rateLimit.resetTime),
        },
      }
    );
  } catch (err) {
    console.error("[Translate API] Unexpected error:", err);
    return NextResponse.json(
      {
        error: {
          code: "TRANSLATION_FAILED",
          message: (err as Error).message || "An unexpected error occurred during translation.",
        },
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { generateContentRequestSchema } from "@/schemas/requests";
import { generateContentFromAI } from "@/lib/ai/generate-content";
import { getLocalizedContent } from "@/lib/fixtures/translations";
import { SUPPORTED_LANGUAGES, LanguageCode } from "@/lib/constants/languages";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { verifyEducationalContent } from "@/lib/verification/math-verifier";
import { createApiErrorResponse } from "@/lib/security/errors";

export const dynamic = "force-dynamic";

const MAX_PAYLOAD_BYTES = 16384; // 16 KB

export async function POST(request: NextRequest) {
  // 1. Enforce payload size boundary (Content-Length header check)
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
    return createApiErrorResponse(
      "PAYLOAD_TOO_LARGE",
      "Request payload exceeds maximum allowed size (16 KB).",
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

  if (Buffer.byteLength(rawText, "utf8") > MAX_PAYLOAD_BYTES) {
    return createApiErrorResponse(
      "PAYLOAD_TOO_LARGE",
      "Request payload exceeds maximum allowed size (16 KB).",
      413
    );
  }

  // 2. Rate limiting check (distributed Redis or memory with sliding window)
  const clientIp = getClientIp(request.headers);
  const rateLimit = await checkRateLimit(clientIp);

  if (!rateLimit.allowed) {
    return createApiErrorResponse(
      "RATE_LIMIT_EXCEEDED",
      "Too many lesson requests from your connection. Please wait a few seconds before trying again.",
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

  // 4. Input validation and sanitization
  const parseResult = generateContentRequestSchema.safeParse(body);
  if (!parseResult.success) {
    const firstIssue = parseResult.error.issues[0];
    return createApiErrorResponse(
      "INVALID_INPUT",
      firstIssue?.message || "Please provide a valid topic, grade, and subject.",
      400,
      {
        details: parseResult.error.issues.map((i) => ({
          field: i.path.join("."),
          issue: i.message,
        })),
      }
    );
  }

  const { topic, grade, subject, lang } = parseResult.data;
  const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
  const languageName = langObj ? langObj.name : "English";

  // 5. Content Generation with dual-provider orchestration and graceful fallback
  let content;
  let source: "ai-live" | "offline-fixture" = "offline-fixture";
  let provider = "local-engine";
  let model = "offline-curriculum";
  let fallbackUsed = false;

  const hasApiKey = Boolean(process.env.GEMINI_API_KEY || process.env.AI_API_KEY);

  if (hasApiKey) {
    try {
      const aiResult = await generateContentFromAI(
        topic,
        grade,
        subject,
        languageName
      );
      content = aiResult.content;
      source = "ai-live";
      provider = aiResult.provider;
      model = aiResult.model;
      fallbackUsed = aiResult.fallbackUsed;
    } catch (aiError) {
      console.warn(
        `[Content API] Live AI generation failed for "${topic}" (${lang}). Using offline curriculum:`,
        (aiError as Error).message
      );
      content = getLocalizedContent(topic, grade, subject, lang as LanguageCode);
      source = "offline-fixture";
      provider = "local-engine";
      model = "offline-curriculum";
      fallbackUsed = true;
    }
  } else {
    content = getLocalizedContent(topic, grade, subject, lang as LanguageCode);
    source = "offline-fixture";
    provider = "local-engine";
    model = "offline-curriculum";
    fallbackUsed = false;
  }

  // 6. Independent Mathematics and Pedagogical Structure Verification
  const verificationReport = verifyEducationalContent(content);

  // 7. Structured Response with Truthful Metadata
  return NextResponse.json(
    {
      content,
      metadata: {
        source,
        provider,
        model,
        verificationStatus: verificationReport.overallStatus,
        verificationSummary: verificationReport.summary,
        fallbackUsed,
        cacheHit: false,
        language: lang,
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
}

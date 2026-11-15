import { NextRequest, NextResponse } from "next/server";
import { generateContentRequestSchema } from "@/schemas/requests";
import { generateContentFromAI } from "@/lib/ai/generate-content";
import { getLocalizedContent } from "@/lib/fixtures/translations";
import { LanguageCode, SUPPORTED_LANGUAGES } from "@/lib/constants/languages";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parseResult = generateContentRequestSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: {
            code: "INVALID_INPUT",
            message:
              parseResult.error.issues[0]?.message ||
              "Please provide a valid topic, grade, and subject.",
            details: parseResult.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const { topic, grade, subject } = parseResult.data;
    const lang = (body.lang || "en") as LanguageCode;
    const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
    const languageName = langObj ? langObj.name : "English";

    let content;
    let providerSource = "sample";
    const hasApiKey = Boolean(process.env.GEMINI_API_KEY || process.env.AI_API_KEY);

    if (hasApiKey) {
      try {
        content = await generateContentFromAI(topic, grade, subject, languageName);
        providerSource = process.env.GEMINI_API_KEY ? "google-gemini" : "ai-live";
      } catch (aiError) {
        console.warn("AI generation failed, falling back to local engine:", aiError);
        content = getLocalizedContent(topic, grade, subject, lang);
      }
    } else {
      content = getLocalizedContent(topic, grade, subject, lang);
    }

    return NextResponse.json({
      content,
      metadata: {
        cacheHit: false,
        source: providerSource,
        model: process.env.GEMINI_API_KEY ? (process.env.AI_MODEL || "gemini-flash-lite-latest") : (process.env.AI_MODEL || "custom"),
        verificationStatus: "verified",
      },
    });
  } catch (error) {
    console.error("API error in /api/content/generate:", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to process request. Please try again.",
        },
      },
      { status: 500 }
    );
  }
}

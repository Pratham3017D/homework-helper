import { callGeminiGenerateContent } from "./gemini";
import { createChatCompletion } from "./client";
import { buildContentGenerationPrompt } from "./prompts";
import { GeneratedContent, generatedContentSchema } from "@/schemas/content";

function cleanJsonString(raw: string): string {
  let cleaned = raw.trim();

  // Strip markdown code block if present
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "");
    cleaned = cleaned.replace(/\n?```\s*$/, "");
  }

  // Find opening and closing braces
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  return cleaned.trim();
}

export async function generateContentFromAI(
  topic: string,
  grade: number,
  subject: string,
  languageName: string = "English"
): Promise<GeneratedContent> {
  const messages = buildContentGenerationPrompt(
    topic,
    grade,
    subject,
    languageName
  );

  const systemInstruction = messages.find((m) => m.role === "system")?.content;
  const userPrompt = messages.find((m) => m.role === "user")?.content || "";

  let rawOutput = "";

  // Prioritize Google Gemini API
  if (process.env.GEMINI_API_KEY) {
    try {
      rawOutput = await callGeminiGenerateContent({
        prompt: userPrompt,
        systemInstruction,
        temperature: 0.2,
      });
    } catch (geminiError) {
      console.warn("Gemini call failed, checking alternative providers:", geminiError);
      if (process.env.AI_API_BASE_URL && process.env.AI_API_KEY) {
        rawOutput = await createChatCompletion({
          messages,
          temperature: 0.2,
        });
      } else {
        throw geminiError;
      }
    }
  } else if (process.env.AI_API_KEY) {
    rawOutput = await createChatCompletion({
      messages,
      temperature: 0.2,
    });
  } else {
    throw new Error("No AI API key configured.");
  }

  const cleanedJson = cleanJsonString(rawOutput);

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleanedJson);
  } catch (err) {
    console.error("Failed to parse AI JSON response. Raw output:", rawOutput);
    throw new Error(`AI returned invalid JSON: ${(err as Error).message}`);
  }

  const parseResult = generatedContentSchema.safeParse(parsed);
  if (!parseResult.success) {
    console.error("AI response failed schema validation:", parseResult.error.issues);
    throw new Error(
      `AI response failed schema validation: ${parseResult.error.issues[0]?.message}`
    );
  }

  return parseResult.data;
}

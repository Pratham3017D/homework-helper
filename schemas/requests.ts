import { z } from "zod";
import { SUPPORTED_LANGUAGE_CODES } from "../lib/constants/languages.ts";
import { generatedContentSchema } from "./content.ts";

export const SUBJECT_OPTIONS = [
  "Mathematics",
  "Science",
  "English",
  "Language",
  "Other",
] as const;

export type SubjectOption = (typeof SUBJECT_OPTIONS)[number];

/**
 * Sanitizes user text input:
 * - Strips ASCII & Unicode control characters (except standard newlines/tabs)
 * - Strips raw HTML and script tags to prevent injection attacks
 * - Collapses consecutive whitespace into a single space
 * - Trims leading and trailing whitespace
 */
export function sanitizeInputText(raw: string): string {
  if (typeof raw !== "string") return "";
  return raw
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const generateContentRequestSchema = z.object({
  topic: z
    .string("Please enter a topic or homework question.")
    .transform((val) => sanitizeInputText(val))
    .pipe(
      z
        .string()
        .min(2, "Please enter a topic or homework question with at least 2 characters.")
        .max(160, "Please keep your topic under 160 characters.")
        .refine(
          (val) => /[\p{L}\p{N}]/u.test(val),
          "Topic must contain recognizable letters or numbers."
        )
    ),

  grade: z.coerce
    .number("Please select a grade.")
    .int("Grade must be a whole number.")
    .min(1, "Please select a grade between 1 and 8.")
    .max(8, "Please select a grade between 1 and 8."),

  subject: z
    .string("Please select a subject.")
    .transform((val) => sanitizeInputText(val))
    .pipe(
      z.enum(SUBJECT_OPTIONS, {
        message: "Please select a valid subject: Mathematics, Science, English, Language, or Other.",
      })
    ),

  lang: z
    .enum(SUPPORTED_LANGUAGE_CODES, {
      message: "Unsupported language. Supported languages: en, hi, ta, te, ml, kn.",
    })
    .default("en"),
});

export type GenerateContentRequest = z.infer<
  typeof generateContentRequestSchema
>;

export const translateContentRequestSchema = z.object({
  content: generatedContentSchema,
  sourceLang: z
    .enum(SUPPORTED_LANGUAGE_CODES, {
      message: "Unsupported source language.",
    })
    .default("en"),
  targetLang: z.enum(SUPPORTED_LANGUAGE_CODES, {
    message: "Unsupported target language. Supported: en, hi, ta, te, ml, kn.",
  }),
  grade: z.coerce
    .number("Please provide a valid grade.")
    .int("Grade must be a whole number.")
    .min(1)
    .max(8),
  subject: z
    .string()
    .transform((val) => sanitizeInputText(val))
    .pipe(z.string().min(1).max(50)),
});

export type TranslateContentRequest = z.infer<
  typeof translateContentRequestSchema
>;

import { z } from "zod";

export const SUBJECT_OPTIONS = [
  "Mathematics",
  "Science",
  "English",
  "Language",
  "Other",
] as const;

export type SubjectOption = (typeof SUBJECT_OPTIONS)[number];

export const generateContentRequestSchema = z.object({
  topic: z
    .string("Please enter a topic or homework question.")
    .trim()
    .min(1, "Please enter a topic or homework question.")
    .max(160, "Please keep your topic under 160 characters."),

  grade: z
    .number("Please select a grade.")
    .int("Grade must be a whole number.")
    .min(1, "Please select a grade between 1 and 8.")
    .max(8, "Please select a grade between 1 and 8."),

  subject: z
    .string("Please select a subject.")
    .trim()
    .min(1, "Please select a subject."),
});

export type GenerateContentRequest = z.infer<
  typeof generateContentRequestSchema
>;

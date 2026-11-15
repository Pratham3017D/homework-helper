import { z } from "zod";

export const problemDifficultySchema = z.enum([
  "easy",
  "easy-medium",
  "medium",
  "medium-hard",
  "challenge",
]);

export type ProblemDifficulty = z.infer<typeof problemDifficultySchema>;

export const practiceProblemSchema = z.object({
  id: z.string().optional().default("p1"),
  difficulty: z.string().optional().default("medium").transform((val) => {
    const lower = String(val).toLowerCase();
    if (lower.includes("easy-med") || lower.includes("easy/med")) return "easy-medium";
    if (lower.includes("med-hard") || lower.includes("medium-hard") || lower.includes("med/hard")) return "medium-hard";
    if (lower.includes("easy")) return "easy";
    if (lower.includes("challenge") || lower.includes("hard")) return "challenge";
    return "medium";
  }),
  question: z.string().min(1, "Question cannot be empty"),
  hint: z.string().optional().default("Think about the fundamental rule."),
  answer: z.string().min(1, "Answer cannot be empty"),
  solution_steps: z
    .array(z.string())
    .or(z.string().transform((s) => [s]))
    .optional()
    .default([]),
});

export type PracticeProblem = z.infer<typeof practiceProblemSchema>;

export const keyDefinitionSchema = z
  .object({
    term: z.string(),
    meaning: z.string().optional(),
    definition: z.string().optional(),
    explanation: z.string().optional(),
  })
  .transform((val) => ({
    term: val.term,
    meaning: val.meaning || val.definition || val.explanation || "",
  }));

export type KeyDefinition = z.infer<typeof keyDefinitionSchema>;

export const teachingNotesSchema = z
  .object({
    overview: z.string().optional(),
    key_definitions: z.array(keyDefinitionSchema).optional(),
    definitions: z.array(keyDefinitionSchema).optional(),
    key_terms: z.array(keyDefinitionSchema).optional(),
    core_rules: z.array(z.string()).optional(),
    rules: z.array(z.string()).optional(),
    formulas: z.array(z.string()).optional(),
    real_world_examples: z.array(z.string()).optional(),
    examples: z.array(z.string()).optional(),
    analogies: z.array(z.string()).optional(),
    parent_cheat_sheet: z.array(z.string()).optional(),
    cheat_sheet: z.array(z.string()).optional(),
    tips: z.array(z.string()).optional(),
  })
  .transform((val) => ({
    overview: val.overview || "",
    key_definitions: val.key_definitions || val.definitions || val.key_terms || [],
    core_rules: val.core_rules || val.rules || val.formulas || [],
    real_world_examples: val.real_world_examples || val.examples || val.analogies || [],
    parent_cheat_sheet: val.parent_cheat_sheet || val.cheat_sheet || val.tips || [],
  }));

export type TeachingNotes = z.infer<typeof teachingNotesSchema>;

export const generatedContentSchema = z.object({
  topic: z.string().min(1),
  grade: z.coerce.number().int().min(1).max(12).default(4),
  subject: z.string().optional().default("General"),
  parent_summary: z.string().min(1),
  intuition: z.string().min(1),
  steps: z
    .array(z.string())
    .or(z.string().transform((s) => [s]))
    .default([]),
  common_mistakes: z
    .array(z.string())
    .or(z.string().transform((s) => [s]))
    .default([]),
  kid_script: z.string().min(1),
  problems: z.array(practiceProblemSchema).min(1),
  notes: teachingNotesSchema.optional(),
});

export type GeneratedContent = z.infer<typeof generatedContentSchema>;

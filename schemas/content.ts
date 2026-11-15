import { z } from "zod";

export const REQUIRED_DIFFICULTIES = [
  "easy",
  "easy-medium",
  "medium",
  "medium-hard",
  "challenge",
] as const;

export type ProblemDifficulty = (typeof REQUIRED_DIFFICULTIES)[number];

export const problemDifficultySchema = z.enum(REQUIRED_DIFFICULTIES);

export const practiceProblemSchema = z.object({
  id: z.string().optional().default("p1"),
  difficulty: z.string().transform((val): ProblemDifficulty => {
    const lower = String(val).toLowerCase().trim();
    if (lower === "easy" || lower.startsWith("1")) return "easy";
    if (lower === "easy-medium" || lower.includes("easy-med") || lower.includes("easy/med") || lower.startsWith("2")) return "easy-medium";
    if (lower === "medium-hard" || lower.includes("med-hard") || lower.includes("med/hard") || lower.startsWith("4")) return "medium-hard";
    if (lower === "challenge" || lower.includes("hard") || lower.startsWith("5")) return "challenge";
    return "medium";
  }),
  question: z.string().min(1, "Question cannot be empty"),
  hint: z.string().min(1, "Hint cannot be empty"),
  answer: z.string().min(1, "Answer cannot be empty"),
  solution_steps: z
    .array(z.string().min(1))
    .or(z.string().min(1).transform((s) => [s]))
    .default([]),
});

export type PracticeProblem = z.infer<typeof practiceProblemSchema>;

export const keyDefinitionSchema = z
  .object({
    term: z.string().min(1, "Term cannot be empty"),
    meaning: z.string().optional(),
    definition: z.string().optional(),
    explanation: z.string().optional(),
  })
  .transform((val) => ({
    term: val.term.trim(),
    meaning: (val.meaning || val.definition || val.explanation || "").trim(),
  }))
  .refine((val) => val.meaning.length > 0, {
    message: "Definition meaning cannot be empty",
  });

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
    overview: (val.overview || "").trim(),
    key_definitions: val.key_definitions || val.definitions || val.key_terms || [],
    core_rules: (val.core_rules || val.rules || val.formulas || []).filter(Boolean),
    real_world_examples: (val.real_world_examples || val.examples || val.analogies || []).filter(Boolean),
    parent_cheat_sheet: (val.parent_cheat_sheet || val.cheat_sheet || val.tips || []).filter(Boolean),
  }));

export type TeachingNotes = z.infer<typeof teachingNotesSchema>;

/**
 * Validates and normalizes the 5 progressive practice problems.
 * Ensures exactly 5 problems exist and are ordered:
 * 1. easy
 * 2. easy-medium
 * 3. medium
 * 4. medium-hard
 * 5. challenge
 */
export const practiceProblemsArraySchema = z
  .array(practiceProblemSchema)
  .min(5, "Practice set must contain exactly 5 problems.")
  .max(5, "Practice set must contain exactly 5 problems.")
  .transform((problems) => {
    // Check if difficulties are already in order
    const inOrder = problems.every(
      (p, i) => p.difficulty === REQUIRED_DIFFICULTIES[i]
    );

    if (inOrder) {
      return problems.map((p, i) => ({ ...p, id: `p${i + 1}` }));
    }

    // Attempt to align problems to required difficulties if present
    const aligned: PracticeProblem[] = [];
    const pool = [...problems];

    for (let i = 0; i < REQUIRED_DIFFICULTIES.length; i++) {
      const targetDiff = REQUIRED_DIFFICULTIES[i];
      const matchIndex = pool.findIndex((p) => p.difficulty === targetDiff);
      if (matchIndex !== -1) {
        aligned.push({ ...pool.splice(matchIndex, 1)[0], id: `p${i + 1}`, difficulty: targetDiff });
      } else if (pool.length > 0) {
        // Assign next available problem and force target difficulty progression
        aligned.push({ ...pool.shift()!, id: `p${i + 1}`, difficulty: targetDiff });
      }
    }

    return aligned;
  })
  .refine(
    (problems) =>
      problems.length === 5 &&
      problems.every((p, i) => p.difficulty === REQUIRED_DIFFICULTIES[i]),
    {
      message:
        "Practice set must contain all 5 ordered difficulties: easy, easy-medium, medium, medium-hard, challenge.",
    }
  );

export const generatedContentSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  grade: z.coerce.number().int().min(1).max(8, "Grade must be between 1 and 8"),
  subject: z.string().min(1, "Subject is required"),
  parent_summary: z.string().min(1, "Parent summary is required"),
  intuition: z.string().min(1, "Intuition explanation is required"),
  steps: z
    .array(z.string().min(1))
    .or(z.string().min(1).transform((s) => [s]))
    .refine((arr) => arr.length > 0, "At least one step is required"),
  common_mistakes: z
    .array(z.string().min(1))
    .or(z.string().min(1).transform((s) => [s]))
    .refine((arr) => arr.length > 0, "At least one common mistake is required"),
  kid_script: z.string().min(1, "Teaching script is required"),
  problems: practiceProblemsArraySchema,
  notes: teachingNotesSchema.optional(),
});

export type GeneratedContent = z.infer<typeof generatedContentSchema>;

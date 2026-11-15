import test from "node:test";
import assert from "node:assert/strict";
import { generatedContentSchema, REQUIRED_DIFFICULTIES } from "../schemas/content.ts";

const validSample = {
  topic: "Fractions",
  grade: 4,
  subject: "Mathematics",
  parent_summary: "A fraction represents equal parts of a whole.",
  intuition: "Think of cutting a pizza into slices.",
  steps: ["Show the whole.", "Cut into equal parts.", "Count parts."],
  common_mistakes: ["Adding denominators directly."],
  kid_script: "Let's share a pizza together!",
  notes: {
    overview: "Conceptual notes on fractions.",
    key_definitions: [{ term: "Numerator", meaning: "Top number showing parts taken." }],
    core_rules: ["Denominators must match before adding."],
    real_world_examples: ["Sharing a candy bar."],
    parent_cheat_sheet: ["Top number = parts counted, bottom number = total parts."],
  },
  problems: [
    {
      id: "p1",
      difficulty: "easy",
      question: "What is 1/4 + 2/4?",
      hint: "Add numerators.",
      answer: "3/4",
      solution_steps: ["1 + 2 = 3", "Keep denominator 4"],
    },
    {
      id: "p2",
      difficulty: "easy-medium",
      question: "What is 4/5 - 2/5?",
      hint: "Subtract numerators.",
      answer: "2/5",
      solution_steps: ["4 - 2 = 2"],
    },
    {
      id: "p3",
      difficulty: "medium",
      question: "What is 1/2 + 1/4?",
      hint: "Find common denominator.",
      answer: "3/4",
      solution_steps: ["1/2 = 2/4", "2/4 + 1/4 = 3/4"],
    },
    {
      id: "p4",
      difficulty: "medium-hard",
      question: "Simplify 6/8",
      hint: "Divide by 2.",
      answer: "3/4",
      solution_steps: ["6 / 2 = 3", "8 / 2 = 4"],
    },
    {
      id: "p5",
      difficulty: "challenge",
      question: "What is 2/3 + 3/4?",
      hint: "Common denominator is 12.",
      answer: "17/12",
      solution_steps: ["8/12 + 9/12 = 17/12"],
    },
  ],
};

test("Content Schema: Valid 5-question curriculum content passes", () => {
  const result = generatedContentSchema.safeParse(validSample);
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.problems.length, 5);
    for (let i = 0; i < 5; i++) {
      assert.equal(result.data.problems[i].difficulty, REQUIRED_DIFFICULTIES[i]);
      assert.equal(result.data.problems[i].id, `p${i + 1}`);
    }
  }
});

test("Content Schema: Rejects content with fewer than 5 problems", () => {
  const invalid = {
    ...validSample,
    problems: validSample.problems.slice(0, 4),
  };
  const result = generatedContentSchema.safeParse(invalid);
  assert.equal(result.success, false);
});

test("Content Schema: Rejects content with more than 5 problems", () => {
  const invalid = {
    ...validSample,
    problems: [...validSample.problems, validSample.problems[0]],
  };
  const result = generatedContentSchema.safeParse(invalid);
  assert.equal(result.success, false);
});

test("Content Schema: Rejects missing essential pedagogical fields", () => {
  const missingSummary = { ...validSample, parent_summary: "" };
  assert.equal(generatedContentSchema.safeParse(missingSummary).success, false);

  const missingIntuition = { ...validSample, intuition: "" };
  assert.equal(generatedContentSchema.safeParse(missingIntuition).success, false);

  const emptySteps = { ...validSample, steps: [] };
  assert.equal(generatedContentSchema.safeParse(emptySteps).success, false);

  const missingScript = { ...validSample, kid_script: "" };
  assert.equal(generatedContentSchema.safeParse(missingScript).success, false);
});

test("Content Schema: Normalizes alternative key names in notes", () => {
  const altSample = {
    ...validSample,
    notes: {
      overview: "Alt overview",
      definitions: [{ term: "Ratio", explanation: "Comparison of two numbers" }],
      rules: ["Rule A"],
      examples: ["Example A"],
      tips: ["Tip A"],
    },
  };
  const result = generatedContentSchema.safeParse(altSample);
  assert.equal(result.success, true);
  if (result.success && result.data.notes) {
    assert.equal(result.data.notes.key_definitions.length, 1);
    assert.equal(result.data.notes.key_definitions[0].term, "Ratio");
    assert.equal(result.data.notes.key_definitions[0].meaning, "Comparison of two numbers");
    assert.deepEqual(result.data.notes.core_rules, ["Rule A"]);
    assert.deepEqual(result.data.notes.real_world_examples, ["Example A"]);
    assert.deepEqual(result.data.notes.parent_cheat_sheet, ["Tip A"]);
  }
});

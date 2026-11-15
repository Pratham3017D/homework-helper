import test from "node:test";
import assert from "node:assert/strict";
import {
  safeEvaluate,
  verifyEducationalContent,
} from "../lib/verification/math-verifier.ts";

test("Math Evaluator: Safely parses and evaluates arithmetic expressions", () => {
  assert.equal(safeEvaluate("15 + 27"), 42);
  assert.equal(safeEvaluate("12 * 8"), 96);
  assert.equal(safeEvaluate("100 / 4"), 25);
  assert.equal(safeEvaluate("(10 - 4) * 5"), 30);
  assert.equal(safeEvaluate("2^4"), 16);
  assert.equal(safeEvaluate("14.5 + 3.2"), 17.7);
  assert.equal(safeEvaluate("invalid ++++ syntax"), null);
});

test("Math Verifier: Verifies valid arithmetic calculation in practice problem", () => {
  const content = {
    topic: "Multiplication",
    grade: 3,
    subject: "Mathematics",
    parent_summary: "Multiplication is repeated addition.",
    intuition: "Think of rows in a garden.",
    steps: ["Group objects.", "Count rows."],
    common_mistakes: ["Confusing with addition."],
    kid_script: "Let's count groups!",
    problems: [
      {
        id: "p1",
        difficulty: "easy",
        question: "What is 12 * 8?",
        hint: "Multiply 10*8 and 2*8.",
        answer: "96",
        solution_steps: ["12 * 8 = 96"],
      },
      {
        id: "p2",
        difficulty: "easy-medium",
        question: "What is 15 + 27?",
        hint: "Add units first.",
        answer: "42",
        solution_steps: ["15 + 27 = 42"],
      },
      {
        id: "p3",
        difficulty: "medium",
        question: "What is 20% of 150?",
        hint: "Divide by 5.",
        answer: "30",
        solution_steps: ["0.20 * 150 = 30"],
      },
      {
        id: "p4",
        difficulty: "medium-hard",
        question: "Solve for x: 2x + 4 = 10",
        hint: "Subtract 4, divide by 2.",
        answer: "x = 3",
        solution_steps: ["2x = 6", "x = 3"],
      },
      {
        id: "p5",
        difficulty: "challenge",
        question: "What is 1/4 + 2/4?",
        hint: "Add numerators.",
        answer: "3/4",
        solution_steps: ["1 + 2 = 3"],
      },
    ],
  };

  const report = verifyEducationalContent(content);
  assert.equal(report.overallStatus, "verified");
  assert.equal(report.failedCount, 0);
  assert.ok(report.verifiedCount >= 4);
});

test("Math Verifier: Flags arithmetic contradiction as verification_failed", () => {
  const buggyContent = {
    topic: "Multiplication",
    grade: 3,
    subject: "Mathematics",
    parent_summary: "Multiplication guide.",
    intuition: "Counting rows.",
    steps: ["Multiply."],
    common_mistakes: ["Mistake."],
    kid_script: "Script.",
    problems: [
      {
        id: "p1",
        difficulty: "easy",
        question: "What is 8 * 7?",
        hint: "Multiply 8 by 7.",
        answer: "54", // INCORRECT! 8 * 7 = 56
        solution_steps: ["8 * 7 = 54"],
      },
      {
        id: "p2",
        difficulty: "easy-medium",
        question: "What is 5 + 5?",
        hint: "Add.",
        answer: "10",
        solution_steps: ["10"],
      },
      {
        id: "p3",
        difficulty: "medium",
        question: "Explain what multiplication means.",
        hint: "Think of groups.",
        answer: "Repeated addition.",
        solution_steps: ["Definition."],
      },
      {
        id: "p4",
        difficulty: "medium-hard",
        question: "What is 10 * 10?",
        hint: "Add a zero.",
        answer: "100",
        solution_steps: ["100"],
      },
      {
        id: "p5",
        difficulty: "challenge",
        question: "Word problem on grouping.",
        hint: "Multiply.",
        answer: "24 items",
        solution_steps: ["24"],
      },
    ],
  };

  const report = verifyEducationalContent(buggyContent);
  assert.equal(report.overallStatus, "verification_failed");
  assert.ok(report.failedCount >= 1);
  assert.match(report.results[0].details, /contradiction/i);
});

test("Math Verifier: Does not falsely claim non-math subjects are mathematically verified", () => {
  const scienceContent = {
    topic: "Photosynthesis",
    grade: 5,
    subject: "Science",
    parent_summary: "Plants make food from sunlight.",
    intuition: "Like a solar-powered kitchen.",
    steps: ["Sunlight absorption.", "Water intake.", "Sugar creation."],
    common_mistakes: ["Thinking plants only need water."],
    kid_script: "Think of green leaves as solar panels.",
    problems: [
      {
        id: "p1",
        difficulty: "easy",
        question: "What pigment makes leaves green?",
        hint: "Starts with Chloro.",
        answer: "Chlorophyll",
        solution_steps: ["Identify the pigment."],
      },
      {
        id: "p2",
        difficulty: "easy-medium",
        question: "What gas do plants take in?",
        hint: "Humans breathe it out.",
        answer: "Carbon dioxide",
        solution_steps: ["Identify the gas."],
      },
      {
        id: "p3",
        difficulty: "medium",
        question: "What is the primary food made by plants?",
        hint: "A type of sugar.",
        answer: "Glucose",
        solution_steps: ["Identify glucose."],
      },
      {
        id: "p4",
        difficulty: "medium-hard",
        question: "Where in the cell does photosynthesis happen?",
        hint: "Green organelles.",
        answer: "Chloroplasts",
        solution_steps: ["Identify organelle."],
      },
      {
        id: "p5",
        difficulty: "challenge",
        question: "Why would plants struggle in the dark?",
        hint: "Energy source is missing.",
        answer: "They lack solar energy to drive the chemical reaction.",
        solution_steps: ["Explain lack of light energy."],
      },
    ],
  };

  const report = verifyEducationalContent(scienceContent);
  assert.equal(report.overallStatus, "schema_validated");
  assert.equal(report.isMathematicallyApplicable, false);
  assert.equal(report.verifiedCount, 0);
  assert.equal(report.failedCount, 0);
});

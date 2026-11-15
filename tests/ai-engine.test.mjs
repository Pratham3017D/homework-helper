import test from "node:test";
import assert from "node:assert/strict";
import { cleanJsonString } from "../lib/ai/generate-content.ts";
import { generatedContentSchema } from "../schemas/content.ts";
import { createApiErrorResponse } from "../lib/security/errors.ts";
import { getLocalizedContent } from "../lib/fixtures/translations.ts";

test("AI Engine: cleanJsonString strips nested code fences and extracts outermost JSON", () => {
  const dirty = "Here is the response:\n```json\n{\n  \"topic\": \"Fractions\",\n  \"grade\": 4\n}\n```\nHope this helps!";
  const cleaned = cleanJsonString(dirty);
  assert.equal(cleaned, '{\n  "topic": "Fractions",\n  "grade": 4\n}');
});

test("AI Engine: Rejects AI response missing essential fields", () => {
  const missingSummary = {
    topic: "Fractions",
    grade: 4,
    subject: "Mathematics",
    // parent_summary missing
    intuition: "Think of pizza",
    steps: ["Step 1"],
    common_mistakes: ["Mistake 1"],
    kid_script: "Let's learn",
    problems: [
      { id: "p1", difficulty: "easy", question: "Q1", hint: "H1", answer: "A1", solution_steps: ["S1"] },
      { id: "p2", difficulty: "easy-medium", question: "Q2", hint: "H2", answer: "A2", solution_steps: ["S2"] },
      { id: "p3", difficulty: "medium", question: "Q3", hint: "H3", answer: "A3", solution_steps: ["S3"] },
      { id: "p4", difficulty: "medium-hard", question: "Q4", hint: "H4", answer: "A4", solution_steps: ["S4"] },
      { id: "p5", difficulty: "challenge", question: "Q5", hint: "H5", answer: "A5", solution_steps: ["S5"] },
    ],
  };

  const result = generatedContentSchema.safeParse(missingSummary);
  assert.equal(result.success, false);
});

test("AI Engine: Requires strictly 5 problems with valid ordered difficulty progression", () => {
  const fourProblems = {
    topic: "Fractions",
    grade: 4,
    subject: "Mathematics",
    parent_summary: "Summary",
    intuition: "Intuition",
    steps: ["Step 1"],
    common_mistakes: ["Mistake 1"],
    kid_script: "Script",
    problems: [
      { id: "p1", difficulty: "easy", question: "Q1", hint: "H1", answer: "A1" },
      { id: "p2", difficulty: "easy-medium", question: "Q2", hint: "H2", answer: "A2" },
      { id: "p3", difficulty: "medium", question: "Q3", hint: "H3", answer: "A3" },
      { id: "p4", difficulty: "challenge", question: "Q4", hint: "H4", answer: "A4" },
    ],
  };

  const result = generatedContentSchema.safeParse(fourProblems);
  assert.equal(result.success, false);
});

test("AI Engine: Graceful fallback produces schema-valid content for any topic", () => {
  const fallback = getLocalizedContent("Photosynthesis and Chlorophyll", 5, "Science", "en");
  const parsed = generatedContentSchema.safeParse(fallback);
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.problems.length, 5);
    assert.equal(parsed.data.grade, 5);
    assert.equal(parsed.data.subject, "Science");
  }
});

test("API Error Response: Generates standard structured error format without exposing stack traces", async () => {
  const res = createApiErrorResponse(
    "RATE_LIMIT_EXCEEDED",
    "Too many requests.",
    429,
    { retryAfter: 15 }
  );

  assert.equal(res.status, 429);
  const data = await res.json();
  assert.equal(data.error.code, "RATE_LIMIT_EXCEEDED");
  assert.equal(data.error.message, "Too many requests.");
  assert.equal(data.error.retryAfter, 15);
  // Verify no internal credentials or stack traces exist in payload
  assert.equal(data.error.stack, undefined);
  assert.equal(data.error.apiKey, undefined);
});

import test from "node:test";
import assert from "node:assert/strict";
import { cleanJsonString } from "../lib/ai/generate-content.ts";

test("JSON Cleaner: Strips markdown code block fences", () => {
  const input = "```json\n{\"topic\": \"Fractions\", \"grade\": 4}\n```";
  const cleaned = cleanJsonString(input);
  assert.equal(cleaned, "{\"topic\": \"Fractions\", \"grade\": 4}");
  assert.doesNotThrow(() => JSON.parse(cleaned));
});

test("JSON Cleaner: Strips surrounding conversational text", () => {
  const input = "Here is the educational JSON for the parent:\n\n{\"topic\": \"Gravity\", \"grade\": 6}\n\nI hope this helps!";
  const cleaned = cleanJsonString(input);
  assert.equal(cleaned, "{\"topic\": \"Gravity\", \"grade\": 6}");
  assert.doesNotThrow(() => JSON.parse(cleaned));
});

test("JSON Cleaner: Removes trailing commas before closing braces/brackets", () => {
  const input = "{\"items\": [1, 2, 3, ], \"active\": true, }";
  const cleaned = cleanJsonString(input);
  assert.doesNotThrow(() => JSON.parse(cleaned));
  const parsed = JSON.parse(cleaned);
  assert.deepEqual(parsed.items, [1, 2, 3]);
  assert.equal(parsed.active, true);
});

test("JSON Cleaner: Repairs markdown bullet dashes inside JSON arrays", () => {
  const input = `{
  "topic": "Nutrition in Plants",
  "steps": [
    - "First, explain autotrophic nutrition.",
    - "Second, describe photosynthesis and chlorophyll."
  ],
  "common_mistakes": [
    - "Thinking plants feed like animals."
  ]
}`;
  const cleaned = cleanJsonString(input);
  assert.doesNotThrow(() => JSON.parse(cleaned));
  const parsed = JSON.parse(cleaned);
  assert.equal(parsed.steps.length, 2);
  assert.equal(parsed.steps[0], "First, explain autotrophic nutrition.");
  assert.equal(parsed.steps[1], "Second, describe photosynthesis and chlorophyll.");
  assert.equal(parsed.common_mistakes[0], "Thinking plants feed like animals.");
});

test("JSON Cleaner: Repairs asterisk and bullet symbols inside JSON arrays", () => {
  const input = `{
  "solution_steps": [
    * "Step 1: Write equation",
    • "Step 2: Solve for x"
  ]
}`;
  const cleaned = cleanJsonString(input);
  assert.doesNotThrow(() => JSON.parse(cleaned));
  const parsed = JSON.parse(cleaned);
  assert.deepEqual(parsed.solution_steps, [
    "Step 1: Write equation",
    "Step 2: Solve for x",
  ]);
});

test("JSON Cleaner: Repairs numbered bullets inside JSON arrays", () => {
  const input = `{
  "steps": [
    1. "Prepare the leaves",
    2. "Test for starch"
  ]
}`;
  const cleaned = cleanJsonString(input);
  assert.doesNotThrow(() => JSON.parse(cleaned));
  const parsed = JSON.parse(cleaned);
  assert.deepEqual(parsed.steps, [
    "Prepare the leaves",
    "Test for starch",
  ]);
});

test("JSON Cleaner: Preserves negative numbers, hyphenated words, and math operations", () => {
  const input = `{
  "numbers": [-5, -12.5, 3],
  "math_steps": [
    "5 - 3 = 2",
    "easy-medium level problem",
    "Temperature is -4 degrees"
  ]
}`;
  const cleaned = cleanJsonString(input);
  assert.doesNotThrow(() => JSON.parse(cleaned));
  const parsed = JSON.parse(cleaned);
  assert.deepEqual(parsed.numbers, [-5, -12.5, 3]);
  assert.equal(parsed.math_steps[0], "5 - 3 = 2");
  assert.equal(parsed.math_steps[1], "easy-medium level problem");
  assert.equal(parsed.math_steps[2], "Temperature is -4 degrees");
});

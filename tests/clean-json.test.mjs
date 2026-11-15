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

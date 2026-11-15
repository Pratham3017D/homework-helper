import test from "node:test";
import assert from "node:assert/strict";
import { generateContentRequestSchema, sanitizeInputText } from "../schemas/requests.ts";

test("Request Validation: Valid request passes with normalized data", () => {
  const result = generateContentRequestSchema.safeParse({
    topic: "  Understanding   Photosynthesis   ",
    grade: 5,
    subject: "Science",
    lang: "en",
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.topic, "Understanding Photosynthesis");
    assert.equal(result.data.grade, 5);
    assert.equal(result.data.subject, "Science");
    assert.equal(result.data.lang, "en");
  }
});

test("Request Validation: Empty or whitespace-only topic rejected", () => {
  const emptyRes = generateContentRequestSchema.safeParse({
    topic: "",
    grade: 4,
    subject: "Mathematics",
  });
  assert.equal(emptyRes.success, false);

  const spacesRes = generateContentRequestSchema.safeParse({
    topic: "    ",
    grade: 4,
    subject: "Mathematics",
  });
  assert.equal(spacesRes.success, false);
});

test("Request Validation: Symbol-only topic rejected", () => {
  const symbolRes = generateContentRequestSchema.safeParse({
    topic: "!@#$%^&*()",
    grade: 4,
    subject: "Mathematics",
  });
  assert.equal(symbolRes.success, false);
  assert.match(symbolRes.error.issues[0].message, /recognizable letters or numbers/);
});

test("Request Validation: Topic exceeding 160 characters rejected", () => {
  const longTopic = "A".repeat(161);
  const result = generateContentRequestSchema.safeParse({
    topic: longTopic,
    grade: 3,
    subject: "English",
  });
  assert.equal(result.success, false);
  assert.match(result.error.issues[0].message, /under 160 characters/);
});

test("Request Validation: Invalid grades rejected (<1, >8, non-integer)", () => {
  const grade0 = generateContentRequestSchema.safeParse({
    topic: "Fractions",
    grade: 0,
    subject: "Mathematics",
  });
  assert.equal(grade0.success, false);

  const grade9 = generateContentRequestSchema.safeParse({
    topic: "Fractions",
    grade: 9,
    subject: "Mathematics",
  });
  assert.equal(grade9.success, false);

  const gradeFloat = generateContentRequestSchema.safeParse({
    topic: "Fractions",
    grade: 4.5,
    subject: "Mathematics",
  });
  assert.equal(gradeFloat.success, false);
});

test("Request Validation: Coerces numeric grade string", () => {
  const result = generateContentRequestSchema.safeParse({
    topic: "Fractions",
    grade: "6",
    subject: "Mathematics",
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.grade, 6);
  }
});

test("Request Validation: Invalid subject rejected", () => {
  const result = generateContentRequestSchema.safeParse({
    topic: "Fractions",
    grade: 4,
    subject: "Astrology",
  });
  assert.equal(result.success, false);
  assert.match(result.error.issues[0].message, /valid subject/);
});

test("Request Validation: Unsupported language code rejected", () => {
  const result = generateContentRequestSchema.safeParse({
    topic: "Fractions",
    grade: 4,
    subject: "Mathematics",
    lang: "fr",
  });
  assert.equal(result.success, false);
  assert.match(result.error.issues[0].message, /Unsupported language/);
});

test("Request Validation: All 6 supported languages accepted", () => {
  const supported = ["en", "hi", "ta", "te", "ml", "kn"];
  for (const lang of supported) {
    const res = generateContentRequestSchema.safeParse({
      topic: "Fractions",
      grade: 4,
      subject: "Mathematics",
      lang,
    });
    assert.equal(res.success, true, `Language ${lang} should be valid`);
  }
});

test("Sanitization: Strips ASCII control characters and collapses whitespace", () => {
  const dirty = "Hello\u0000 \u0007World   \t\n   Test";
  const cleaned = sanitizeInputText(dirty);
  assert.equal(cleaned, "Hello World Test");
});

test("Sanitization: Strips raw HTML and script tags", () => {
  const xssAttempt = "<script>alert('xss')</script>Photosynthesis and <b>Plants</b>";
  const cleaned = sanitizeInputText(xssAttempt);
  assert.equal(cleaned, "alert('xss')Photosynthesis and Plants");
});

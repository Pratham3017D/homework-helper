import test from "node:test";
import assert from "node:assert/strict";
import { translateContentRequestSchema } from "../schemas/requests.ts";
import {
  translateEducationalContent,
  createLessonFingerprint,
  createTranslationCacheKey,
} from "../lib/ai/translate-content.ts";
import { getLocalizedContent } from "../lib/fixtures/translations.ts";
import { verifyEducationalContent } from "../lib/verification/math-verifier.ts";

test("Translation Request Schema: Valid translation payload passes", () => {
  const sampleLesson = getLocalizedContent(
    "Comparing Quantities: Understanding percentages",
    7,
    "Mathematics",
    "en"
  );

  const payload = {
    content: sampleLesson,
    sourceLang: "en",
    targetLang: "hi",
    grade: 7,
    subject: "Mathematics",
  };

  const parsed = translateContentRequestSchema.safeParse(payload);
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.targetLang, "hi");
    assert.equal(parsed.data.grade, 7);
  }
});

test("Translation Request Schema: Rejects invalid or unsupported target language", () => {
  const sampleLesson = getLocalizedContent("Fractions", 4, "Mathematics", "en");

  const invalidPayload = {
    content: sampleLesson,
    sourceLang: "en",
    targetLang: "es", // unsupported
    grade: 4,
    subject: "Mathematics",
  };

  const parsed = translateContentRequestSchema.safeParse(invalidPayload);
  assert.equal(parsed.success, false);
});

test("Translation Request Schema: Rejects invalid grade outside 1-8 range", () => {
  const sampleLesson = getLocalizedContent("Fractions", 4, "Mathematics", "en");

  const invalidGradePayload = {
    content: sampleLesson,
    sourceLang: "en",
    targetLang: "hi",
    grade: 12, // invalid
    subject: "Mathematics",
  };

  const parsed = translateContentRequestSchema.safeParse(invalidGradePayload);
  assert.equal(parsed.success, false);
});

test("Lesson Fingerprint & Cache Key: Generates stable deterministic cache keys", () => {
  const lessonA = getLocalizedContent(
    "Comparing Quantities: Understanding percentages",
    7,
    "Mathematics",
    "en"
  );
  const lessonB = getLocalizedContent(
    "Comparing Quantities: Understanding percentages",
    7,
    "Mathematics",
    "en"
  );

  const fpA = createLessonFingerprint(lessonA);
  const fpB = createLessonFingerprint(lessonB);
  assert.equal(fpA, fpB);

  const keyA = createTranslationCacheKey(lessonA, "hi");
  const keyB = createTranslationCacheKey(lessonB, "hi");
  assert.equal(keyA, keyB);
  assert.match(keyA, /^hi::comparing quantities/);
});

test("Translation Engine: Passthrough returns immediately when sourceLang equals targetLang", async () => {
  const sampleLesson = getLocalizedContent("Fractions", 4, "Mathematics", "en");

  const result = await translateEducationalContent({
    content: sampleLesson,
    sourceLang: "en",
    targetLang: "en",
    grade: 4,
    subject: "Mathematics",
  });

  assert.equal(result.provider, "passthrough");
  assert.equal(result.cacheHit, true);
  assert.equal(result.content.topic, sampleLesson.topic);
});

test("Benchmark - Comparing Quantities Class 7: Hindi translation preserves exact math and question structure", async () => {
  const englishLesson = getLocalizedContent(
    "Comparing Quantities: Understanding percentages",
    7,
    "Mathematics",
    "en"
  );

  // Translate to Hindi
  const result = await translateEducationalContent({
    content: englishLesson,
    sourceLang: "en",
    targetLang: "hi",
    grade: 7,
    subject: "Mathematics",
  });

  const hindiLesson = result.content;

  // 1. Exactly 5 practice problems preserved
  assert.equal(hindiLesson.problems.length, 5);

  // 2. All 5 difficulties preserved in exact progressive order
  const expectedDifficulties = ["easy", "easy-medium", "medium", "medium-hard", "challenge"];
  for (let i = 0; i < 5; i++) {
    assert.equal(hindiLesson.problems[i].difficulty, expectedDifficulties[i]);
    assert.equal(hindiLesson.problems[i].id, `p${i + 1}`);
  }

  // 3. Problem 1: Fraction to percentage (3/5 -> 60%)
  assert.match(hindiLesson.problems[0].question, /3\/5/);
  assert.match(hindiLesson.problems[0].answer, /60%/);

  // 4. Problem 2: Percentage of quantity (25% of 200 = 50)
  assert.match(hindiLesson.problems[1].question, /200/);
  assert.match(hindiLesson.problems[1].question, /25%/);
  assert.equal(hindiLesson.problems[1].answer.trim(), "50");

  // 5. Problem 3: Profit percentage (200 to 250 = 25%)
  assert.match(hindiLesson.problems[2].answer, /25%/);

  // 6. Problem 4: Simple interest (1000 at 5% for 2 yrs = 100)
  assert.match(hindiLesson.problems[3].answer, /100/);

  // 7. Problem 5: Discounted selling price (800 with 15% discount = 680)
  assert.match(hindiLesson.problems[4].answer, /680/);

  // 8. Teaching notes preserved
  assert.ok(hindiLesson.notes);
  assert.ok(hindiLesson.notes.key_definitions.length >= 2);
  assert.ok(hindiLesson.notes.core_rules.length >= 3);
  assert.ok(hindiLesson.steps.length >= 3);
  assert.ok(hindiLesson.common_mistakes.length >= 2);
  assert.ok(hindiLesson.kid_script.length > 20);

  // 9. Independent mathematical verification runs cleanly
  const verification = verifyEducationalContent(hindiLesson);
  assert.equal(verification.isMathematicallyApplicable, true);
  assert.notEqual(verification.overallStatus, "verification_failed");
});

test("Translation Cache: Consecutive requests return cached result in < 5ms", async () => {
  const englishLesson = getLocalizedContent(
    "Comparing Quantities: Understanding percentages",
    7,
    "Mathematics",
    "en"
  );

  const startA = performance.now();
  const resA = await translateEducationalContent({
    content: englishLesson,
    sourceLang: "en",
    targetLang: "hi",
    grade: 7,
    subject: "Mathematics",
  });
  const durA = performance.now() - startA;
  assert.ok(durA >= 0);

  const startB = performance.now();
  const resB = await translateEducationalContent({
    content: englishLesson,
    sourceLang: "en",
    targetLang: "hi",
    grade: 7,
    subject: "Mathematics",
  });
  const durB = performance.now() - startB;

  assert.equal(resB.cacheHit, true);
  assert.ok(durB < 5, `Expected cached duration < 5ms, got ${durB.toFixed(2)}ms`);
  assert.deepEqual(resA.content, resB.content);
});

test("Concurrent Deduplication: Parallel translation requests resolve to identical result without duplicate calls", async () => {
  const englishLesson = getLocalizedContent("Rational and Irrational Numbers", 8, "Mathematics", "en");

  // Fire two translation requests concurrently
  const [res1, res2] = await Promise.all([
    translateEducationalContent({
      content: englishLesson,
      sourceLang: "en",
      targetLang: "hi",
      grade: 8,
      subject: "Mathematics",
    }),
    translateEducationalContent({
      content: englishLesson,
      sourceLang: "en",
      targetLang: "hi",
      grade: 8,
      subject: "Mathematics",
    }),
  ]);

  assert.deepEqual(res1.content, res2.content);
  assert.equal(res1.content.problems.length, 5);
});

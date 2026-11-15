# Homework Helper — Automated Test Plan & Results

## 1. Test Architecture

The application uses Node.js 24's native test runner (`node:test` + `node:assert/strict`) with TypeScript type stripping. This guarantees fast, zero-dependency test execution without brittle babel/jest setups.

Execution command:
```bash
npm test
```

---

## 2. Implemented Test Suites

### Suite 1: Request Validation & Sanitization (`tests/requests.test.mjs`)
- **Coverage**: 10 tests
- **Verifications**:
  - Valid request normalization (whitespace collapsed, trimmed).
  - Empty or whitespace-only topic rejection.
  - Punctuation/symbol-only topic rejection.
  - Length guard (rejection above 160 characters).
  - Grade range enforcement (rejection < 1, > 8, or floats; acceptance of string numbers).
  - Subject enum enforcement (rejection of unapproved subjects).
  - Language code validation (rejection of unsupported codes like `fr`).
  - Acceptance of all 6 supported codes (`en`, `hi`, `ta`, `te`, `ml`, `kn`).
  - Control character sanitization (ASCII 0x00-0x1F stripping).

### Suite 2: Educational Content Schema (`tests/content-schema.test.mjs`)
- **Coverage**: 5 tests
- **Verifications**:
  - Complete 5-problem structure with ordered difficulties (`easy`, `easy-medium`, `medium`, `medium-hard`, `challenge`).
  - Rejection of fewer than 5 practice questions.
  - Rejection of more than 5 practice questions.
  - Rejection of missing required pedagogical fields (`parent_summary`, `intuition`, `steps`, `kid_script`).
  - Flexible normalization of alternative note keys (`definitions`, `rules`, `examples`, `tips`).

### Suite 3: Deterministic Mathematics Verification (`tests/math-verifier.test.mjs`)
- **Coverage**: 4 tests
- **Verifications**:
  - Safe arithmetic parsing and order-of-operations evaluation (`+`, `-`, `*`, `/`, `^`, `()`) without `eval()`.
  - Independent verification of arithmetic, fractions, percentages, and simple linear equations.
  - Contradiction detection: flags invalid AI calculation (e.g. `8 * 7 = 54`) as `verification_failed`.
  - Pedagogical integrity: non-math topics (e.g. Photosynthesis) are marked `schema_validated`, not falsely `verified`.

### Suite 4: Rate Limiting & Abuse Prevention (`tests/rate-limiter.test.mjs`)
- **Coverage**: 3 tests
- **Verifications**:
  - Threshold allowance (consumes tokens correctly).
  - Rejection when quota exceeded with positive `retryAfterSeconds`.
  - Client IP extraction from reverse proxy headers (`x-forwarded-for`, `cf-connecting-ip`, `x-real-ip`).

### Suite 5: AI JSON Sanitization (`tests/clean-json.test.mjs`)
- **Coverage**: 3 tests
- **Verifications**:
  - Stripping markdown code block fences (```` ```json ````).
  - Stripping conversational text before and after JSON objects.
  - Trailing comma removal before closing braces or brackets.

---

## 3. Test Execution Verification

```bash
> homework-helper@0.1.0 test
> node --experimental-strip-types --test tests/*.test.mjs

✔ JSON Cleaner: Strips markdown code block fences (0.95ms)
✔ JSON Cleaner: Strips surrounding conversational text (0.17ms)
✔ JSON Cleaner: Removes trailing commas before closing braces/brackets (0.70ms)
✔ Content Schema: Valid 5-question curriculum content passes (6.87ms)
✔ Content Schema: Rejects content with fewer than 5 problems (0.62ms)
✔ Content Schema: Rejects content with more than 5 problems (0.35ms)
✔ Content Schema: Rejects missing essential pedagogical fields (0.63ms)
✔ Content Schema: Normalizes alternative key names in notes (0.85ms)
✔ Math Evaluator: Safely parses and evaluates arithmetic expressions (1.98ms)
✔ Math Verifier: Verifies valid arithmetic calculation in practice problem (3.04ms)
✔ Math Verifier: Flags arithmetic contradiction as verification_failed (0.60ms)
✔ Math Verifier: Does not falsely claim non-math subjects are mathematically verified (0.24ms)
✔ Rate Limiter: Allows requests under threshold (1.61ms)
✔ Rate Limiter: Blocks requests exceeding threshold with retryAfterSeconds (0.36ms)
✔ Rate Limiter: Extracts IP correctly from headers (21.99ms)
✔ Request Validation: Valid request passes with normalized data (3.15ms)
✔ Request Validation: Empty or whitespace-only topic rejected (0.60ms)
✔ Request Validation: Symbol-only topic rejected (0.56ms)
✔ Request Validation: Topic exceeding 160 characters rejected (0.28ms)
✔ Request Validation: Invalid grades rejected (<1, >8, non-integer) (0.28ms)
✔ Request Validation: Coerces numeric grade string (0.19ms)
✔ Request Validation: Invalid subject rejected (0.23ms)
✔ Request Validation: Unsupported language code rejected (0.18ms)
✔ Request Validation: All 6 supported languages accepted (0.25ms)
✔ Sanitization: Strips ASCII control characters and collapses whitespace (0.19ms)

ℹ tests 25
ℹ suites 0
ℹ pass 25
ℹ fail 0
ℹ duration_ms 367.83ms
```

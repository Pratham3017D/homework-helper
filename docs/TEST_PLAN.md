# Homework Helper — Test Plan

## 1. Unit Tests

Test:
- input normalization;
- Zod schemas;
- cache-key generation;
- error mapping;
- difficulty ordering;
- math verification functions.

## 2. AI Output Tests

Use fixed fixtures representing:
- valid output;
- missing field;
- wrong type;
- too many/few problems;
- malformed nested problem;
- empty explanation;
- invalid difficulty.

Expected behavior:
- invalid output is rejected;
- no malformed content reaches UI.

## 3. Mathematical Verification

Start with a deliberately small supported set.

For each supported type:
- generate known examples;
- verify correct answer passes;
- wrong answer fails;
- edge cases are covered.

Example categories:
- integer arithmetic;
- basic fractions;
- simple multiplication/division;
- simple percentage/unit problems where deterministic parsing is safe.

Do not pretend arbitrary natural-language math can be safely verified by a naive JavaScript evaluator.

## 4. Integration Tests

Test:

```text
POST request
 ↓
Request validation
 ↓
Cache lookup
 ↓
AI mock
 ↓
Schema validation
 ↓
Domain validation
 ↓
Math verification
 ↓
Response
```

Mock the LLM provider in automated tests.

## 5. E2E Tests

Using Playwright:
1. Open home page.
2. Enter topic.
3. Select grade.
4. Generate.
5. Verify briefing appears.
6. Verify five problems.
7. Reveal hint.
8. Reveal answer.
9. Trigger an error path.
10. Test print view.

## 6. Accessibility Tests

Check:
- keyboard-only flow;
- labels;
- focus order;
- contrast;
- headings;
- screen-reader-friendly status messages.

## 7. Security Tests

Check:
- API key absent from client bundle;
- rate limiting;
- oversized input rejection;
- unauthorized session access;
- safe rendering of generated text;
- no raw internal errors.

## 8. Manual AI Evaluation

Create a benchmark set across:
- Grades 1–2
- Grades 3–5
- Grades 6–8
- Mathematics
- Science
- English

Review:
- correctness;
- age appropriateness;
- clarity;
- usefulness to parents;
- practice progression;
- common mistakes.

## 9. Real User Test

Test with 3–5 parents.

Ask:
- Did you understand the explanation?
- Could you explain it to your child?
- Was anything confusing?
- Were the practice questions useful?
- What would you change?

Do not collect unnecessary personal information about children.

## 10. Release Gate

MVP is ready when:
- core E2E flow passes;
- critical unit tests pass;
- no known secret exposure exists;
- math validator tests pass for supported types;
- mobile flow works;
- print flow works;
- real-user feedback has been incorporated.

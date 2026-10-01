# Homework Helper — Development Rules

## 1. General

This is a learning project and a portfolio project. Code should be understandable enough for the developer to explain in an interview.

## 2. Scope

- MVP first.
- No speculative feature implementation.
- No unnecessary microservices.
- No premature distributed infrastructure.
- Do not add a dependency unless it solves a real problem.

## 3. TypeScript

- Use strict TypeScript.
- Avoid `any`.
- Prefer types inferred from Zod schemas where practical.
- Keep API response types explicit.

## 4. React/Next.js

- Keep components focused.
- Prefer server components by default where appropriate.
- Use client components only when interactivity/browser APIs require them.
- Do not put business logic inside presentation components.
- Keep API calls behind a service boundary.

## 5. AI

- Never trust raw model output.
- Validate structured output.
- Version prompts and schemas.
- Never expose API keys.
- Do not request hidden chain-of-thought.
- Do not store unnecessary user content.

## 6. Math

- Do not use `eval()` on arbitrary model-generated text.
- Build explicit deterministic validators.
- Start with a small supported problem set.
- If a problem cannot be safely verified, do not falsely label it verified.

## 7. Security

- Validate on the server.
- Rate-limit expensive endpoints.
- Keep secrets in environment variables.
- Do not log secrets.
- Avoid collecting unnecessary child information.
- Treat all user/model text as untrusted input.

## 8. UX

Every asynchronous feature needs:
- loading;
- success;
- error;
- retry where appropriate.

Every form needs:
- labels;
- validation;
- useful error messages.

## 9. Testing

Critical business logic must have tests.

Minimum critical paths:
- request validation;
- AI schema validation;
- math verification;
- API generation flow;
- main user journey.

## 10. Git

Commit in logical increments.

Examples:

```text
feat: add topic input form
feat: add learning result layout
feat: add content generation endpoint
test: add content schema validation
feat: add math verification
fix: handle invalid AI output
```

Do not make a single giant commit containing the entire project.

## 11. Code Review Rule

Before considering a feature complete:
- run lint;
- run typecheck;
- run tests;
- manually test the feature;
- check mobile layout;
- inspect the diff.

## 12. Learning Rule

When introducing a new concept, explain:
- what it does;
- why we need it;
- where it belongs;
- what alternatives exist.

Do not hide architectural decisions behind generated code.

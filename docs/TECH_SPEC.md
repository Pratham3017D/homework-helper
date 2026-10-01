# Homework Helper — Technical Specification

## 1. Goals

Build a production-quality MVP with a simple architecture that a solo developer can understand and maintain.

## 2. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Validation | Zod |
| AI | Server-side LLM provider |
| Database | PostgreSQL / Supabase |
| Auth | Supabase Auth when accounts are enabled |
| Math rendering | KaTeX |
| PDF/print | Print CSS initially; react-pdf if needed |
| Testing | Vitest + React Testing Library + Playwright |
| Deployment | Vercel |
| Package manager | npm or pnpm |

## 3. Architecture

```text
Browser
  |
  | HTTPS
  v
Next.js App
  |
  +--> UI components
  |
  +--> Route handlers / server actions
           |
           +--> Input validation (Zod)
           |
           +--> Content service
           |       |
           |       +--> Cache
           |       +--> LLM provider
           |       +--> Output schema validation
           |       +--> Math verification
           |
           +--> PostgreSQL/Supabase
```

## 4. Request Lifecycle

```text
Client form
   ↓
Client validation
   ↓
POST /api/content/generate
   ↓
Server Zod validation
   ↓
Normalize topic/context
   ↓
Cache lookup
   ↓
LLM request if cache miss
   ↓
Parse structured output
   ↓
Zod validation
   ↓
Domain validation
   ↓
Math verification where supported
   ↓
Persist/cached result
   ↓
Return safe response
```

## 5. Server/Client Boundary

- API keys are server-only.
- LLM calls occur only on the server.
- Database credentials never enter client bundles.
- The client should not be trusted for authorization or validation.
- Server route handlers validate all incoming data.

## 6. AI Strategy

The model is asked for structured JSON matching `AI_CONTENT_SCHEMA.json`.

The application should:
1. Give explicit grade/subject context.
2. Require concise content.
3. Require exactly five practice problems for MVP.
4. Require hints and solution steps.
5. Avoid unsupported curriculum claims.
6. Avoid exposing hidden chain-of-thought.
7. Return only user-facing explanation fields and concise solution steps.

The system should not request or store private model reasoning.

## 7. Validation Layers

### Layer 1 — Request validation
Zod validates topic, grade, subject, curriculum.

### Layer 2 — AI schema validation
Zod validates the generated object.

### Layer 3 — Domain validation
Check:
- expected number of problems;
- allowed difficulty values;
- text lengths;
- non-empty required fields.

### Layer 4 — Math verification
For supported problem types, independently calculate the expected answer.

### Layer 5 — Presentation
Only validated data reaches the UI.

## 8. Caching

Cache key should include normalized:
- topic;
- grade;
- subject;
- curriculum;
- relevant prompt/schema version.

Example:

```text
content:v1:grade4:math:cbse:long-division
```

Do not cache private/user-specific data under a public key.

## 9. Rate Limiting

MVP should have a server-side rate limit for content generation.

At minimum:
- per IP for unauthenticated usage;
- per user for authenticated usage;
- clear 429 response;
- no unlimited retry loop.

## 10. Error Model

Use stable error codes:

```text
INVALID_INPUT
RATE_LIMITED
AI_PROVIDER_ERROR
AI_OUTPUT_INVALID
CONTENT_VERIFICATION_FAILED
DATABASE_ERROR
UNKNOWN_ERROR
```

Do not expose provider secrets or raw internal errors to users.

## 11. Observability

MVP logging should capture:
- request ID;
- timestamp;
- generation success/failure;
- validation result;
- verification result;
- latency;
- provider/model identifier where appropriate.

Do not log:
- API keys;
- unnecessary child information;
- full private prompts containing personal data;
- sensitive user content unless required.

## 12. Security

- HTTPS in production.
- Environment variables for secrets.
- Server-side authorization.
- Input length limits.
- Rate limiting.
- Content-type validation.
- Avoid raw SQL string interpolation.
- Sanitize/render generated HTML safely.
- Never execute AI-generated code.
- Keep dependency versions maintained.

## 13. Accessibility

- Semantic HTML.
- Keyboard navigation.
- Visible focus states.
- Labels for all controls.
- Sufficient contrast.
- `aria-live` for generation status where useful.
- Math content should have accessible fallback text where practical.

## 14. Deployment

Recommended:
- Vercel for Next.js.
- Supabase for PostgreSQL/auth.
- LLM provider API key stored as Vercel environment variable.

Environment variables:

```text
LLM_API_KEY=
LLM_MODEL=
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Only variables explicitly prefixed `NEXT_PUBLIC_` should be considered client-exposed.

## 15. Architectural Decisions

1. Server-side LLM calls.
2. Structured output rather than free-form parsing.
3. Zod as the runtime validation boundary.
4. Programmatic math verification where supported.
5. PostgreSQL rather than an unstructured document store.
6. Print CSS before introducing a complex PDF pipeline.
7. No account required for the first basic generation flow unless abuse controls require it.
8. No V2 feature should dictate MVP complexity.

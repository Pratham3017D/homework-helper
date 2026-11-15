# Homework Helper — Technical Specification

## 1. Goals
Build a reliable, production-ready AI educational assistant for parents of children in Grades 1–8. Provide deep teaching notes, intuition, and practice questions across 6 languages with strict security, independent math verification, and graceful offline fallback.

---

## 2. Production Stack

| Layer | Choice | Details |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Server & Client Components, Route Handlers |
| **Language** | TypeScript (Strict Mode) | Zero `any` policy, strong typing |
| **Styling** | Tailwind CSS v4 | Clean mobile-first design, `@media print` worksheet |
| **Validation** | Zod 4 | Input & AI content schema enforcement |
| **Primary AI** | Google Gemini API | `gemini-flash-lite-latest` (primary), `gemini-3.5-flash`, `gemini-3.8-flash` |
| **Secondary AI** | OpenAI-Compatible API | Optional secondary fallback provider |
| **Rate Limiter** | Sliding Window / Redis | In-memory with Upstash Redis REST support |
| **Math Engine** | Deterministic Evaluator | Recursive-descent parser, zero `eval()` |
| **Testing** | Node.js Test Runner | Built-in zero-dependency unit & integration suite |

---

## 3. High-Level Architecture

```text
                        Browser (Client)
                               |
                               | HTTPS / JSON
                               v
                     Next.js 16 App Router
                               |
            +------------------+-------------------+
            |                                      |
     Server-Side (SSR)                    API Route Handler
      /learn?topic=...               POST /api/content/generate
            |                                      |
            |                             1. Payload Check (16KB)
            |                             2. Rate Limiting (IP Window)
            |                             3. Zod Sanitization & Schema
            |                                      |
            +------------------+-------------------+
                               |
                               v
                   AI Orchestration Layer
                               |
              +----------------+----------------+
              |                                 |
     1. Google Gemini API            2. OpenAI-Compatible Fallback
     (gemini-flash-lite-latest)      (Regional / Rate-limit backup)
              |                                 |
              +----------------+----------------+
                               | (Raw JSON)
                               v
                   JSON Sanitizer & Zod Validation
                   (5 Ordered Difficulty Problems)
                               |
                               v
               Independent Math Verification Engine
               - Deterministic Arithmetic
               - Fractions & Percentages
               - Simple Linear Equations
               - Contradiction Detection
                               |
                               v
             Structured Response with Truthful Metadata
             (source, provider, model, verificationStatus)
```

---

## 4. Verification Engine Architecture

Educational accuracy is strictly separated from LLM generation:
- **`schema_validated`**: Default for non-math subjects (Science, English, History) and conceptual problems that pass structural pedagogical checks.
- **`verified`**: The independent math engine parsed the equation from the question, calculated the exact result deterministically, and matched the stated answer.
- **`verification_failed`**: The independent math engine parsed the calculation and discovered a factual mathematical contradiction in the AI answer (e.g. `8 * 7 = 54`).
- **`not_verified`**: Computation could not be determined.

---

## 5. Security & Rate Limiting

1. **Payload Guard**: Max request body size capped at 16 KB (HTTP 413).
2. **Malformed JSON Guard**: Rejects unparseable bodies with HTTP 400 `MALFORMED_JSON`.
3. **Input Sanitization**: ASCII control characters stripped, multiple spaces collapsed.
4. **Rate Limiting**:
   - In-memory sliding window for standard nodes.
   - Upstash Redis REST adapter for distributed serverless multi-instance deployments.
   - HTTP 429 with `Retry-After` and standard `X-RateLimit-*` headers.
5. **Secret Protection**: API keys are isolated to the server; never exposed to client bundles or logged.

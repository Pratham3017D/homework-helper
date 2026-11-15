# Homework Helper — Production Roadmap & Milestones

## ✅ Phase 0 — Architecture & Specification
- [x] Finalized product requirements (PRD, Tech Spec, UI/UX Spec).
- [x] Defined structured JSON schema for educational lessons and in-depth notes.
- [x] Configured TypeScript strict mode and Tailwind CSS design tokens.

## ✅ Phase 1 — UI Foundation & Design System
- [x] Mobile-first responsive layout with clean hierarchy.
- [x] Interactive topic input, Grade 1–8 selector, and subject selector with presets.
- [x] Parent Briefing card (30-second summary, intuition, teaching steps).
- [x] Complete Study & Teaching Notes card (Concept Breakdown, Key Terms, Core Rules, Real-World Analogies, Parent Cheat Sheet).
- [x] Conversational "Try saying this to your child" script.
- [x] Common Mistakes to watch out for.
- [x] 5 progressive practice questions with interactive Hint & Solution drawers.
- [x] Print-friendly worksheet formatting (`@media print`).

## ✅ Phase 2 — AI Orchestration & Reliability
- [x] Integrated Google Gemini API (`gemini-flash-lite-latest` primary, `gemini-3.5-flash`, `gemini-3.8-flash`).
- [x] OpenAI-compatible secondary provider fallback.
- [x] Safe JSON extraction and sanitization (strips markdown fences and trailing commas).
- [x] Strict Zod response schema validation enforcing 5 ordered-difficulty questions.
- [x] Bounded retries with exponential backoff for transient errors (429, 503).
- [x] Zero-downtime offline curriculum fallback when AI is unavailable.

## ✅ Phase 3 — Security, Rate Limiting & Verification
- [x] Max payload limit (16 KB) with HTTP 413 `PAYLOAD_TOO_LARGE`.
- [x] Malformed JSON protection with HTTP 400 `MALFORMED_JSON`.
- [x] Input sanitization (ASCII control character stripping, whitespace normalization).
- [x] Production rate limiting (15 req/min per IP) with in-memory sliding window + Upstash Redis REST adapter.
- [x] Independent deterministic math verification engine (`safeEvaluate`, fractions, percentages, simple linear equations) without `eval()`.
- [x] Truthful response metadata (`ai-live` vs `offline-fixture`, accurate `verificationStatus`).

## ✅ Phase 4 — Multilingual System
- [x] Real-time dynamic generation in 6 languages: English, हिन्दी (Hindi), தமிழ் (Tamil), తెలుగు (Telugu), മലയാളം (Malayalam), and ಕನ್ನಡ (Kannada).
- [x] In-memory translation caching to avoid redundant API queries.
- [x] Protection against duplicate simultaneous in-flight requests.
- [x] Graceful error state with inline retry functionality.

## 🚀 Phase 5 — Future Enhancements
- [ ] User accounts and bookmarking saved topics (Supabase Auth).
- [ ] Direct worksheet PDF generation with downloadable answersheet.
- [ ] Voice explanation playback for parents using Web Speech API.

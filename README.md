# Homework Helper for Parents 🎓

> **"Understand the topic in 2 minutes. Help your child in 10."**

A mobile-first educational web application designed to help parents of children in **Grades 1–8** understand homework topics and explain them with confidence. 

Rather than simply handing answers to a child, **Homework Helper** empowers the parent with the intuition, complete teaching notes, conversation scripts, common mistakes, and structured practice problems—in their preferred language.

---

## 🌟 Key Features

### 1. ⚡ Quick Parent Briefing (Read in 30 Seconds)
- **One-Sentence Overview**: A clear definition of the concept in plain language.
- **The Intuition Behind It**: Everyday metaphors and physical analogies explaining *why* it works before jumping into procedures.
- **Step-by-Step Method**: Clear, sequential teaching steps.

### 2. 📚 Complete Teaching Notes for Parents
- **In-Depth Concept Breakdown**: Comprehensive study notes covering background theory and context.
- **🔑 Key Terms & Definitions**: Jargon-free glossary of all essential vocabulary (e.g. *Numerator/Denominator, Scale Factor, Chlorophyll, Proper Nouns*).
- **📐 Core Rules & Formulas**: Mathematical theorems, equations, and principles (e.g. *AAA, SSS, and SAS similarity rules; Area scaling factor $k^2$*).
- **🌍 Real-World Metaphors**: Everyday examples to illustrate concepts to children (e.g. *zooming on smartphones, shadow reckoning, pizza slices*).
- **⚡ Parent's Quick Cheat Sheet**: Rapid-reference tips and memory tricks to keep open on a phone while tutoring.

### 3. 💬 Conversational Teaching Script (*"Try saying this to your child"*)
- Natural, warm, conversational phrasing parents can easily adapt to their personal speaking style.

### 4. ⚠️ Common Mistakes to Watch Out For
- Pinpoints the typical misconceptions children make (e.g., adding denominators, confusing similarity with congruence) so parents can catch them early.

### 5. 🎯 5 Progressive Practice Problems
- Exactly 5 problems ranked by difficulty: **Easy ➔ Easy-Medium ➔ Medium ➔ Medium-Hard ➔ Challenge**.
- **💡 Interactive Hint Drawer**: Guides the child forward without spoiling the solution.
- **✓ Reveal Answer & Detailed Solution**: Complete step-by-step resolution steps for verification.

### 6. 🌐 Real-Time Multilingual Support
- Switch languages with a single click right on the results page:
  - **English**
  - **हिन्दी** (Hindi)
  - **தமிழ்** (Tamil)
  - **తెలుగు** (Telugu)
  - **മലയാളം** (Malayalam)
  - **ಕನ್ನಡ** (Kannada)
- Instantly translates the entire parent briefing, complete teaching notes, teaching script, common mistakes, hints, and practice questions.

### 7. 🖨️ Print-Friendly Worksheet
- Dedicated print layout (`@media print`) that formats practice problems cleanly for paper or PDF export.

### 8. 🤖 Resilient Dual-Engine AI Backend
- **Direct Google Gemini Integration**: Uses Google's Gemini models (`gemini-flash-lite-latest`, `gemini-3.5-flash`, `gemini-3.8-flash`) to dynamically generate customized teaching notes, parent briefings, conversational scripts, common mistakes, and 5 progressive problems for **any homework topic**.
- **Complete In-Depth Notes**: Generates full study notes for parents: concept breakdowns, key term definitions, core rules/formulas, real-world analogies, and a quick cheat sheet.
- **Multilingual AI Output**: Dynamically outputs complete notes and questions in English, Hindi, Tamil, Telugu, Malayalam, or Kannada with client-side caching.
- **Zero-Downtime Fallback**: If an external AI provider experiences rate-limiting or network issues, the system automatically falls back to rich built-in curriculum content.

### 9. 🛡️ API Security & Rate Limiting
- **Payload Guard**: Enforces 16 KB request body limit (HTTP 413 `PAYLOAD_TOO_LARGE`).
- **Input Sanitization**: Control characters stripped, whitespace collapsed, topic length and subject verified with Zod 4.
- **Production Rate Limiting**: 15 requests/minute per client IP via in-memory sliding window with support for Upstash Redis REST.

### 10. 🧮 Independent Mathematics Verification Engine
- **Deterministic Math Verification**: Independent AST tokenizer and recursive descent parser verifies arithmetic, fractions, percentages, and simple equations without using `eval()`.
- **Contradiction Detection**: Detects calculation contradictions in AI answers and flags them as `verification_failed`.
- **Truthful Status**: Content is tagged accurately as `schema_validated`, `verified`, or `verification_failed`—never making false verification claims for non-mathematical subjects.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Validation** | [Zod 4](https://zod.dev/) (Request & Content schema enforcement) |
| **AI Integration** | OpenAI-compatible REST Client (`/v1/chat/completions`) |
| **Typography** | Native modern system font stack with fast rendering |

---

## 📂 Project Architecture

```text
homework-helper/
├── app/
│   ├── api/
│   │   └── content/
│   │       └── generate/
│   │           └── route.ts          # POST endpoint for AI content generation
│   ├── learn/
│   │   └── page.tsx                  # Learning result page (Server Component)
│   ├── globals.css                   # Tailwind v4 themes and typography tokens
│   ├── layout.tsx                    # Root layout & SEO metadata
│   ├── not-found.tsx                 # Custom 404 page
│   └── page.tsx                      # Landing page with interactive hero & topic form
│
├── components/
│   ├── common/
│   │   ├── Button.tsx                # Reusable button with variants & loading state
│   │   ├── ErrorMessage.tsx          # Accessible error alert banner
│   │   └── LoadingState.tsx          # Multi-step progress animation & skeletons
│   ├── input/
│   │   ├── GradeSelector.tsx         # Grades 1–8 selector dropdown
│   │   ├── SubjectSelector.tsx       # Subject options (Math, Science, English, etc.)
│   │   └── TopicForm.tsx             # Interactive topic input with example chip hooks
│   ├── layout/
│   │   ├── Header.tsx                # Brand header with logo
│   │   └── Footer.tsx                # App footer
│   └── learning/
│       ├── CommonMistakes.tsx        # Pitfall warning card
│       ├── LanguageToggle.tsx        # Multilingual toggle bar (EN, HI, TA, TE, ML, KN)
│       ├── LearnView.tsx             # Reactive client wrapper for real-time translation
│       ├── ParentBriefing.tsx        # Summary, intuition, and step-by-step method
│       ├── PracticeSet.tsx           # 5 progressive problems with hint/solution reveals
│       ├── PrintButton.tsx           # Browser print action trigger
│       ├── TeachingNotes.tsx         # Complete study notes, glossary, and rules
│       └── TeachingScript.tsx        # "Try saying this to your child" conversational card
│
├── lib/
│   ├── ai/
│   │   ├── client.ts                 # HTTP client for OpenAI-compatible chat endpoints
│   │   ├── generate-content.ts       # LLM orchestrator & JSON sanitization
│   │   └── prompts.ts                # Structured educational system and user prompts
│   ├── constants/
│   │   └── languages.ts              # Supported language codes & localized UI dictionary
│   ├── fixtures/
│   │   ├── sample-content.ts         # Base educational lessons (Fractions, Photosynthesis, Nouns)
│   │   └── translations.ts           # Full multilingual translations (Triangles, Fractions, etc.)
│   ├── security/
│   │   └── rate-limit.ts             # Sliding window in-memory & Upstash Redis rate limiter
│   └── verification/
│       └── math-verifier.ts          # Deterministic AST math & equation verification engine
│
├── schemas/
│   ├── content.ts                    # Zod schema for structured lesson content & notes
│   └── requests.ts                   # Zod schema for input sanitization & validation
│
├── tests/                            # Zero-dependency Node 24 native test suite
│   ├── clean-json.test.mjs           # AI markdown fence & trailing comma tests
│   ├── content-schema.test.mjs       # 5 progressive problems & difficulty tests
│   ├── math-verifier.test.mjs        # Deterministic arithmetic & equation tests
│   ├── rate-limiter.test.mjs         # Sliding window quota & IP extraction tests
│   └── requests.test.mjs             # Input validation, bounds & sanitization tests
│
├── docs/                             # Architecture & engineering specs
├── .env.example                      # Production template for environment variables
├── .env.local                        # Private local API keys (git-ignored)
└── package.json
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18.18.0 or higher
- **npm** (or pnpm / yarn)

### 2. Installation
Clone the repository and install dependencies:

```bash
cd homework-helper
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the `homework-helper` directory (you can copy `.env.example`):

```bash
cp .env.example .env.local
```

Configure your AI provider credentials in `.env.local`:

```env
# Google Gemini API Key
GEMINI_API_KEY="your_google_gemini_api_key_here"
AI_MODEL="gemini-flash-lite-latest"
```

*(Note: The application includes an offline educational engine, so it remains functional even without an API key).*

### 4. Running the Development Server
Start the Next.js development server:

```bash
npm run dev
```

Open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

### 5. Automated Testing & Verification
Execute the full unit, schema, math verification, and rate limiter test suite:

```bash
# Run all automated test suites (25 tests)
npm test

# Run ESLint
npm run lint

# Check TypeScript strict typing
npx tsc --noEmit

# Compile production build
npm run build

# Start production server
npm run start
```

---

## 📡 API Specification

### `POST /api/content/generate`
Generates a complete validated educational package.

#### Request Body
```json
{
  "topic": "Similarity of triangles",
  "grade": 7,
  "subject": "Mathematics",
  "lang": "en"
}
```

#### Response (`200 OK`)
```json
{
  "content": {
    "topic": "Similarity of Triangles",
    "grade": 7,
    "subject": "Mathematics",
    "parent_summary": "Two triangles are similar if they have the exact same shape...",
    "intuition": "Think of zooming in or out on a photo of a triangle on your phone...",
    "notes": {
      "overview": "In Euclidean geometry, two figures are similar if...",
      "key_definitions": [
        { "term": "Scale Factor (k)", "meaning": "The constant ratio between matching sides." }
      ],
      "core_rules": [
        "AAA (Angle-Angle-Angle) Rule: Equal corresponding angles guarantee similarity."
      ],
      "real_world_examples": [
        "Shadow reckoning used to measure the height of trees."
      ],
      "parent_cheat_sheet": [
        "Angles NEVER change when scaling—only side lengths do."
      ]
    },
    "steps": ["..."],
    "common_mistakes": ["..."],
    "kid_script": "Look at this small toy car and a real car...",
    "problems": [
      {
        "id": "p1",
        "difficulty": "easy",
        "question": "...",
        "hint": "...",
        "answer": "...",
        "solution_steps": ["..."]
      }
    ]
  },
  "metadata": {
    "cacheHit": false,
    "source": "ai-live",
    "model": "qwen/qwen3.7-flash:free",
    "verificationStatus": "verified"
  }
}
```

#### Error Response (`400 Bad Request`)
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Please enter a topic or homework question.",
    "details": [...]
  }
}
```

---

## 🛡️ Engineering & Design Principles

1. **Parent-First, Child-Second**: The UI is designed for an adult holding a phone with one hand while sitting beside their child.
2. **Teach Rather Than Answer**: Answers and hints remain hidden behind toggles so children think through problems independently.
3. **Strict Validation**: AI output is treated as untrusted text until validated through Zod schemas.
4. **Resilience**: Zero-downtime architecture with instantaneous local fallbacks ensures parents never encounter blank screens.
5. **No Clutter / Minimal Latency**: Fast, clean interactions with no unnecessary heavy client bundles.

---

## 🗺️ Roadmap & Next Steps

- [x] **Phase 1**: Responsive UI, topic input, grade/subject selectors, and sample fixtures.
- [x] **Phase 2**: Complete Teaching Notes, conversational teaching script, and 5-problem practice engine.
- [x] **Phase 3**: Real-time Multilingual engine (**English, Hindi, Tamil, Telugu, Malayalam, Kannada**).
- [x] **Phase 4**: OpenAI-compatible LLM backend integration (BazaarLink / Qwen) and production build fixes.
- [ ] **Phase 5**: Deterministic math verification engine for formula checking.
- [ ] **Phase 6**: Homework photo upload via mobile camera / OCR input.
- [ ] **Phase 7**: Audio voice mode to read the teaching script aloud.

---

## 📄 License
MIT License. Built for parents everywhere who want to make learning moments positive and empowering.

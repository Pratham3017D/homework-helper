# Homework Helper — Project Structure

## Recommended structure

```text
homework-helper/
├── app/
│   ├── api/
│   │   └── content/
│   │       └── generate/
│   │           └── route.ts
│   ├── learn/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── LoadingState.tsx
│   ├── input/
│   │   ├── TopicForm.tsx
│   │   ├── GradeSelector.tsx
│   │   └── SubjectSelector.tsx
│   ├── learning/
│   │   ├── ParentBriefing.tsx
│   │   ├── TeachingScript.tsx
│   │   ├── CommonMistakes.tsx
│   │   └── PracticeSet.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
│
├── lib/
│   ├── ai/
│   │   ├── client.ts
│   │   ├── generate-content.ts
│   │   └── prompts.ts
│   ├── validation/
│   │   ├── request.ts
│   │   └── content.ts
│   ├── math/
│   │   ├── verifier.ts
│   │   └── supported-types.ts
│   ├── cache/
│   │   └── content-cache.ts
│   ├── db/
│   │   └── client.ts
│   └── utils/
│       ├── normalize-topic.ts
│       └── errors.ts
│
├── schemas/
│   ├── content.ts
│   └── requests.ts
│
├── types/
│   └── content.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/
│   └── project documentation
│
├── public/
│   └── ...
│
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Rules

- `components/` contains UI.
- `lib/` contains domain/infrastructure logic.
- `schemas/` contains Zod schemas.
- `types/` contains shared TypeScript types when they cannot be derived from schemas.
- API routes remain thin and delegate business logic to services.
- Do not put LLM calls directly inside React components.
- Do not duplicate validation rules across unrelated files.
- Keep math verification independent from the LLM provider.

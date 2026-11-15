# Homework Helper — API Specification

## Base URL
`/api`

---

## 1. Generate Teaching Content

### `POST /api/content/generate`

Generates an end-to-end parent tutoring guide including intuition breakdown, complete study notes, conversational script, common pitfalls, and 5 progressive practice questions.

#### Request Headers
| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |
| `Content-Length` | Max 16,384 bytes (16 KB) | Enforced |

#### Request Body
```json
{
  "topic": "Newton's Third Law of Motion",
  "grade": 7,
  "subject": "Science",
  "lang": "en"
}
```

##### Field Constraints
- `topic` *(string, required)*: Length 2 to 160 characters. Control characters stripped, whitespace normalized. Must contain alphanumeric characters.
- `grade` *(integer, required)*: Minimum `1`, maximum `8`.
- `subject` *(string, required)*: Must be one of `"Mathematics"`, `"Science"`, `"English"`, `"Language"`, `"Other"`.
- `lang` *(string, optional, default: `"en"`)*: Supported codes: `"en"`, `"hi"`, `"ta"`, `"te"`, `"ml"`, `"kn"`.

---

#### Success Response (`200 OK`)
```json
{
  "content": {
    "topic": "Newton's Third Law of Motion",
    "grade": 7,
    "subject": "Science",
    "parent_summary": "Forces always come in equal and opposite pairs.",
    "intuition": "Think of jumping off a small canoe...",
    "notes": {
      "overview": "Detailed conceptual breakdown...",
      "key_definitions": [
        { "term": "Action Force", "meaning": "Initial force applied onto a second object." },
        { "term": "Reaction Force", "meaning": "Equal and opposite force returned." }
      ],
      "core_rules": [
        "Forces always occur in simultaneous pairs.",
        "Action and reaction forces act on two different objects."
      ],
      "real_world_examples": [
        "Walking: feet push backward, earth pushes body forward."
      ],
      "parent_cheat_sheet": [
        "Equal force does not mean equal acceleration due to differing masses."
      ]
    },
    "steps": [
      "Step 1: Identify interacting objects."
    ],
    "common_mistakes": [
      "Thinking action and reaction cancel out."
    ],
    "kid_script": "Think of high-fiving someone...",
    "problems": [
      {
        "id": "p1",
        "difficulty": "easy",
        "question": "What happens when you push against a wall?",
        "hint": "Wall pushes back.",
        "answer": "The wall exerts an equal force back on you.",
        "solution_steps": ["Action force on wall", "Reaction force on you"]
      },
      { "id": "p2", "difficulty": "easy-medium", "question": "...", "hint": "...", "answer": "...", "solution_steps": ["..."] },
      { "id": "p3", "difficulty": "medium", "question": "...", "hint": "...", "answer": "...", "solution_steps": ["..."] },
      { "id": "p4", "difficulty": "medium-hard", "question": "...", "hint": "...", "answer": "...", "solution_steps": ["..."] },
      { "id": "p5", "difficulty": "challenge", "question": "...", "hint": "...", "answer": "...", "solution_steps": ["..."] }
    ]
  },
  "metadata": {
    "source": "ai-live",
    "provider": "google-gemini",
    "model": "gemini-flash-lite-latest",
    "verificationStatus": "schema_validated",
    "verificationSummary": "Pedagogical structure and schema validated.",
    "fallbackUsed": false,
    "cacheHit": false,
    "language": "en",
    "timestamp": "2026-11-15T09:33:40.111Z"
  }
}
```

#### Response Headers
- `X-RateLimit-Limit`: Maximum requests per window (e.g. `15`)
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: Unix timestamp in milliseconds when quota resets

---

### Error Responses

#### `400 Bad Request — Malformed JSON`
```json
{
  "error": {
    "code": "MALFORMED_JSON",
    "message": "The request body must be valid, well-formed JSON."
  }
}
```

#### `400 Bad Request — Validation Error`
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Please select a grade between 1 and 8.",
    "details": [
      { "field": "grade", "issue": "Please select a grade between 1 and 8." }
    ]
  }
}
```

#### `413 Payload Too Large`
```json
{
  "error": {
    "code": "PAYLOAD_TOO_LARGE",
    "message": "Request payload exceeds maximum allowed size (16 KB)."
  }
}
```

#### `429 Too Many Requests — Rate Limit Exceeded`
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many lesson requests from your connection. Please wait a few seconds before trying again.",
    "retryAfter": 14
  }
}
```
*Headers: `Retry-After: 14`*

#### `500 Internal Server Error`
```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Failed to process request. Please try again."
  }
}
```
*(No sensitive keys, stack traces, or internal IP addresses are ever leaked).*

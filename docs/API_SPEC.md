# Homework Helper — API Specification

## Base

`/api`

## 1. Generate Content

### POST `/api/content/generate`

Request:

```json
{
  "topic": "long division",
  "grade": 4,
  "subject": "Mathematics",
  "curriculum": "CBSE"
}
```

Response `200`:

```json
{
  "content": {
    "topic": "Long Division",
    "grade": 4,
    "subject": "Mathematics",
    "parent_summary": "...",
    "intuition": "...",
    "steps": ["..."],
    "common_mistakes": ["..."],
    "kid_script": "...",
    "problems": []
  },
  "metadata": {
    "cacheHit": false,
    "verificationStatus": "verified"
  }
}
```

### Validation errors

`400 INVALID_INPUT`

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Please provide a topic and grade."
  }
}
```

### Rate limit

`429 RATE_LIMITED`

```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Please try again later."
  }
}
```

### AI failure

`502 AI_PROVIDER_ERROR`

### Invalid AI output

`502 AI_OUTPUT_INVALID`

The client should not receive raw provider errors.

## 2. Future endpoints

These are documented but NOT MVP requirements:

### POST `/api/sessions`
Save a learning session.

### GET `/api/sessions`
List authenticated user's sessions.

### POST `/api/feedback`
Submit product feedback.

### POST `/api/stuck`
Generate a targeted explanation for a child's confusion.

## 3. Authentication

MVP generation can be anonymous if rate limiting is sufficient.

Authenticated endpoints require a valid session.

Never accept a user ID from the request body as proof of identity. Derive identity from the authenticated server session.

## 4. API Design Rules

- Validate all request bodies with Zod.
- Return stable error codes.
- Use appropriate HTTP status codes.
- Keep route handlers thin.
- Business logic belongs in services.
- Never expose secrets.
- Set reasonable request-size limits.
- Log a request ID for debugging.

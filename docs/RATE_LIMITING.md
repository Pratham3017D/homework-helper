# Production Rate Limiting Architecture & Configuration

Homework Helper implements a production-grade, distributed rate-limiting strategy to protect the API against abuse, denial-of-service, and runaway LLM billing.

---

## 1. Architecture Overview

Rate limiting is applied to both the content-generation endpoint (`/api/content/generate`) and the translation endpoint (`/api/content/translate`).

### Storage Strategies:
1. **In-Memory Sliding Window (Default for Local Development / Single-Instance)**
   - Tracks request counts per client IP over a sliding time window (default: 15 requests per 60 seconds).
   - Features automatic garbage collection every 5 minutes to prevent memory leaks in standing server processes.

2. **Distributed Serverless Redis (Recommended for Production / Vercel / Cloud Run / Multi-Instance)**
   - Uses zero-dependency HTTP REST communication via Upstash Redis.
   - Shares rate-limit counters across all serverless lambda workers and regions.
   - Employs an atomic pipeline (`INCR` + `EXPIRE` + `TTL`) with a strict 2-second timeout.
   - **Graceful Fallback**: If Redis is unreachable or times out, the system automatically falls back to in-memory limiting without failing the user's request.

---

## 2. Configuration Options

Set the following environment variables in your deployment environment (e.g. `.env.production` or Vercel Environment Variables):

| Variable | Description | Default | Required for Production? |
| :--- | :--- | :--- | :--- |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint URL | *(unset)* | Yes (for distributed serverless) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST read/write token | *(unset)* | Yes (for distributed serverless) |
| `RATE_LIMIT_MAX_REQUESTS` | Maximum requests allowed per window per IP | `15` | Optional |
| `RATE_LIMIT_WINDOW_MS` | Sliding window duration in milliseconds | `60000` (1 min) | Optional |

---

## 3. Step-by-Step Upstash Redis Setup

1. Create a free Redis database at [Upstash](https://upstash.com).
2. Under **REST API Details**, copy:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
3. Add these to your production hosting environment:
   ```bash
   UPSTASH_REDIS_REST_URL="https://your-database-name.upstash.io"
   UPSTASH_REDIS_REST_TOKEN="your_upstash_rest_token_here"
   ```
4. Once configured, the backend automatically detects the credentials and switches from `memory` to `redis` backend seamlessly.

---

## 4. HTTP Headers & Error Format

When rate limiting is active, all API responses return standard headers:

```http
X-RateLimit-Limit: 15
X-RateLimit-Remaining: 14
X-RateLimit-Reset: 1731670800000
```

When a client exceeds the threshold, the API responds with **HTTP 429 Too Many Requests**:

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many lesson requests from your connection. Please wait a few seconds before trying again.",
    "retryAfter": 12
  }
}
```
Along with the `Retry-After: 12` HTTP header.

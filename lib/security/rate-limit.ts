/**
 * Production-Ready Rate Limiting for Homework Helper
 *
 * Supports:
 * 1. Default In-Memory Sliding Window with automatic memory garbage collection.
 * 2. Distributed Serverless Rate Limiting via Upstash Redis REST API (zero extra dependencies).
 *    Configured via UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
 *
 * Graceful fallback: If external Redis is unreachable, seamlessly falls back to memory.
 */

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number; // timestamp in ms when window resets
  retryAfterSeconds: number;
  backend: "redis" | "memory";
}

export interface RateLimiterStorage {
  consume(
    key: string,
    limit: number,
    windowMs: number
  ): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
  }>;
}

// In-Memory Token Bucket / Sliding Window Storage
class MemoryRateLimiterStorage implements RateLimiterStorage {
  private store = new Map<string, { count: number; resetTime: number }>();
  private lastPrune = Date.now();

  async consume(key: string, limit: number, windowMs: number) {
    const now = Date.now();

    // Periodic pruning every 5 minutes to prevent memory leaks
    if (now - this.lastPrune > 300000) {
      this.prune(now);
      this.lastPrune = now;
    }

    const record = this.store.get(key);

    if (!record || now >= record.resetTime) {
      const resetTime = now + windowMs;
      this.store.set(key, { count: 1, resetTime });
      return {
        allowed: true,
        remaining: limit - 1,
        resetTime,
      };
    }

    record.count += 1;
    const allowed = record.count <= limit;
    const remaining = Math.max(0, limit - record.count);

    return {
      allowed,
      remaining,
      resetTime: record.resetTime,
    };
  }

  private prune(now: number) {
    for (const [key, value] of this.store.entries()) {
      if (now >= value.resetTime) {
        this.store.delete(key);
      }
    }
  }

  // Exposed for automated test resets
  clear() {
    this.store.clear();
  }
}

// Optional Distributed Redis Storage (HTTP REST - zero dependencies)
class UpstashRedisRateLimiterStorage implements RateLimiterStorage {
  private url: string;
  private token: string;
  private fallbackMemory: MemoryRateLimiterStorage;

  constructor(
    url: string,
    token: string,
    fallbackMemory: MemoryRateLimiterStorage
  ) {
    this.url = url;
    this.token = token;
    this.fallbackMemory = fallbackMemory;
  }

  async consume(key: string, limit: number, windowMs: number) {
    try {
      const redisKey = `ratelimit:hwhelper:${key}`;
      const expireSeconds = Math.ceil(windowMs / 1000);

      // Multi-exec pipeline or INCR + EXPIRE via Upstash REST pipeline
      const pipelineUrl = `${this.url.replace(/\/+$/, "")}/pipeline`;
      const response = await fetch(pipelineUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(2000), // Strict 2s timeout
        body: JSON.stringify([
          ["INCR", redisKey],
          ["EXPIRE", redisKey, expireSeconds, "NX"],
          ["TTL", redisKey],
        ]),
      });

      if (response.ok) {
        const results = await response.json();
        const currentCount = Number(results[0]?.result || 1);
        const ttlSeconds = Number(results[2]?.result || expireSeconds);
        const resetTime = Date.now() + Math.max(1, ttlSeconds) * 1000;

        return {
          allowed: currentCount <= limit,
          remaining: Math.max(0, limit - currentCount),
          resetTime,
        };
      }
    } catch (err) {
      console.warn("[RateLimiter] Upstash Redis request failed, falling back to memory:", (err as Error).message);
    }

    // Fall back to memory on any error
    return this.fallbackMemory.consume(key, limit, windowMs);
  }
}

const memoryStorage = new MemoryRateLimiterStorage();

function getStorage(): { storage: RateLimiterStorage; backend: "redis" | "memory" } {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    return {
      storage: new UpstashRedisRateLimiterStorage(upstashUrl, upstashToken, memoryStorage),
      backend: "redis",
    };
  }

  return { storage: memoryStorage, backend: "memory" };
}

/**
 * Extracts the real client IP from standard reverse proxy and CDN headers.
 */
export function getClientIp(headers: Headers): string {
  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0].trim();
    if (firstIp) return firstIp;
  }

  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xRealIp = headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  return "127.0.0.1";
}

/**
 * Checks rate limits for a given client identifier (IP or user token).
 * Default: 15 requests per 60 seconds per IP.
 */
export async function checkRateLimit(
  identifier: string,
  options: { maxRequests?: number; windowMs?: number } = {}
): Promise<RateLimitResult> {
  const limit = options.maxRequests ?? Number(process.env.RATE_LIMIT_MAX_REQUESTS || 15);
  const windowMs = options.windowMs ?? Number(process.env.RATE_LIMIT_WINDOW_MS || 60000);

  const { storage, backend } = getStorage();
  const result = await storage.consume(identifier, limit, windowMs);

  const now = Date.now();
  const retryAfterSeconds = Math.max(1, Math.ceil((result.resetTime - now) / 1000));

  return {
    allowed: result.allowed,
    limit,
    remaining: result.remaining,
    resetTime: result.resetTime,
    retryAfterSeconds,
    backend,
  };
}

export { memoryStorage };

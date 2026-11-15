import test from "node:test";
import assert from "node:assert/strict";
import { checkRateLimit, memoryStorage, getClientIp } from "../lib/security/rate-limit.ts";

test("Rate Limiter: Allows requests under threshold", async () => {
  memoryStorage.clear();
  const testIp = "192.168.1.50";

  const res1 = await checkRateLimit(testIp, { maxRequests: 3, windowMs: 10000 });
  assert.equal(res1.allowed, true);
  assert.equal(res1.remaining, 2);

  const res2 = await checkRateLimit(testIp, { maxRequests: 3, windowMs: 10000 });
  assert.equal(res2.allowed, true);
  assert.equal(res2.remaining, 1);

  const res3 = await checkRateLimit(testIp, { maxRequests: 3, windowMs: 10000 });
  assert.equal(res3.allowed, true);
  assert.equal(res3.remaining, 0);
});

test("Rate Limiter: Blocks requests exceeding threshold with retryAfterSeconds", async () => {
  memoryStorage.clear();
  const testIp = "192.168.1.99";

  for (let i = 0; i < 2; i++) {
    await checkRateLimit(testIp, { maxRequests: 2, windowMs: 10000 });
  }

  const blocked = await checkRateLimit(testIp, { maxRequests: 2, windowMs: 10000 });
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.remaining, 0);
  assert.ok(blocked.retryAfterSeconds > 0 && blocked.retryAfterSeconds <= 10);
});

test("Rate Limiter: Extracts IP correctly from headers", () => {
  const headersForwarded = new Headers({ "x-forwarded-for": "203.0.113.195, 70.41.3.18" });
  assert.equal(getClientIp(headersForwarded), "203.0.113.195");

  const headersCf = new Headers({ "cf-connecting-ip": "198.51.100.22" });
  assert.equal(getClientIp(headersCf), "198.51.100.22");

  const headersReal = new Headers({ "x-real-ip": "192.0.2.1" });
  assert.equal(getClientIp(headersReal), "192.0.2.1");

  const headersEmpty = new Headers();
  assert.equal(getClientIp(headersEmpty), "127.0.0.1");
});

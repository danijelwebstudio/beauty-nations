import { createHash } from "node:crypto";

type Bucket = { count: number; expiresAt: number };
const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 5000;

/**
 * Best-effort per-process safeguard for the single-instance Coolify application.
 * This is NOT a distributed/global limiter. Use Cloudflare WAF at the edge in production.
 */
export function checkRateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();

  if (buckets.size >= MAX_BUCKETS) {
    for (const [entryKey, entry] of buckets) {
      if (entry.expiresAt <= now) buckets.delete(entryKey);
    }
    if (buckets.size >= MAX_BUCKETS) {
      const oldest = buckets.keys().next().value;
      if (oldest !== undefined) buckets.delete(oldest);
    }
  }

  const previous = buckets.get(key);
  if (!previous || previous.expiresAt <= now) {
    buckets.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  previous.count += 1;
  return {
    allowed: previous.count <= max,
    retryAfterSeconds: Math.max(1, Math.ceil((previous.expiresAt - now) / 1000)),
  };
}

export function opaqueId(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

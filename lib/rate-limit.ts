import { createHmac, randomBytes } from "node:crypto";

type Bucket = { count: number; expiresAt: number };
const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 5000;
const identifierKey = randomBytes(32);

/**
 * Best-effort per-process safeguard for the single-instance Coolify application.
 * This is NOT a distributed/global limiter. Use Cloudflare WAF at the edge in production.
 */
export function checkRateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();

  const previous = buckets.get(key);
  if (previous && previous.expiresAt > now) {
    previous.count = Math.min(previous.count + 1, max + 1);
    return {
      allowed: previous.count <= max,
      retryAfterSeconds: Math.max(1, Math.ceil((previous.expiresAt - now) / 1000)),
    };
  }

  if (buckets.size >= MAX_BUCKETS) {
    for (const [entryKey, entry] of buckets) {
      if (entry.expiresAt <= now) buckets.delete(entryKey);
    }
    if (buckets.size >= MAX_BUCKETS) {
      // Never evict a live limit: rotating identifiers must not reset it.
      return { allowed: false, retryAfterSeconds: 60 };
    }
  }

  buckets.set(key, { count: 1, expiresAt: now + windowMs });
  return { allowed: true, retryAfterSeconds: 0 };
}

export function opaqueId(value: string): string {
  return createHmac("sha256", identifierKey).update(value.trim().toLowerCase()).digest("hex");
}

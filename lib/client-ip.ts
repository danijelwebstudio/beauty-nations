import { isIP } from "node:net";

/**
 * Next's Request does not expose the socket peer. Trust is therefore an explicit
 * deployment contract: the named header MUST be overwritten by the last trusted
 * proxy, and the app port MUST be inaccessible to clients. Never infer trust from
 * the presence of a header, or parse a client-supplied X-Forwarded-For chain.
 */
export function trustedClientIp(headers: Headers): string | null {
  const header = process.env.TRUSTED_CLIENT_IP_HEADER;
  if (header !== "x-real-ip" && header !== "cf-connecting-ip") return null;
  const value = headers.get(header)?.trim() ?? "";
  if (value.includes("%")) return null; // Scoped local addresses are not public client identities.
  const version = isIP(value);
  if (!version) return null; // Reject lists, ports, empty and malformed values.
  if (version === 4) return value;
  // Canonicalize IPv6 so alternate spellings cannot create separate buckets.
  const canonical = new URL(`http://[${value}]/`).hostname.slice(1, -1);
  // Treat IPv4-mapped IPv6 and IPv4 as the same client.
  const mapped = /^::ffff:([\da-f]+):([\da-f]+)$/.exec(canonical);
  if (!mapped) return canonical;
  const high = parseInt(mapped[1], 16);
  const low = parseInt(mapped[2], 16);
  return `${high >>> 8}.${high & 255}.${low >>> 8}.${low & 255}`;
}

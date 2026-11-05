import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { trustedClientIp } from "../lib/client-ip.ts";
import { checkRateLimit, opaqueId } from "../lib/rate-limit.ts";
import { directors, confirmedDirectors, confirmedCountryCount } from "../data/directors.ts";

test("exactly eight confirmed countries have real assets; MK has no invented Instagram", () => {
  assert.equal(confirmedCountryCount, 8);
  assert.deepEqual(confirmedDirectors.map((d) => d.countryCode).sort(), ["BA", "BG", "CH", "DE", "HR", "MK", "RS", "SI"]);
  assert.equal(new Set(directors.map((d) => d.countryCode)).size, directors.length);
  for (const director of confirmedDirectors) {
    assert.ok(existsSync(new URL(`../public${director.posterUrl}`, import.meta.url)));
    assert.ok(existsSync(new URL(`../public${director.displayUrl}`, import.meta.url)));
  }
  const mk = confirmedDirectors.find((d) => d.countryCode === "MK");
  assert.equal(mk.directorName, "Marija Stojanovska");
  assert.equal(mk.instagramUrl, undefined);
});
test("IP trust is explicit, does not fall back to other headers, and normalizes IPv6", () => {
  const original = process.env.TRUSTED_CLIENT_IP_HEADER;
  try {
    const headers = new Headers({ "x-real-ip": "192.0.2.1", "cf-connecting-ip": "192.0.2.2", "x-forwarded-for": "192.0.2.3" });
    delete process.env.TRUSTED_CLIENT_IP_HEADER;
    assert.equal(trustedClientIp(headers), null);
    process.env.TRUSTED_CLIENT_IP_HEADER = "x-forwarded-for";
    assert.equal(trustedClientIp(headers), null);
    process.env.TRUSTED_CLIENT_IP_HEADER = "x-real-ip";
    assert.equal(trustedClientIp(headers), "192.0.2.1");
    for (const value of ["192.0.2.1, 192.0.2.2", "invalid", "192.0.2.1:80", "fe80::1%eth0", ""]) {
      headers.set("x-real-ip", value);
      assert.equal(trustedClientIp(headers), null);
    }
    headers.set("x-real-ip", "2001:0db8:0:0:0:0:0:1");
    assert.equal(trustedClientIp(headers), "2001:db8::1");
    headers.set("x-real-ip", "::ffff:192.0.2.1");
    assert.equal(trustedClientIp(headers), "192.0.2.1");
  } finally {
    if (original === undefined) delete process.env.TRUSTED_CLIENT_IP_HEADER;
    else process.env.TRUSTED_CLIENT_IP_HEADER = original;
  }
});
test("rate limits expire at the window boundary and identifiers normalize email case", (t) => {
  let now = 1000;
  t.mock.method(Date, "now", () => now);
  for (let i = 0; i < 3; i++) assert.equal(checkRateLimit("expiry", 3, 3600000).allowed, true);
  assert.equal(checkRateLimit("expiry", 3, 3600000).allowed, false);
  now += 3600000;
  assert.equal(checkRateLimit("expiry", 3, 3600000).allowed, true);
  assert.equal(opaqueId(" Test@EXAMPLE.org "), opaqueId("test@example.org"));
  assert.equal(opaqueId("test@example.org").includes("example"), false);
});
test("capacity pressure cannot evict live rate-limit buckets", () => {
  for (let i = 0; i < 6; i++) checkRateLimit("preserve-me", 5, 600000);
  for (let i = 0; i < 5000; i++) checkRateLimit(`flood-${i}`, 5, 600000);
  assert.equal(checkRateLimit("preserve-me", 5, 600000).allowed, false);
  assert.equal(checkRateLimit("new-over-capacity", 5, 600000).allowed, false);
});

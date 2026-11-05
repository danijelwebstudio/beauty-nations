# Beauty Nations release procedure

This branch is a release candidate, **not authorization for a public launch**.
Do not change EXALCO, shared proxy configuration, DNS, backups, or unrelated containers.

## Build and source

- Source: `feat/eight-nations-release` in `danijelwebstudio/beauty-nations`.
- Pin the reviewed commit in Coolify. Do not deploy the old `prelaunch-security` head.
- Node 22 (22.15+ for tests), Next.js 16.4.5, port **3000**.
- Docker build pack: root `Dockerfile`, context `/`, internal port 3000, no public host-port mapping.
- The multi-stage image runs the standalone server as the unprivileged `node` user.
- `npm ci`, `npm run lint`, `npm test`, `npm run build`, `npm audit --omit=dev`.
- Browser checks: `npx playwright install chromium`, then `npm run test:e2e` after a default staging build. All form/CAPTCHA endpoints are blocked in browser tests; API tests mock both upstream services.
- Docker execution itself must be validated on a Docker-capable host before release.

## Environment

Use `.env.example` for names only; store real secrets in Coolify, never Git.

| Variable | Build | Runtime | Required setting |
| --- | --- | --- | --- |
| NEXT_PUBLIC_SITE_URL | yes | yes | Actual verified HTTPS staging/public URL; retain the existing preview canonical until the new hostname is configured |
| NEXT_PUBLIC_CONTACT_EMAIL | yes | yes | info.lelapantelic@gmail.com |
| NEXT_PUBLIC_TURNSTILE_SITE_KEY | yes | yes | Existing approved public site key |
| DEPLOYMENT_ENV | yes | yes | staging until all release gates are passed; production only for the approved launch |
| LEGAL_REVIEW_MODE | yes | no | false normally; true only behind authenticated staging access |
| FORMS_PROVIDER | no | yes | formspree |
| FORMSPREE_FORM_ID | no | yes | xqppnpgo; never xwllyrnz in production |
| TURNSTILE_SECRET_KEY | no | yes | Existing secret, entered securely |
| TURNSTILE_ALLOWED_HOSTNAMES | no | yes | Comma-separated exact hostnames, without scheme or paths; must match the widget dashboard |
| TRUSTED_CLIENT_IP_HEADER | no | yes | See trust contract below |

Docker ARGs above include public/build settings only. The Turnstile secret and any mail-provider keys are runtime secrets. Rebuild when public variables, staging status or legal review mode change. `NEXT_PUBLIC_GA_ID` does not activate analytics; consent/privacy implementation and review are required first.

## Proxy and rate-limit trust contract

Next Route Handlers do not expose the socket peer. A header name alone cannot prove who sent it.

1. Verify only the trusted reverse proxy can reach the Beauty Nations app port; do not publish port 3000 on the server.
2. Verify the last trusted proxy overwrites `X-Real-IP` with the actual peer-derived client IP, instead of forwarding an arbitrary supplied value. Only then set `TRUSTED_CLIENT_IP_HEADER=x-real-ip`.
3. Alternatively use `cf-connecting-ip` only if the origin is accessible solely through Cloudflare and the proxy accepts that header only from verified Cloudflare addresses. DNS proxying alone is insufficient. Do not change a shared firewall/proxy in a way that affects EXALCO.
4. Never trust arbitrary `X-Forwarded-For`; never enable Traefik's `forwardedHeaders.insecure` to make this work.
5. Before launch, make six no-token requests through the real ingress while varying forged IP headers. The sixth must return 429, and a separate genuine client must have its own quota. These checks do not call Formspree.

Without an explicitly configured trustworthy header, requests share a conservative 5-per-10-minute fallback bucket. This prevents spoofed headers from creating quotas but is **not suitable for normal production traffic**. Missing/malformed trusted headers use the same fallback. Per-IP limits are 5 requests / 10 minutes, per normalized email 3 verified submission attempts / hour. Limits are process-local, reset on restart and are not shared across replicas. Live buckets cannot be evicted by an identifier flood; capacity pressure fails closed. 429 responses from local limits include Retry-After.

Check the Cloudflare account's actual WAF entitlement. If supported, add an application-specific rule matching Beauty Nations hostnames, POST and `/api/applications`, with a supported per-IP threshold/action. A managed challenge on this JSON endpoint may break client fetch responses; prefer an appropriate rate-limit/block response. Do not claim this rule is active until observed in the account.

## Formspree quota: residual risk

Our API verifies Turnstile once, checks action and hostname, and then sends to Formspree. Consumed single-use tokens must not be verified again by Formspree. Do not enable a second mandatory CAPTCHA at Formspree without redesigning and testing the flow.

The public Formspree submission URL can still be called directly. Our rate limiter and Cloudflare rules cannot protect a different provider's endpoint. Keeping its ID out of the browser avoids casual discovery but is not authentication. Formspree domain restrictions depend on a forgeable Referer and are not a server-to-server authorization boundary; missing Referer may also reject legitimate forwarding. Review spam settings, limits and dashboard usage without sending repeated real submissions.

For stronger quota isolation, an authenticated server-only mail API (the existing Resend adapter, after sender-domain verification) or authenticated SMTP avoids a public form endpoint. This changes provider setup, delivery monitoring, potential costs and privacy disclosures; obtain approval before migration. No provider migration is included here.

Sources: [Cloudflare validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/), [Formspree domain restriction](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain), [Formspree Turnstile integration](https://help.formspree.io/articles/form-and-project-settings/protecting-your-forms-with-cloudflare-turnstile).

## Staging and launch gates

1. Inspect server CPU, RAM, disk, running containers, existing reverse proxy health, existing backup schedule and most recent successful backup. Record current Beauty Nations image/commit and configuration for rollback. Do not redeploy EXALCO.
2. Use the existing separate Beauty Nations app, or create a separate app if none exists. Require authentication/access protection for staging; `noindex` is not access control. Do not expose legal drafts publicly.
3. Default builds hide unapproved legal text and display an organiser-contact notice. `LEGAL_REVIEW_MODE=true` renders the complete drafts only for protected review. Both legal routes always carry noindex and are excluded from the sitemap. Public launch remains blocked until the responsible party approves final text and a reviewed code change publishes it.
4. Verify the actual domain registration, DNS destination, TLS certificate and Turnstile allowed hostnames before changing the canonical or sitemap origin. Do not purchase a domain or change DNS without authorization.
5. Confirm production Formspree ID, secret presence (without logging values), trusted IP behavior, Siteverify hostname/action validation and any configured edge controls. Use mocked checks first; only one expressly authorized end-to-end inbox test if needed.
6. Smoke-test `/`, both legal routes, `/robots.txt`, `/sitemap.xml`, `/api/applications` missing-token behavior, a 404, all eight countries and the original MK poster. Check desktop/mobile layouts and absence of analytics.
7. Retain the previous working image and configuration. Roll back only Beauty Nations to that image/commit if readiness, error-rate or form checks fail. Do not delete previous deployments or backups.

The public release is blocked while legal approval, infrastructure verification or protected deployment access is missing. A GitHub push is not proof of a successful Coolify deployment.

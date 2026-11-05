# Beauty Nations — Next.js App Router

This repository contains the Beauty Nations official website (Season 2027, Zagreb).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Forms and email notifications

The four forms are handled by `app/api/applications/route.ts`. They support **Formspree** for domain-free testing, or **Resend** after an authenticated sender domain is configured. No provider keys are in the repository. An unconfigured provider returns a clear error rather than a false success message.

**Read `UPUTSTVO-TEST-FORMULARA-BEZ-DOMENA.md` before testing.**

## Before a public launch

Confirm actual email delivery, terms/privacy notice, spam controls, the final SEO domain and the official contact details. The public ticket interest list does **not** take money or reserve places.

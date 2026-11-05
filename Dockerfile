FROM node:22-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-fund

FROM dependencies AS builder
ARG NEXT_PUBLIC_SITE_URL=https://beauty-nations.vercel.app
ARG NEXT_PUBLIC_CONTACT_EMAIL=info.lelapantelic@gmail.com
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ARG DEPLOYMENT_ENV=staging
ARG LEGAL_REVIEW_MODE=false
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY
ENV DEPLOYMENT_ENV=$DEPLOYMENT_ENV
ENV LEGAL_REVIEW_MODE=$LEGAL_REVIEW_MODE
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
# Coolify's HTTP healthcheck requires curl/wget inside the final image.
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]

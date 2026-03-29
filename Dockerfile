FROM node:24-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++ git
WORKDIR /app

COPY package.json ./

RUN npm ci

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PRIVATE_STANDALONE=true

RUN npm run build

FROM base AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat curl

RUN addgroup -g 1001 -S nodejs && \
  adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
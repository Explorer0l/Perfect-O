# Используем официальный Node.js образ как базовый
FROM node:18-alpine AS base

# Установка зависимостей только при необходимости
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json* ./
RUN npm ci

# Билд приложения
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Отключаем телеметрию Next.js во время билда
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production образ - запуск приложения
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем public папку
COPY --from=builder /app/public ./public

# Создаем директорию .next и назначаем правильные права
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Копируем билд с правильными правами
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]


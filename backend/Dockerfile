FROM node:22-alpine AS builder

WORKDIR /app

# Required to compile native modules such as better-sqlite3
RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

RUN npm run build

# Remove development dependencies after building
RUN npm prune --omit=dev


FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# better-sqlite3 runtime/build dependencies
RUN apk add --no-cache python3 make g++

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

RUN mkdir -p /app/data

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]
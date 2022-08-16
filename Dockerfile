# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN yarn install


# Rebuild the source code only when needed
FROM node:16-alpine AS builder
ARG CMC_API_KEY
ARG API_ENDPOINT

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN mv .env.example .env
RUN echo "\nCMC_API_KEY=$CMC_API_KEY" >> .env
RUN echo "API_ENDPOINT=$API_ENDPOINT" >> .env
RUN mkdir data && echo '{}' > data/avax.json

RUN yarn build


# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 80

ENV PORT 80

CMD ["node", "server.js"]
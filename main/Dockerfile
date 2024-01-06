FROM oven/bun:latest
WORKDIR /app

# pnpm fetch does require only lockfile
COPY pnpm-lock.yaml ./

RUN bun install -g pnpm && pnpm fetch

ADD . ./
RUN pnpm install -r --offline && bun run --bun build

EXPOSE 3000

CMD ["bun", "build/index.js"]

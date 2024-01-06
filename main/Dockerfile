FROM oven/bun:latest
WORKDIR /app

# pnpm fetch does require only lockfile
COPY pnpm-lock.yaml ./

RUN bunx pnpm fetch

ADD . ./
RUN bunx pnpm install -r --offline && bun run --bun build

EXPOSE 3000

CMD ["bun", "build/index.js"]

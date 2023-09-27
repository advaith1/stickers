FROM node:18-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app
COPY . .
RUN apk update && apk add build-base curl
RUN corepack enable
RUN pnpm i
RUN pnpm i -g sass typescript typescript-transpile-only
RUN tsc-transpile-only
RUN pnpm sass
CMD ["pnpm", "start"]

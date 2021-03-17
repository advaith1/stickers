FROM node:14-alpine
WORKDIR /app
COPY . .
RUN apk update && apk add build-base curl
RUN curl -L https://unpkg.com/@pnpm/self-installer | node
RUN pnpm i -g typescript sass
RUN tsc
RUN pnpm sass
CMD ["pnpm", "start"]

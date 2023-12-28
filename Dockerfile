FROM oven/bun

WORKDIR /app
COPY . .

RUN bun install

ENV PORT 8080
CMD [ "bun", "prod" ]

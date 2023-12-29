FROM oven/bun

WORKDIR /app
COPY . .

RUN bun install --production

ENV PORT 8080
CMD [ "bun", "prod" ]

# Builds the Astro blog and copies the static output into a shared volume.
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

FROM alpine:3.20 AS exporter
RUN apk add --no-cache rsync
COPY --from=builder /app/dist /dist
# /output is mounted from a named volume by docker-compose
CMD ["sh", "-c", "rm -rf /output/* /output/.[!.]* 2>/dev/null; cp -a /dist/. /output/ && echo 'Blog deployed to volume'"]

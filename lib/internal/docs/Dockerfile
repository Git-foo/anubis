FROM docker.io/library/node AS build

WORKDIR /app
COPY . .

RUN npm ci && npm run build

FROM docker.io/library/nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
LABEL org.opencontainers.image.source="https://github.com/TecharoHQ/anubis"
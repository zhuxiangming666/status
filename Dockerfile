FROM node:16.4.0 AS builder

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

FROM nginx

COPY  --from=builder /app/dist/ /usr/share/nginx/html
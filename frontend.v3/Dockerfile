FROM node:12-alpine as builder
WORKDIR /app
COPY frontend.v3/package*.json ./
RUN npm ci
COPY frontend.v3/ ./
RUN npm run build -- --output-path=dist/out

# этап production (production-stage)
FROM nginx:stable-alpine as production-stage
COPY --from=builder /app/dist/out /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/client.nginx.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

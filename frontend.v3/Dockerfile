FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g @angular/cli@11.0.1

COPY . .
RUN npm run build

# этап production (production-stage)
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/frontend /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

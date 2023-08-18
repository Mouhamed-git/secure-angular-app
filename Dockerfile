FROM node:16-alpine AS node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=node /usr/src/app/dist/secure-angular-app /usr/share/nginx/html

EXPOSE 80

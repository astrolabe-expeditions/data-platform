FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

RUN yarn install --immutable

COPY . .

RUN yarn build

FROM nginx
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
RUN chown nginx.nginx /usr/share/nginx/html/ -R

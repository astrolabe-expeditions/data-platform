FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

RUN yarn install --immutable

COPY . .

ENV VITE_APP_ORGANIZATION="Astrolabe Expeditions"
ENV VITE_APP_ORGANIZATION_SITE_URL="https://www.astrolabe-expeditions.org/"

RUN \
  --mount=type=secret,id=SUPABASE_URL \
  --mount=type=secret,id=SUPABASE_KEY \
  --mount=type=secret,id=DATA_INGESTION_WEBHOOK_URL \
  VITE_SUPABASE_URL=$(cat /run/secrets/SUPABASE_URL) \
  VITE_SUPABASE_KEY=$(cat /run/secrets/SUPABASE_KEY) \
  VITE_DATA_INGESTION_WEBHOOK_URL=$(cat /run/secrets/DATA_INGESTION_WEBHOOK_URL) \
  yarn build

FROM nginx
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
RUN chown nginx.nginx /usr/share/nginx/html/ -R

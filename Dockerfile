# Build Vue.js
FROM node:lts-alpine AS builder

WORKDIR /app

ARG VUE_APP_BACK_API_NODE=${VUE_APP_BACK_API_NODE}
ENV VUE_APP_BACK_API_NODE=${VUE_APP_BACK_API_NODE}

COPY . /app
RUN yarn
RUN yarn build

# Server build
FROM nginx:1.19-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

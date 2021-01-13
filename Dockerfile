# build environment
FROM node:lts-alpine as builder
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ARG VUE_APP_BACK_API_NODE=${VUE_APP_BACK_API_NODE}
ENV VUE_APP_BACK_API_NODE=${VUE_APP_BACK_API_NODE}
COPY . /app
RUN npm install
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
COPY ./default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
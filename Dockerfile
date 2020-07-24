FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

ARG VUE_APP_CLIENT_ID=
ARG VUE_APP_API_URL=
RUN yarn run build

FROM steebchen/nginx-spa:stable

COPY --from=build-stage /app/dist /app
EXPOSE 80

CMD ["nginx"]

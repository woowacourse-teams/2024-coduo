FROM node:22-alpine as build-stage
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# production stage
FROM node:22-alpine as production-stage
WORKDIR /app
RUN yarn global add serve
COPY --from=build-stage /app/dist ./dist

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
ENV SENTRY_DSN=$SENTRY_DSN

EXPOSE 3000
CMD ["serve", "-s", "dist"]
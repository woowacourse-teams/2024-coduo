FROM node:22-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

# production stage
FROM node:22-alpine as production-stage
WORKDIR /app
RUN yarn global add serve
COPY --from=build-stage /app/dist ./dist
CMD ["serve", "-s", "dist", "-l", "3000"]
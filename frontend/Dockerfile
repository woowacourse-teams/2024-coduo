FROM node:22-alpine as build-stage
WORKDIR /app/frontend
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

# production stage
FROM node:22-alpine as production-stage
WORKDIR /app/frontend
RUN yarn global add serve
COPY --from=build-stage /app/frontend/dist ./dist
CMD ["serve", "-s", "dist", "-l", "3000"]
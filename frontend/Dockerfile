FROM node:16 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16

WORKDIR /app
COPY --from=builder /app/build ./build
RUN npm install -g serve

ENV PORT 3000
EXPOSE 3000
CMD [ "npm", "serve" ]

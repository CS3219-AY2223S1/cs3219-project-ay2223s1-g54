FROM node:16

WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:16

WORKDIR /usr/src/app
COPY --from=0 /app/build ./
RUN npm install -g serve

ENV PORT 3000
EXPOSE 3000
CMD [ "serve", "-s", "." ]

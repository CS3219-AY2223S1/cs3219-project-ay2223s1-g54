FROM node:16

WORKDIR /app
COPY package*.json ./
COPY ./build ./build

RUN npm install -g serve

ENV PORT 3000
EXPOSE 3000
CMD [ "npm", "run", "serve" ]

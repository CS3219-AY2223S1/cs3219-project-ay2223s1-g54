FROM node:16

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

ENV PORT 3000
EXPOSE 3000
CMD [ "npm", "start" ]

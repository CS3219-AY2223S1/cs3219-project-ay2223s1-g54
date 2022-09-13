FROM node:16

WORKDIR /app
COPY . .

RUN npm install -g serve

ENV PORT 3000
EXPOSE 3000
CMD [ "npm", "run", "serve" ]

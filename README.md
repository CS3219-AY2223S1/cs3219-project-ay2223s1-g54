# CS3219-AY22-23 Group 54 PeerPrep

This document introduces how to get started.
- [CS3219-AY22-23 Group 54 PeerPrep](#cs3219-ay22-23-group-54-peerprep)
  - [Local Setup Instructions](#local-setup-instructions)
    - [Docker Dependencies](#docker-dependencies)
    - [Gateway Setup](#gateway-setup)
    - [User Service Setup](#user-service-setup)
    - [Auth Service](#auth-service)
    - [Matching Service](#matching-service)
    - [Question Service](#question-service)
    - [Collaboration Service](#collaboration-service)
    - [Communication Service](#communication-service)
    - [History Service](#history-service)
    - [Frontend](#frontend)
    - [Development](#development)
  - [Deployed Setup](#deployed-setup)
## Local Setup Instructions

This section introduces how to get PeerPrep running on your local environment. Skip to the [development](#development) section once setting up everything once to start everything concurrently to save time starting everything individually.
### Docker Dependencies
1. Install Docker from [here](https://docs.docker.com/get-docker/)
2. Run `docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest` for microservices that use websockets
3. Follow the instructions [here](backend/online-judge/README.md) to get an instance of judge0 running locally

### Gateway Setup
1. Rename `.env.sample` file to `.env`
2. Install npm packages using `npm i`
3. Run the gateway using `npm run dev`
### User Service Setup
1. Rename `.env.sample` file to `.env`
2. Create a Cloud DB URL using Mongo Atlas
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file
4. Install npm packages using `npm i`
5. Run the user service using `npm run dev`
### Auth Service
1. Rename `.env.sample` file to `.env`
2. Install npm packages using `npm i`
3. Run the auth service using `npm run dev`
### Matching Service
1. Rename `.env.sample` file to `.env`
2. Create a Cloud DB URL using Mongo Atlas
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file
4. Install npm packages using `npm i`
5. Run the matching service using `npm run dev`
### Question Service
1. Rename `.env.sample` file to `.env`
2. Create a Cloud DB URL using Mongo Atlas
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file
4. Populate the Mongo Atlas DB with questions using `data.json` in this [folder](/backend/question-service/crawler/)
5. Install npm packages using `npm i`
6. Run the question service using `npm run dev`

### Collaboration Service
1. Rename `.env.sample` file to `.env`
2. Install npm packages using `npm i`
3. Run the collaboration service using `npm run dev`
### Communication Service
1. Rename `.env.sample` file to `.env`
2. Install npm packages using `npm i`
3. Run the communication service using `npm run dev`
### History Service
1. Rename `.env.sample` file to `.env`
2. Create a Cloud DB URL using Mongo Atlas
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file
4. Install npm packages using `npm i`
5. Run the history service using `npm run dev`
### Frontend
1. Install npm packages using `npm i`
2. Run the frontend using `npm start`

### Development
1. Install npm packages using `npm i` in the root folder
3. Run `npm run start:dev` in the root folder
4. Navigate to `localhost:3000/` on a browser

## Deployed Setup



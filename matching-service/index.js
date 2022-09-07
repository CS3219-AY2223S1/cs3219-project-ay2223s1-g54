import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
import { createMatchEntry } from './controller/matching-controller.js';

const router = express.Router()

router.get('/', (_, res) => res.send('Hello World from matching-service'))
router.post('/', createMatchEntry)

app.use('/api/matching', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

const httpServer = createServer(app)
httpServer.listen(8001, () => console.log('matching-service listening on port 8001'))

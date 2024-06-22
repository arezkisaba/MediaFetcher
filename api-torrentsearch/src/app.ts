import express, { Application } from 'express';
import cors from 'cors';
import './container.js';
import routes from './routes.js';

const app: Application = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4444',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));
app.use('/api', routes);

export default app;

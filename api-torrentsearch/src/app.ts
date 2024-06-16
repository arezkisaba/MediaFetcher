import express, { Application } from 'express';
import './container';
import routes from './routes';
import cors from 'cors';

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

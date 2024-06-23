import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import './container.js';
import TorrentSearchRoutes from './torrentSearch/routes/TorrentSearchRoutes.js';
import TorrentDownloadsRoutes from './torrentsDownloads/routes/TorrentDownloadsRoutes.js';
import IPCheckMiddleware from './middlewares/IPCheckMiddleware.js';
import SwaggerSpec from './openapi/SwaggerSpec.js';

const app: Application = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4444',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));
app.use(IPCheckMiddleware);
app.use('/api', TorrentSearchRoutes);
app.use('/api', TorrentDownloadsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerSpec));

export default app;

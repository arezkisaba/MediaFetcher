import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { TorrentService } from './TorrentService.js';

dotenv.config();

const torrentService = new TorrentService();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4444',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));

app.get('/api/torrents', (req, res) => {
    try {
        const torrents = torrentService.getTorrents();
        res.json(torrents);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.post('/api/torrents', async (req, res) => {
    try {
        const { magnetLink, pageLink } = req.body;
        const result = await torrentService.addTorrent(magnetLink, pageLink, process.env.DOWNLOAD_PATH);
        if (typeof result === 'string') {
            res.status(400).json({ message: result });
        } else {
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

app.delete('/api/torrents', async (req, res) => {
    try {
        const { magnetLink } = req.body;
        await torrentService.deleteTorrent(magnetLink);
        res.status(200).send();
    } catch (error) {
        res.status(500).json(error);
    }
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

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
    const torrents = torrentService.getTorrents();
    res.json(torrents);
});

app.post('/api/torrents', async (req, res) => {
    const { magnetLink, pageLink } = req.body;
    const torrent = await torrentService.addTorrent(magnetLink, pageLink, process.env.DOWNLOAD_PATH);
    res.status(201).json(torrent);
});

app.delete('/api/torrents', async (req, res) => {
    const { magnetLink } = req.body;
    await torrentService.deleteTorrent(magnetLink);
    res.status(200).send();
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

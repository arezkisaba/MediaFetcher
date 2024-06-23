import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import OxTorrentProvider from '../../torrentSearch/providers/OxTorrentProvider.js';
import TorrentDownloadsService from '../services/TorrentDownloadsService.js';
import { AddTorrentDownloadRequest } from 'shared/src/models/AddTorrentDownloadRequest.js';

dotenv.config();

const router = Router();
const torrentDownloadsService = new TorrentDownloadsService();

router.get('/torrent-downloads', async (req: Request, res: Response) => {
    try {
        const torrents = await torrentDownloadsService.getTorrents();
        res.json(torrents);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/torrent-downloads', async (req: Request, res: Response) => {
    try {
        const request = req.body as AddTorrentDownloadRequest; 
        const oxTorrentClient = new OxTorrentProvider();
        const downloadResponse = await oxTorrentClient.download(request.PageLink);
        const result = await torrentDownloadsService.addTorrent(downloadResponse.magnetUrl, request.PageLink, process.env.DOWNLOAD_PATH as string);
        if (typeof result === 'string') {
            res.status(400).json({ message: result });
        } else {
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/torrent-downloads', async (req: Request, res: Response) => {
    try {
        const { magnetLink } = req.body;
        await torrentDownloadsService.deleteTorrent(magnetLink);
        res.status(200).send();
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;

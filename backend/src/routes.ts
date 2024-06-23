import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import dotenv from 'dotenv';
import ITorrentSearchService from './torrentSearch/contracts/ITorrentSearchService.js';
import OxTorrentProvider from './torrentSearch/providers/OxTorrentProvider.js';
import HttpError from './errors/HttpError.js';
import TorrentService from './utils/TorrentService.js';
import { AddTorrentDownloadRequest } from 'shared/src/models/AddTorrentDownloadRequest.js';

dotenv.config();

const router = Router();
const torrentSearchService = container.resolve<ITorrentSearchService>('ITorrentSearchService');
const torrentService = new TorrentService();

router.get('/torrent-search', async (req: Request, res: Response) => {
    try {
        const searchPattern = req.query.q as string;
        const results = await torrentSearchService.getResults(searchPattern);
        return res.json(results);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/torrent-downloads', async (req: Request, res: Response) => {
    try {
        const torrents = await torrentService.getTorrents();
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
        const result = await torrentService.addTorrent(downloadResponse.magnetUrl, request.PageLink, process.env.DOWNLOAD_PATH as string);
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
        await torrentService.deleteTorrent(magnetLink);
        res.status(200).send();
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;

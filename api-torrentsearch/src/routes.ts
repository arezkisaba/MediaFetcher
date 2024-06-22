import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import dotenv from 'dotenv';
import ITorrentSearchService from './torrentSearch/contracts/ITorrentSearchService';
import OxTorrentProvider from './torrentSearch/providers/OxTorrentProvider';
import HttpError from './errors/HttpError';
import AddTorrentDownloadRequest from './torrentDownloads/AddTorrentDownloadRequest';
import DictionaryCache from './utils/DictionaryCache';
import TorrentService from './utils/TorrentService';

dotenv.config();

const router = Router();
const torrentSearchService = container.resolve<ITorrentSearchService>('ITorrentSearchService');
const torrentService = new TorrentService();
const cache = new DictionaryCache();

router.get('/torrents', async (req: Request, res: Response) => {
    try {
        const searchPattern = req.query.q as string;
        const results = await torrentSearchService.getResults(searchPattern);
        return res.json(results);
    } catch (err) {
        const error = err as HttpError;
        res.status(error.status || 500).json({
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        });
    }
});

router.get('/torrents/download', async (req: Request, res: Response) => {
    try {
        const pageLink = req.query.q as string;
        const oxTorrentClient = new OxTorrentProvider();
        const downloadResponse = await oxTorrentClient.download(pageLink);
        const addTorrentDownloadRequest: AddTorrentDownloadRequest = {
            magnetLink: downloadResponse.magnetUrl,
            pageLink: pageLink
        };
        return res.json(addTorrentDownloadRequest);
    } catch (err) {
        const error = err as HttpError;
        res.status(error.status || 500).json({
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        });
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
        const { magnetLink, pageLink } = req.body;
        const result = await torrentService.addTorrent(magnetLink, pageLink, process.env.DOWNLOAD_PATH as string);
        if (typeof result === 'string') {
            res.status(400).json({ message: result });
        } else {
            res.status(201).json(result);
        }
    } catch (err) {
        const error = err as Error;
        res.status(500).json({
            status: 500,
            message: error.message || 'Internal Server Error',
        });
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

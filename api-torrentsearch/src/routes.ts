import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import ITorrentSearchService from './torrentSearch/contracts/ITorrentSearchService';
import OxTorrentProvider from './torrentSearch/providers/OxTorrentProvider';
import { HttpError } from './errors/HttpError';
import { AddTorrentDownloadRequest } from './torrentDownloads/AddTorrentDownloadRequest';

const router = Router();
const torrentSearchService = container.resolve<ITorrentSearchService>('ITorrentSearchService');

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
        const addTorrentDownloadRequest : AddTorrentDownloadRequest = {
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

export default router;

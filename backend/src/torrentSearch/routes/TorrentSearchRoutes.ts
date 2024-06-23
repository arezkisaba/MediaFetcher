import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import ITorrentSearchService from '../services/contracts/ITorrentSearchService.js';

const router = Router();
const torrentSearchService = container.resolve<ITorrentSearchService>('ITorrentSearchService');

router.get('/torrent-search', async (req: Request, res: Response) => {
    try {
        const searchPattern = req.query.q as string;
        const results = await torrentSearchService.getResults(searchPattern);
        return res.json(results);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;

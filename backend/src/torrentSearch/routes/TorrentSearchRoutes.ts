import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import ITorrentSearchService from '../services/contracts/ITorrentSearchService.js';
import { GetTorrentSearchResultResponse } from '@shared/src/models/GetTorrentSearchResultResponse.js';

const router = Router();
const torrentSearchService = container.resolve<ITorrentSearchService>('ITorrentSearchService');

/**
 * @swagger
 * /api/torrent-search:
 *   get:
 *     summary: Retrieve a list of search results
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: the query
 *     responses:
 *       200:
 *         description: A list of search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetTorrentSearchResultResponse'
 */
router.get('/torrent-search', async (req: Request, res: Response) => {
    try {
        const searchPattern = req.query.q as string;
        const results : GetTorrentSearchResultResponse[] = await torrentSearchService.getResults(searchPattern);
        return res.json(results);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;

import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import OxTorrentProvider from '../../torrentSearch/providers/OxTorrentProvider.js';
import TorrentDownloadsService from '../services/TorrentDownloadsService.js';
import { AddTorrentDownloadRequest } from '@shared/src/models/AddTorrentDownloadRequest.js';
import { GetTorrentDownloadResponse } from '@shared/src/models/GetTorrentDownloadResponse.js';

dotenv.config();

const router = Router();
const torrentDownloadsService = new TorrentDownloadsService();

/**
 * @swagger
 * /api/torrent-downloads:
 *   get:
 *     summary: Retrieve a list of active torrents
 *     responses:
 *       200:
 *         description: A list of torrents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetTorrentDownloadResponse'
 */
router.get('/torrent-downloads', async (req: Request, res: Response) => {
    try {
        const torrents : GetTorrentDownloadResponse[] = await torrentDownloadsService.getTorrents();
        res.json(torrents);
    } catch (error) {
        res.status(500).json(error);
    }
});

/**
 * @swagger
 * /api/torrent-downloads:
 *   post:
 *     summary: Add a new torrent to downloads
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddTorrentDownloadRequest'
 *     responses:
 *       201:
 *         description: Torrent added successfully, but no content returned 
 */
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

/**
 * @swagger
 * /api/torrent-downloads:
 *   delete:
 *     summary: Delete a torrent from downloads
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: DeleteTorrentDownloadRequest
 *             required:
 *               - MagnetLink
 *             properties:
 *               MagnetLink:
 *                 type: string
 *     responses:
 *       200:
 *         description: Torrent deleted successfully, but no content returned 
 */
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

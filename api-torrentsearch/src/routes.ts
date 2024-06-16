import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Torrent Search API!');
});

router.get('/search', (req: Request, res: Response) => {
  const query = req.query.q;
  // Implement your torrent search logic here
  res.send(`Searching for torrents related to: ${query}`);
});

export default router;

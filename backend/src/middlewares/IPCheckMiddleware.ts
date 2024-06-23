import { Request, Response, NextFunction } from 'express';

const IPCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const allowedIps = ['::1', '127.0.0.1', 'localhost'];
    const ip = req.ip;
    const host = req.headers['host']?.split(':')[0];

    if (allowedIps.includes(ip ?? '') && allowedIps.includes(host ?? '')) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Access is denied.' });
    }
};

export default IPCheckMiddleware;
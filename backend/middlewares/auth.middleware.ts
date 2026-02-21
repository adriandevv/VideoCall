import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'No token provided, unauthorized.' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        (req as any).user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token, unauthorized.' });
    }
}

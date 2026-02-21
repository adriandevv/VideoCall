import { Request, Response, NextFunction } from 'express';

export function verifyCsrfToken(req: Request, res: Response, next: NextFunction) {
    // Skip CSRF verification for safe methods
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
        return next();
    }

    const tokenFromCookie = req.cookies['XSRF-TOKEN'];
    const tokenFromHeader = req.headers['x-xsrf-token'];

    if (!tokenFromCookie || !tokenFromHeader || tokenFromCookie !== tokenFromHeader) {
        return res.status(403).json({ message: 'Invalid or missing CSRF token' });
    }

    next();
}

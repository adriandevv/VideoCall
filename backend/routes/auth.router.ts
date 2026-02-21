import express from 'express';
import crypto from 'crypto';
import { rateLimit } from 'express-rate-limit';
import AuthService from '../services/auth.service.js';
import UsersService from '../services/users.service.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();
const authService = new AuthService();
const usersService = new UsersService();

// Base rate limiter for auth routes: max 10 requests per 15 minutes per IP
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});

router.post('/register', authLimiter, async (req, res, next) => {
    try {
        const body = req.body;
        const newUser = await authService.register(body);
        // exclude password from response
        const { password, ...userWithoutPassword } = newUser.toJSON();
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

router.post('/login', authLimiter, async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await authService.login(username, password);
        const { accessToken, refreshToken } = await authService.signToken(user);

        // Generate CSRF token
        const csrfToken = crypto.randomBytes(32).toString('hex');

        // Note: in a production environment with HTTPS, set secure: true
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            // secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000 // 15 mins
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            // secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.cookie('XSRF-TOKEN', csrfToken, {
            httpOnly: false, // accessible by frontend JS
            sameSite: 'lax',
            // secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        const { password: userPassword, ...userWithoutPassword } = user.toJSON();
        res.json({ message: 'Logged in successfully', user: userWithoutPassword });
    } catch (error) {
        res.status(401).json({ error: (error as Error).message });
    }
});

router.post('/logout', async (req, res) => {
    // Optional: Extract user id from token/DB to revoke refresh token explicitly
    const refreshToken = req.cookies['refreshToken'];
    if (refreshToken) {
        try {
            const user = await authService.verifyRefreshToken(refreshToken);
            if (user) {
                await usersService.update(user.id, { refresh_token: null });
            }
        } catch (e) {
            // Ignore if already invalid
        }
    }
    res.clearCookie('jwt');
    res.clearCookie('refreshToken');
    res.clearCookie('XSRF-TOKEN');
    res.json({ message: 'Logged out successfully' });
});

router.post('/refresh', async (req, res) => {
    try {
        const token = req.cookies['refreshToken'];
        if (!token) {
            return res.status(401).json({ error: 'No refresh token provided' });
        }

        const user = await authService.verifyRefreshToken(token);
        const { accessToken, refreshToken: newRefreshToken } = await authService.signToken(user);

        res.cookie('jwt', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000 // 15 mins
        });

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({ message: 'Token refreshed' });
    } catch (error) {
        res.clearCookie('jwt');
        res.clearCookie('refreshToken');
        res.status(401).json({ error: 'Invalid refresh token' });
    }
});

router.get('/me', verifyToken, async (req, res) => {
    try {
        // req.user has the token payload, we can fetch extra data from DB if needed
        res.json({ user: (req as any).user });
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

router.get('/csrf', (req, res) => {
    const csrfToken = crypto.randomBytes(32).toString('hex');
    res.cookie('XSRF-TOKEN', csrfToken, {
        httpOnly: false,
        sameSite: 'lax',
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    });
    res.json({ csrfToken });
});

export default router;

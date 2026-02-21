import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsersService from './users.service.js';

const usersService = new UsersService();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

class AuthService {
    async register(data: any) {
        try {
            const hash = await bcrypt.hash(data.password, 10);
            const newUser = await usersService.create({
                ...data,
                password: hash
            });
            return newUser;
        } catch (error: any) {
            throw new Error('Error registering user: ' + error.message);
        }
    }

    async login(username: string, passwordPlain: string) {
        const user = await usersService.findByUsername(username);
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(passwordPlain, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        return user;
    }

    async signToken(user: any) {
        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar
        };
        const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

        await usersService.update(user.id, {
            refresh_token: refreshToken
        });

        return { accessToken, refreshToken };
    }

    async verifyRefreshToken(token: string) {
        try {
            const payload = jwt.verify(token, JWT_SECRET) as any;
            const user = await usersService.findOne(payload.sub);
            if (!user || user.refresh_token !== token) {
                throw new Error('Invalid refresh token');
            }
            return user;
        } catch (error) {
            throw new Error('Unauthorized');
        }
    }
}

export default AuthService;

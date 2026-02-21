import express, { Express } from 'express';
import usersRouter from './users.router.js';
import callsRouter from './calls.router.js';
import callParticipantsRouter from './call_participants.router.js';
import messagesRouter from './messages.router.js';
import authRouter from './auth.router.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { verifyCsrfToken } from '../middlewares/csrf.middleware.js';

function routerApi(app: Express) {
    const router = express.Router();
    app.use('/api/v1', router);
    // Rutas públicas de autenticación
    router.use('/auth', authRouter);

    // Todas las demás rutas requerirán validación de JWT y prevencion CSRF
    router.use(verifyToken);
    router.use(verifyCsrfToken);

    router.use('/users', usersRouter);
    router.use('/calls', callsRouter);
    router.use('/call-participants', callParticipantsRouter);
    router.use('/messages', messagesRouter);
}

export default routerApi;

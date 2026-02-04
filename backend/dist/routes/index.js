import express from 'express';
import usersRouter from './users.router.js';
import callsRouter from './calls.router.js';
import callParticipantsRouter from './call_participants.router.js';
import messagesRouter from './messages.router.js';
function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/users', usersRouter);
    router.use('/calls', callsRouter);
    router.use('/call-participants', callParticipantsRouter);
    router.use('/messages', messagesRouter);
}
export default routerApi;

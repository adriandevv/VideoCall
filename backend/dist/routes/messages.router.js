import express from 'express';
import MessagesService from '../services/messages.service.js';
import validatorHandler from '../middlewares/validator.handler.js';
import { createMessageSchema, getMessageSchema, getCallMessagesSchema } from '../schema/messages.schema.js';
const router = express.Router();
const service = new MessagesService();
router.get('/', async (req, res) => {
    try {
        const messages = await service.find();
        res.json(messages);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving messages', error: error.message });
    }
});
router.get('/call/:callId', validatorHandler(getCallMessagesSchema, 'params'), async (req, res) => {
    try {
        const { callId } = req.params;
        const messages = await service.findByCall(callId);
        res.json(messages);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving messages for call', error: error.message });
    }
});
router.post('/', validatorHandler(createMessageSchema, 'body'), async (req, res) => {
    try {
        const body = req.body;
        const newMessage = await service.create(body);
        res.status(201).json(newMessage);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating message', error: error.message });
    }
});
router.delete('/:id', validatorHandler(getMessageSchema, 'params'), async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.delete(parseInt(id));
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting message', error: error.message });
    }
});
export default router;

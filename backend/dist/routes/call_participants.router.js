import express from 'express';
import CallParticipantsService from '../services/call_participants.service.js';
import validatorHandler from '../middlewares/validator.handler.js';
import { createParticipantSchema, updateParticipantSchema, getParticipantSchema, getCallParticipantsSchema } from '../schema/call_participants.schema.js';
const router = express.Router();
const service = new CallParticipantsService();
router.get('/', async (req, res) => {
    try {
        const participants = await service.find();
        res.json(participants);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving participants', error: error.message });
    }
});
router.get('/call/:callId', validatorHandler(getCallParticipantsSchema, 'params'), async (req, res) => {
    try {
        const { callId } = req.params;
        const participants = await service.findByCall(callId);
        res.json(participants);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving participants for call', error: error.message });
    }
});
router.post('/', validatorHandler(createParticipantSchema, 'body'), async (req, res) => {
    try {
        const body = req.body;
        const newParticipant = await service.create(body);
        res.status(201).json(newParticipant);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding participant', error: error.message });
    }
});
router.patch('/:id', validatorHandler(getParticipantSchema, 'params'), validatorHandler(updateParticipantSchema, 'body'), async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const result = await service.update(parseInt(id), body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating participant', error: error.message });
    }
});
router.delete('/:id', validatorHandler(getParticipantSchema, 'params'), async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.delete(parseInt(id));
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Error removing participant', error: error.message });
    }
});
export default router;

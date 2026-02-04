import express from 'express';
import CallsService from '../services/calls.service.js';
import validatorHandler from '../middlewares/validator.handler.js';
import { createCallSchema, updateCallSchema, getCallSchema } from '../schema/calls.schema.js';
const router = express.Router();
const service = new CallsService();
router.get('/', async (req, res) => {
    try {
        const calls = await service.find();
        res.json(calls);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving calls', error: error.message });
    }
});
router.get('/active', async (req, res) => {
    try {
        const calls = await service.findActive();
        res.json(calls);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving active calls', error: error.message });
    }
});
router.get('/:id', validatorHandler(getCallSchema, 'params'), async (req, res) => {
    try {
        const { id } = req.params;
        const call = await service.findOne(id);
        res.json(call);
    }
    catch (error) {
        res.status(404).json({ message: 'Call not found', error: error.message });
    }
});
router.post('/', validatorHandler(createCallSchema, 'body'), async (req, res) => {
    try {
        const body = req.body;
        const newCall = await service.create(body);
        res.status(201).json(newCall);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating call', error: error.message });
    }
});
router.patch('/:id', validatorHandler(getCallSchema, 'params'), validatorHandler(updateCallSchema, 'body'), async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const result = await service.update(id, body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating call', error: error.message });
    }
});
router.delete('/:id', validatorHandler(getCallSchema, 'params'), async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.delete(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting call', error: error.message });
    }
});
export default router;

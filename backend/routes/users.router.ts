import express, { Request, Response } from 'express';
import UsersService from '../services/users.service.js';
import validatorHandler from '../middlewares/validator.handler.js';
import { createUserSchema, updateUserSchema, getUserSchema } from '../schema/users.schema.js';

const router = express.Router();
const service = new UsersService();

router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await service.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
});

router.get('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await service.findOne(parseInt(id as string));
            res.json(user);
        } catch (error: any) {
            res.status(404).json({ message: 'User not found', error: error.message });
        }
    }
);

router.post('/',
    validatorHandler(createUserSchema, 'body'),
    async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const newUser = await service.create(body);
            res.status(201).json(newUser);
        } catch (error: any) {
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    }
);

router.patch('/:id',
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const result = await service.update(parseInt(id as string), body);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    }
);

router.delete('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await service.delete(parseInt(id as string));
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    }
);

export default router;

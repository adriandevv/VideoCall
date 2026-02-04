import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

function validatorHandler(schema: Schema, property: 'body' | 'params' | 'query' | 'headers' = 'body') {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            res.status(400).json({
                message: 'Validation error',
                details: error.details,
            });
            return;
        }
        next();
    };
}

export default validatorHandler;

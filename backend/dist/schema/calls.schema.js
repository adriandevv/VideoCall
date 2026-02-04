import Joi from 'joi';
const id = Joi.string().uuid();
const title = Joi.string().min(3).max(100);
const is_active = Joi.boolean();
const ended_at = Joi.date();
const createCallSchema = Joi.object({
    title: title,
});
const updateCallSchema = Joi.object({
    title: title,
    is_active: is_active,
    ended_at: ended_at,
});
const getCallSchema = Joi.object({
    id: id.required(),
});
export { createCallSchema, updateCallSchema, getCallSchema };

import Joi from 'joi';

const id = Joi.number().integer();
const call_id = Joi.string().uuid();
const sender_id = Joi.number().integer();
const content = Joi.string().min(1);
const type = Joi.string().valid('text', 'image', 'file');

const createMessageSchema = Joi.object({
    call_id: call_id.required(),
    sender_id: sender_id.required(),
    content: content.required(),
    type: type,
});

const getMessageSchema = Joi.object({
    id: id.required(),
});

const getCallMessagesSchema = Joi.object({
    callId: call_id.required(),
});

export { createMessageSchema, getMessageSchema, getCallMessagesSchema };

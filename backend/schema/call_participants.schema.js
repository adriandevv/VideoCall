import Joi from 'joi';

const id = Joi.number().integer();
const call_id = Joi.string().uuid();
const user_id = Joi.number().integer();
const role = Joi.string().valid('Host', 'Guest');
const left_at = Joi.date();

const createParticipantSchema = Joi.object({
    call_id: call_id.required(),
    user_id: user_id.required(),
    role: role,
});

const updateParticipantSchema = Joi.object({
    role: role,
    left_at: left_at,
});

const getParticipantSchema = Joi.object({
    id: id.required(),
});

const getCallParticipantsSchema = Joi.object({
    callId: call_id.required(),
});

export { createParticipantSchema, updateParticipantSchema, getParticipantSchema, getCallParticipantsSchema };

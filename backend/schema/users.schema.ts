import Joi from 'joi';

const id = Joi.number().integer();
const username = Joi.string().min(3).max(30);
const password = Joi.string().min(6);
const email = Joi.string().email();
const avatar = Joi.string(); // Can be a large base64 string

const createUserSchema = Joi.object({
    username: username.required(),
    email: email.required(),
    password: password.required(),
    avatar: avatar,
});

const updateUserSchema = Joi.object({
    username: username,
    email: email,
    password: password,
    avatar: avatar,
});

const getUserSchema = Joi.object({
    id: id.required(),
});

export { createUserSchema, updateUserSchema, getUserSchema };

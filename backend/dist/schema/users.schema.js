import Joi from 'joi';
const id = Joi.number().integer();
const username = Joi.string().min(3).max(30);
const password = Joi.string().min(6);
const avatar = Joi.string().uri();
const createUserSchema = Joi.object({
    username: username.required(),
    password: password.required(),
    avatar: avatar,
});
const updateUserSchema = Joi.object({
    username: username,
    password: password,
    avatar: avatar,
});
const getUserSchema = Joi.object({
    id: id.required(),
});
export { createUserSchema, updateUserSchema, getUserSchema };

import Joi from "joi";

const id = Joi.number().integer().min(0);
const email = Joi.string().email();
const password = Joi.string().min(8).alphanum();
const role = Joi.string();
const name = Joi.string();

export const createUserSchema = Joi.object({
  id: id,
  email: email.required(),
  password: password.required(),
  role,
  name
});

export const updateUserSchema = Joi.object({
  id,
  email,
  password
});

export const getUserSchema = Joi.object({
  id: id.required()
});

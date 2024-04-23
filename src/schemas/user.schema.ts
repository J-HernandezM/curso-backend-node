import Joi from "joi";

const id = Joi.number().integer().min(0);
const email = Joi.string().email()
const password = Joi.string().min(8).alphanum()

export const createUserSchema = Joi.object({
  id: id,
  email: email.required(),
  password: password.required()
})

export const updateUserSchema = Joi.object({
  id,
  email,
  password
})

export const getUserSchema = Joi.object({
  id: id.required()
})

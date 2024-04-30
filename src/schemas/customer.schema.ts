import Joi from "joi";
import { createUserSchema, updateUserSchema } from "./user.schema";

const id = Joi.number().integer().min(0);
const name = Joi.string().alphanum().min(3)
const lastName = Joi.string().alphanum().min(4)
const phone = Joi.number().min(7)

export const createCustomerSchema = Joi.object({
  id,
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema
})

export const updateCustomerSchema = Joi.object({
  id,
  name,
  lastName,
  phone,
  user: updateUserSchema
})

export const getCustomerSchema = Joi.object({
  id: id.required()
})

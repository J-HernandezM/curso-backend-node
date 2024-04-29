import Joi from "joi";

const id = Joi.number().integer().min(0);
const name = Joi.string().alphanum().min(3)
const lastName = Joi.string().alphanum().min(4)
const phone = Joi.number().min(7)
const userId = Joi.number().integer().min(0)

export const createCustomerSchema = Joi.object({
  id,
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  userId: userId.required()
})

export const updateCustomerSchema = Joi.object({
  id,
  name,
  lastName,
  phone,
})

export const getCustomerSchema = Joi.object({
  id: id.required()
})

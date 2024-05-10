import Joi from "joi";

const id = Joi.number().integer().min(0)
const status = Joi.string().valid('paid', 'delivered', 'shipped')

export const createOrderSchema = Joi.object({
  id,
  customerId: id.required(),
  // status: status.required()
})

export const updateOrderSchema = Joi.object({
  id,
  customerId: id,
  // status
})

export const getOrderSchema = Joi.object({
  id: id.required()
})

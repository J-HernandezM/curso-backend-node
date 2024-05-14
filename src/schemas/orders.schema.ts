import Joi from "joi";

const id = Joi.number().integer().min(0)
const status = Joi.string().valid('paid', 'delivered', 'shipped')
const amount = Joi.number().integer().min(1)

export const createOrderSchema = Joi.object({
  id,
  customerId: id.required(),
  status: status.required()
})

export const updateOrderSchema = Joi.object({
  id,
  customerId: id,
  status
})

export const getOrderSchema = Joi.object({
  id: id.required()
})

export const addItemSchema = Joi.object({
  orderId: id.required(),
  productId: id.required(),
  amount: amount.required()
})

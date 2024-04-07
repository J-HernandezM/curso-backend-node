import Joi from "joi";

const id = Joi.number().integer().min(0)
const name = Joi.string().min(3).max(50)
const price = Joi.number().positive().integer().min(5)
const image = Joi.string().uri()
const blocked = Joi.boolean()

const createProductSchema = Joi.object({
  id,
  name: name.required(),
  price: price.required(),
  image: image.required(),
  blocked: blocked.required()
})

const updateProductSchema = Joi.object({
  id,
  name,
  price,
  image,
  blocked
})

const getProductSchema = Joi.object({
  id: id.required()
})

export { createProductSchema, updateProductSchema, getProductSchema }

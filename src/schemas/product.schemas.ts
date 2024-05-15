import Joi from "joi";

const id = Joi.number().integer().min(0)
const name = Joi.string().min(3).max(50)
const price = Joi.number().positive().integer().min(5)
const price_min = Joi.number().integer().min(0)
const price_max = Joi.number().positive().integer().min(0)
const image = Joi.string().uri()
const blocked = Joi.boolean()
const description = Joi.string().min(7)
const limit = Joi.number().integer()
const offset = Joi.number().integer()

export const createProductSchema = Joi.object({
  id,
  name: name.required(),
  price: price.required(),
  image: image.required(),
  blocked: blocked.required(),
  description: description.required(),
  categorieId: id
})

export const updateProductSchema = Joi.object({
  id,
  name,
  price,
  image,
  blocked,
  description
})

export const getProductSchema = Joi.object({
  id: id.required()
})

export const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.greater(Joi.ref('price_min')) // Price max must be greater
})
  .with('price_min', 'price_max') // Price max and price min need to be together
  .with('price_max', 'price_min') // Price max and price min need to be together


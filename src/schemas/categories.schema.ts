import Joi from "joi";

const id = Joi.number().integer().min(0);
const image = Joi.string();
const name = Joi.string().min(5)

export const createCategorieSchema = Joi.object({
  id,
  name: name.required(),
  image: image.required(),
})

export const updateCategorieSchema = Joi.object({
  id,
  name,
  image
})

export const getCategorieSchema = Joi.object({
  id: id.required()
})

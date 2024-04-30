import Joi from "joi";

const id = Joi.number().integer().min(0);
const image = Joi.string();
const title = Joi.string().min(5)

export const createCategorySchema = Joi.object({
  id,
  title: title.required(),
  image: image.required(),
})

export const updateCategorySchema = Joi.object({
  id,
  title,
  image
})

export const getCategorySchema = Joi.object({
  id: id.required()
})

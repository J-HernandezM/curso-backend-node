import e from "express";
import 'express-async-errors'
import validator from "../../middlewares/validator.handler";
import { createProductSchema, getProductSchema, queryProductSchema, updateProductSchema } from "../../schemas/product.schemas";
import { ProductService } from "./products.service";
import { Product } from "../../db/models/product.model";


const router = e.Router();
const service = new ProductService;

router.get('/', validator(queryProductSchema, 'query'), async (req, res) => {
  const { query } = req
  const products: Product[] = await service.getProducts(query)
  res.status(200).json(products)
})

router.post('/', validator(createProductSchema, 'body'), async (req, res) => {
  const body: Product = req.body;
  const data = await service.createProduct(body);

  res.status(201).json({
    message: "product created succesfully",
    data
  })
})

router.get('/:id', validator(getProductSchema, 'params'), async (req, res) => {
  const { id } = req.params
  const product = await service.findOne(Number(id))

  if (!product) {
    res.status(404).json({ message: '404 product not found' })
    return
  }

  res.json(product)
})

router.patch('/:id',
  validator(getProductSchema, 'params'),
  validator(updateProductSchema, 'body'),
  async (req, res) => {
    const { body, params: { id } } = req

    const product = await service.updateProduct(Number(id), body)
    res.status(200).json({
      message: "product updated succesfully",
      data: product,
      id
    })
  })

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await service.deleteProduct(Number(id));

  res.status(200).json({
    message: "product deleted succesfully",
    id
  })
})

export default router

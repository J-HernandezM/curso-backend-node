import e from "express";
import ProductService from "./products.service";
import { Product } from "./products.model";
import 'express-async-errors'


const router = e.Router();
const service = new ProductService;

router.get('/', async (req, res) => {
  const products: Product[] = await service.getProducts()
  res.status(200).json(products)
})

router.post('/', (req, res) => {
  const body: Product = req.body;

  const data = service.createProduct(body);

  res.status(201).json({
    message: "content created succesfully",
    data
  })
})

router.get('/filter', (req, res) => {
  res.send('Soy un filtro')
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const product = await service.getProductById(Number(id))

  if (!product) {
    res.status(404).json({ message: '404 product not found' })
    return
  }

  res.json(product)
})

router.patch('/:id', async (req, res) => {
  const { body, params: { id } } = req

  const product = await service.updateProduct(Number(id), body)
  res.status(200).json({
    message: "content updated partially succesfully",
    data: product,
    id
  })
})

router.put('/:id', (req, res) => {
  const { body, params: { id } } = req

  res.status(200).json({
    message: "content updated succesfully",
    data: body,
    id
  })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await service.deleteProduct(Number(id));

  res.status(200).json({
    message: "content deleted succesfully",
    id
  })
})

export default router

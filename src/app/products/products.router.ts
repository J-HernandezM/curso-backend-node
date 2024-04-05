import e from "express";
import ProductService from "./products.service";
import { Product } from "./products.model";

const router = e.Router();
const service = new ProductService;

router.get('/', (req, res) => {
  res.json(service.getProducts())
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

router.get('/:id', (req, res) => {
  const { id } = req.params
  const product = service.getProductById(Number(id))

  if (!product) {
    res.status(404).json({ message: '404 product not found' })
    return
  }

  res.json(product)
})

router.patch('/:id', (req, res) => {
  const { body, params: { id } } = req
  let product

  try {
    product = service.updateProduct(Number(id), body)

    res.status(200).json({
      message: "content updated partially succesfully",
      data: body,
      id
    })
  } catch (err) {
    if (!(err instanceof Error)) { return }

    res.status(404).json({ message: err.message })
  }
})

router.put('/:id', (req, res) => {
  const { body, params: { id } } = req

  res.status(200).json({
    message: "content updated succesfully",
    data: body,
    id
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  try {
    service.deleteProduct(Number(id));

    res.status(200).json({
      message: "content deleted succesfully",
      id
    })
  } catch (err) {
    if (!(err instanceof Error)) { return }

    res.status(404).json({ message: err.message })
  }
})

export default router

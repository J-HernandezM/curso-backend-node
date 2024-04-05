import e from "express";
import ProductService from "./products.service";

const router = e.Router();
const service = new ProductService;

router.get('/', (req, res) => {
  res.json(service.getProducts())
})

router.post('/', (req, res) => {
  const body = req.body;

  res.status(201).json({
    message: "created",
    data: body,
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

  res.status(200).json({
    message: "updated partially",
    data: body,
    id
  })
})

router.put('/:id', (req, res) => {
  const { body, params: { id } } = req

  res.status(200).json({
    message: "updated",
    data: body,
    id
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  service.deleteProduct(Number(id));

  res.status(200).json({
    message: "deleted",
    id
  })
})

export default router

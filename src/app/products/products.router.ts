import e from "express";
import { faker } from "@faker-js/faker";

const router = e.Router();

router.get('/', (req, res) => {
  const { size } = req.query
  const products = []
  const limit = Number(size) || 10

  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      image: faker.image.url()
    })
  }

  res.json(products)
})

router.get('/filter', (req, res) => {
  res.send('Soy un filtro')
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  res.json({
    id,
    name: `Producto: ${id}`,
    price: 1000,
  })
})

export default router

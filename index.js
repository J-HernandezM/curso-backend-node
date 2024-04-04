/* eslint-disable no-console */
const express = require('express')
const { faker } = require("@faker-js/faker");

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Servidor express')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('Nueva ruta')
})

app.get('/products', (req, res) => {
  const { size } = req.query
  const products = []
  const limit = size || 10

  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      image: faker.image.url()
    })
  }

  res.json(products)
})

app.get('/products/filter', (req, res) => {
  res.send('Soy un filtro')
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params

  res.json({
    id,
    name: `Producto: ${id}`,
    price: 1000,
  })
})

app.get('/categories', (req, res) => {
  res.json([
    {
      blue: true,
      green: false
    },
    {
      name: true,
      price: false
    }
  ])
})

app.get('/categories/:id', (req, res) => {
  const { id } = req.params

  res.json({
    id,
    blue: true,
    green: false
  })
})

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;

  res.json({
      categoryId,
      productId
  });
});

app.get('/users', (req, res) => {
  const { query } = req.query

  if (query) {
    res.json([{
      name: 'Arturo',
      type: 'employee'
  }, {
      name: 'Jimena',
      type: 'customer'
  }]);
  } else {
    res.status(404).send('No hay ningun parametro')
  }


});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  res.json({
      id,
      name: 'Arturo',
      type: 'employee'
  });
});

app.listen(port, () => {
  console.log(`Corriendo en http://localhost:${port}`);
})

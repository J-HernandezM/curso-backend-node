/* eslint-disable no-console */
const express = require('express')

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Servidor express')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('Nueva ruta')
})

app.get('/products', (req, res) => {
  res.json([
    {
      name: 'Producto 1',
      price: '1000'
    },
    {
      name: 'Producto 1',
      price: '1000'
    }
  ])
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

app.get('/products/:id', (req, res) => {
  const { id } = req.params

  res.json({
    id,
    name: `Producto: ${id}`,
    price: 1000,
  })
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

app.get('/people', (req, res) => {
  res.json([{
      name: 'Arturo',
      type: 'employee'
  }, {
      name: 'Jimena',
      type: 'customer'
  }]);
});

app.get('/people/:id', (req, res) => {
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

/* eslint-disable no-console */
const express = require('express')

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Servidor express')
})

app.listen(port, () => {
  console.log(`Corriendo en http://localhost:${port}`);
})

/* eslint-disable no-console */
import e from "express";
import apiRouter from "./app/api.router";

const app = e();
const port = 3000;

app.use(e.json());

app.get('/', (req, res) => {
  res.send('Servidor express')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('Nueva ruta')
})

apiRouter(app);

app.listen(port, () => {
  console.log(`Corriendo en http://localhost:${port}`);
})

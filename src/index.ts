/* eslint-disable no-console */
import e from "express";
import apiRouter from "./app/api.router";
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/error.handler'

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
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Corriendo en http://localhost:${port}`);
})

/* eslint-disable no-console */
import e from "express";
import apiRouter from "./app/api.router";
import cors, { CorsOptions } from 'cors'

import { logErrors, errorHandler, boomErrorHandler } from './middlewares/error.handler'

const app = e();
const port = 3000;
const whitelist = ['http://localhost:5500', `http://localhost:${port}`]
const options: CorsOptions = {
  origin: (origin, callback) => {
    if (!whitelist.includes(origin!)) { callback(new Error('CORS not allowed')) }
    callback(null, true)
  }
}

app.use(e.json());
app.use(cors(options))

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

/* eslint-disable no-console */
import e from "express";
import apiRouter from "./app/api.router";
import cors, { CorsOptions } from 'cors'
import { logErrors, errorHandler, boomErrorHandler, sqlErrorHandler } from './middlewares/error.handler'

const app = e();
const port = process.env.PORT || 3000;
const whitelist = ['http://localhost:5500', `http://localhost:${port}`, 'https://curso-backend-node-production.up.railway.app']
const options: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true)
      return
    }
    if (!whitelist.includes(origin!)) { callback(new Error('CORS not allowed')) }
    callback(null, true)
  }
}


app.use(e.json());

app.get('/', (req, res) => {
  res.send('Servidor express')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('Nueva ruta')
})


apiRouter(app);
app.use(cors(options))
app.use(logErrors)
app.use(sqlErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Corriendo en http://localhost:${port}`);
})

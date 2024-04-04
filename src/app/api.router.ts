import { Express } from 'express'
import productsRouter from './products/products.router'
import usersRouter from './users/users.router'
import categoriesRouter from './categories/categories.router'

const apiRouter = (app: Express) => {
  app.use('/products', productsRouter)
  app.use('/users', usersRouter)
  app.use('/categories', categoriesRouter)
  console.log('here');
}

export default apiRouter

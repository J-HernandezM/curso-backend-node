import e, { Express } from 'express'
import productsRouter from './products/products.router'
import usersRouter from './users/users.router'
import categoriesRouter from './categories/categories.router'
import customersRouter from './customers/customer.router'
import ordersRouter from './orders/orders.router'

const apiRouter = (app: Express) => {
  const router = e.Router();

  router.use('/products', productsRouter)
  router.use('/customers', customersRouter)
  router.use('/users', usersRouter)
  router.use('/categories', categoriesRouter)
  router.use('/orders', ordersRouter)
  app.use('/api/v1', router)
}

export default apiRouter

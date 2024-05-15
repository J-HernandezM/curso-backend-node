import e from "express";
import { OrderService } from "./orders.service";
import { addItemSchema, createOrderSchema, getItemSchema, getOrderSchema, updateOrderSchema } from "../../schemas/orders.schema";
import validator from "../../middlewares/validator.handler";

const router = e.Router();
const service = new OrderService;

router.get('/', async (req, res) => {
  const orders = await service.getOrders();
  res.status(200).json(orders)
})

router.post('/', validator(createOrderSchema, 'body'), async (req, res) => {
  const { body } = req
  const data = await service.createOrder(body)

  res.status(201).json({
    message: 'order created succesfully',
    data
  })
})

router.get('/customer/:id', validator(getOrderSchema, 'params'), async (req, res) => {
  const { id: customerId } = req.params

  const order = await service.findByCustomer(+customerId);

  if (!order) {
    res.status(404).json({ message: '404 order not found' })
    return
  }

  res.json(order)
})

router.post('/:orderId/product/:productId',
  validator(getItemSchema, 'params'),
  validator(addItemSchema, 'body'),
  async (req, res) => {
    const { body, params: { orderId, productId } } = req
    const newItem = await service.addItem(body, +orderId, +productId)

    res.status(200).json({
      message: 'item added correctly to the order',
      data: newItem
    })
  })

router.get('/:id', validator(getOrderSchema, 'params'), async (req, res) => {
  const { id } = req.params
  const order = await service.findOne(+id);

  if (!order) {
    res.status(404).json({ message: '404 order not found' })
    return
  }

  res.json(order)
})

router.patch('/:id',
  validator(getOrderSchema, 'params'),
  validator(updateOrderSchema, 'body'),
  async (req, res) => {
    const { body, params: { id } } = req

    const order = await service.updateOrder(+id, body)
    res.status(200).json({
      message: 'order updated succefully',
      data: order,
      id
    })
  })

router.delete('/:id',
  validator(getOrderSchema, 'params'),
  async (req, res) => {
    const { id } = req.params
    await service.deleteOrder(+id)

    res.status(200).json({
      message: 'order deleted succefully',
      id
    })
  })

export default router

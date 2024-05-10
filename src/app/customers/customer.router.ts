import e from "express"
import validator from '../../middlewares/validator.handler'
import { createCustomerSchema, getCustomerSchema, updateCustomerSchema } from "../../schemas/customer.schema";
import { Customer } from "../../db/models/customer.model";
import { CustomerService } from "./customer.service";

const router = e.Router();
const service = new CustomerService;

router.get('/', async (req, res) => {
  const customers: Customer[] = await service.getCustomers();
  res.status(200).json(customers)
})

router.post('/', validator(createCustomerSchema, 'body'), async (req, res) => {
  const body: Customer = req.body;
  const data = await service.createCustomer(body);

  res.status(201).json({
    message: "customer created succesfully",
    data
  })

})

router.get('/:id', validator(getCustomerSchema, 'params'), async (req, res) => {
  const { id } = req.params
  const customer: Customer = await service.findOne(Number(id))

  res.status(200).json({
    data: customer
  })
})

router.patch('/:id',
  validator(getCustomerSchema, 'params'),
  validator(updateCustomerSchema, 'body'),
  async (req, res) => {
    const { id } = req.params
    const body = req.body

    await service.updateCustomer(Number(id), body);

    res.status(200).json({
      message: "content updated succesfully",
      id,
      data: body,
    })
  })

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  await service.deleteCustomer(Number(id))

  res.status(200).json({
    message: "content deleted succesfully",
    id,
  })
})

export default router

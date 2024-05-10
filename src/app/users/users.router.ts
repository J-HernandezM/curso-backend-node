import e from "express";
import UserService from "./users.service";
import { createUserSchema, getUserSchema, updateUserSchema } from "../../schemas/user.schema";
import validator from "../../middlewares/validator.handler";

const router = e.Router();
const service = new UserService();

router.get('/', async (req, res) => {
  const data = await service.getAll();
  res.status(200).json(data)
});

router.get('/tasks', async (req, res) => {
  const data = await service.getUserTasks();

  res.status(200).json(data)
})

router.get('/:id', validator(getUserSchema, 'params'), async (req, res) => {
  const { id } = req.params;
  const user = await service.findOne(Number(id))

  res.json({
    data: user
  });
});

router.post('/', validator(createUserSchema, 'body'), async (req, res) => {
  const user = await service.createUser(req.body)

  res.status(201).json({
    message: "content created succesfully",
    data: user
  })
})

router.delete('/:id', validator(getUserSchema, 'params'), async (req, res) => {
  const { id } = req.params;
  await service.deleteUser(Number(id));

  res.status(200).json({
    message: 'content deleted succesfully',
  })
})

router.patch('/:id', validator(getUserSchema, 'params'), validator(updateUserSchema, 'body'), async (req, res) => {
  const { id } = req.params;
  const user = await service.updateUser(Number(id), req.body)

  res.status(200).json({
    message: 'content patched succesfully',
    data: user,
  })
})

export default router

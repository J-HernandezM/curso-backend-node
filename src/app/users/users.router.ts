import e from "express";
import UserService from "./users.service";

const router = e.Router();
const service = new UserService();

router.get('/', (req, res) => {
  const data = 'datos'
  res.status(200).json(data)
});

router.get('/tasks', async (req, res) => {
  const data = await service.getUserTasks();

  res.status(200).json(data)
})

router.get('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    name: 'Arturo',
    type: 'employee'
  });
});

router.post('/', (req, res) => {
  const { body } = req.body

  res.status(201).json({
    message: "content created succesfully",
    data: {}
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    message: 'content deleted succesfully',
    id
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    message: 'content patched succesfully',
    data: {},
    id
  })
})

export default router

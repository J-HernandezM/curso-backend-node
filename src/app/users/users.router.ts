import e from "express";

const router = e.Router();

router.get('/', (req, res) => {
  const { query } = req.query

  if (query) {
    res.json([{
      name: 'Arturo',
      type: 'employee'
  }, {
      name: 'Jimena',
      type: 'customer'
  }]);
  } else {
    res.status(404).send('No hay ningun parametro')
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
      id,
      name: 'Arturo',
      type: 'employee'
  });
});

export default router

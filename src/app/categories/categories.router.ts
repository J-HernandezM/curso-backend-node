import e from "express";

const router = e.Router();

router.get('/', (req, res) => {
  res.json([
    {
      blue: true,
      green: false
    },
    {
      name: true,
      price: false
    }
  ])
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  res.json({
    id,
    blue: true,
    green: false
  })
})

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;

  res.json({
      categoryId,
      productId
  });
});

export default router

import e from "express";
import validator from "../../middlewares/validator.handler";
import { createCategorySchema, getCategorySchema, updateCategorySchema } from "../../schemas/categories.schema";
import { CategorieService } from "./categories.service";

const router = e.Router();
const service = new CategorieService

router.get('/', async (req, res) => {
  const data = await service.getCategories();
  res.status(200).json(data)
});

router.get('/:id',
  validator(getCategorySchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const category = await service.findOne(Number(id))

    res.json({
      data: category
    });
  });

router.post('/',
  validator(createCategorySchema, 'body'),
  async (req, res) => {
    const category = await service.createCategorie(req.body)

    res.status(201).json({
      message: "categorie created succesfully",
      data: category
    })
  })

router.delete('/:id',
  validator(getCategorySchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    await service.deleteCategorie(Number(id));

    res.status(200).json({
      message: 'categorie deleted succesfully',
    })
  })

router.patch('/:id',
  validator(getCategorySchema, 'params'),
  validator(updateCategorySchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const category = await service.updateCategorie(Number(id), req.body)

    res.status(200).json({
      message: 'categorie patched succesfully',
      data: category,
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

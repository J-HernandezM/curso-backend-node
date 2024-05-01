import e from "express";
import validator from "../../middlewares/validator.handler";
import { createCategorieSchema, getCategorieSchema, updateCategorieSchema } from "../../schemas/categories.schema";
import { CategorieService } from "./categories.service";

const router = e.Router();
const service = new CategorieService

router.get('/', async (req, res) => {
  const data = await service.getCategories();
  res.status(200).json(data)
});

router.get('/:id',
  validator(getCategorieSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const categorie = await service.findOne(Number(id))

    res.json({
      data: categorie
    });
  });

router.post('/',
  validator(createCategorieSchema, 'body'),
  async (req, res) => {
    const categorie = await service.createCategorie(req.body)

    res.status(201).json({
      message: "categorie created succesfully",
      data: categorie
    })
  })

router.delete('/:id',
  validator(getCategorieSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    await service.deleteCategorie(Number(id));

    res.status(200).json({
      message: 'categorie deleted succesfully',
    })
  })

router.patch('/:id',
  validator(getCategorieSchema, 'params'),
  validator(updateCategorieSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const categorie = await service.updateCategorie(Number(id), req.body)

    res.status(200).json({
      message: 'categorie patched succesfully',
      data: categorie,
    })
  })

router.get('/:categorieId/products/:productId', (req, res) => {
  const { categorieId, productId } = req.params;

  res.json({
    categorieId,
    productId
  });
});

export default router

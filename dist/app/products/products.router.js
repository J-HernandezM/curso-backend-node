"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_service_1 = __importDefault(require("./products.service"));
require("express-async-errors");
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const product_schemas_1 = require("../../schemas/product.schemas");
const router = express_1.default.Router();
const service = new products_service_1.default;
router.get('/', async (req, res) => {
    const products = await service.getProducts();
    res.status(200).json(products);
});
router.post('/', (0, validator_handler_1.default)(product_schemas_1.createProductSchema, 'body'), (req, res) => {
    const body = req.body;
    const data = service.createProduct(body);
    res.status(201).json({
        message: "content created succesfully",
        data
    });
});
router.get('/filter', (req, res) => {
    res.send('Soy un filtro');
});
router.get('/:id', (0, validator_handler_1.default)(product_schemas_1.getProductSchema, 'params'), async (req, res) => {
    const { id } = req.params;
    const product = await service.getProductById(Number(id));
    if (!product) {
        res.status(404).json({ message: '404 product not found' });
        return;
    }
    res.json(product);
});
router.patch('/:id', (0, validator_handler_1.default)(product_schemas_1.getProductSchema, 'params'), (0, validator_handler_1.default)(product_schemas_1.updateProductSchema, 'body'), async (req, res) => {
    const { body, params: { id } } = req;
    const product = await service.updateProduct(Number(id), body);
    res.status(200).json({
        message: "content updated partially succesfully",
        data: product,
        id
    });
});
router.put('/:id', (req, res) => {
    const { body, params: { id } } = req;
    res.status(200).json({
        message: "content updated succesfully",
        data: body,
        id
    });
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await service.deleteProduct(Number(id));
    res.status(200).json({
        message: "content deleted succesfully",
        id
    });
});
exports.default = router;

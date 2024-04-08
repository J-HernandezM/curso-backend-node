"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
    ]);
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        id,
        blue: true,
        green: false
    });
});
router.get('/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;
    res.json({
        categoryId,
        productId
    });
});
exports.default = router;

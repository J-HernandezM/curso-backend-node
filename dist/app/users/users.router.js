"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    const { query } = req.query;
    if (query) {
        res.json([{
                name: 'Arturo',
                type: 'employee'
            }, {
                name: 'Jimena',
                type: 'customer'
            }]);
    }
    else {
        res.status(404).send('No hay ningun parametro');
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
exports.default = router;

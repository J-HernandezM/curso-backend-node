"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number().integer().min(0);
const name = joi_1.default.string().min(3).max(50);
const price = joi_1.default.number().positive().integer().min(5);
const image = joi_1.default.string().uri();
const blocked = joi_1.default.boolean();
const createProductSchema = joi_1.default.object({
    id,
    name: name.required(),
    price: price.required(),
    image: image.required(),
    blocked: blocked.required()
});
exports.createProductSchema = createProductSchema;
const updateProductSchema = joi_1.default.object({
    id,
    name,
    price,
    image,
    blocked
});
exports.updateProductSchema = updateProductSchema;
const getProductSchema = joi_1.default.object({
    id: id.required()
});
exports.getProductSchema = getProductSchema;

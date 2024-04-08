"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_router_1 = __importDefault(require("./products/products.router"));
const users_router_1 = __importDefault(require("./users/users.router"));
const categories_router_1 = __importDefault(require("./categories/categories.router"));
const apiRouter = (app) => {
    const router = express_1.default.Router();
    router.use('/products', products_router_1.default);
    router.use('/users', users_router_1.default);
    router.use('/categories', categories_router_1.default);
    app.use('/api/v1', router);
};
exports.default = apiRouter;

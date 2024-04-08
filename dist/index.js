"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const express_1 = __importDefault(require("express"));
const api_router_1 = __importDefault(require("./app/api.router"));
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = require("./middlewares/error.handler");
const app = (0, express_1.default)();
const port = 3000;
const whitelist = ['http://localhost:5500', `http://localhost:${port}`, 'https://curso-backend-node-production.up.railway.app'];
const options = {
    origin: (origin, callback) => {
        if (!origin) {
            callback(null, true);
            return;
        }
        if (!whitelist.includes(origin)) {
            callback(new Error('CORS not allowed'));
        }
        callback(null, true);
    }
};
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Servidor express');
});
app.get('/nueva-ruta', (req, res) => {
    res.send('Nueva ruta');
});
(0, api_router_1.default)(app);
app.use((0, cors_1.default)(options));
app.use(error_handler_1.logErrors);
app.use(error_handler_1.boomErrorHandler);
app.use(error_handler_1.errorHandler);
app.listen(port, () => {
    console.log(`Corriendo en http://localhost:${port}`);
});

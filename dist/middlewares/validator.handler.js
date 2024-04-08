"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = require("@hapi/boom");
const validator = (schema, property) => {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data);
        if (error) {
            next((0, boom_1.badRequest)(error));
        }
        next();
    };
};
exports.default = validator;

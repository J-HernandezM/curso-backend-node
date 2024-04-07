import { Boom, badRequest } from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validator = (schema: Joi.Schema, property: any) => {
  return (req: any, res: Response, next: NextFunction) => {
    const data = req[property];
    const { error } = schema.validate(data);

    if (error) { next(badRequest(error)) }
    next()
  }
}

export default validator

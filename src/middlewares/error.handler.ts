import { Boom, badRequest } from "@hapi/boom"
import { NextFunction, Request, Response } from "express"
import { ValidationError } from "sequelize"

const logErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  next(err)
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

const sqlErrorHandler = (err: ValidationError, req: Request, res: Response, next: NextFunction) => {
  if (!(err instanceof ValidationError)) { next(err) }

  boomErrorHandler(badRequest(err.errors[0].message), req, res, next)
}

const boomErrorHandler = (err: Boom, req: Request, res: Response, next: NextFunction) => {
  if (!err.isBoom) { next(err) }

  const { output } = err
  res.status(output.statusCode).json(output.payload)
}

export { logErrors, errorHandler, boomErrorHandler, sqlErrorHandler };


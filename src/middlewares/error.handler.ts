import { NextFunction, Request, Response } from "express"

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

export { logErrors, errorHandler };


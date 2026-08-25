import type { NextFunction, Request, Response } from 'express';

function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log({ ...error });
  res.status(500).json({
    data: null,
    error,
    message: error.message || 'Server error: Something went wrong!',
  });
}

export default errorHandler;

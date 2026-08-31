import type { NextFunction, Request, Response } from 'express';

function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { status } = error;
  res.status(status || 500).json({
    data: null,
    error,
    message: error.message || 'Server error: Something went wrong!',
  });
}

export default errorHandler;

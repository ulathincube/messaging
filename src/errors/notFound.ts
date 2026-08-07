import type { Request, Response, NextFunction } from 'express';

function notFound(req: Request, res: Response, next: NextFunction) {
  return res.status(404).json({
    data: null,
    error: new Error('Resource not found'),
    message: 'Resource not found',
  });
}

export default notFound;

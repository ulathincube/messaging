import type { Request, Response, NextFunction } from 'express';

function showServerHealth(req: Request, res: Response, next: NextFunction) {
  return res
    .status(200)
    .json({ error: null, data: null, message: 'Health 100' });
}

export { showServerHealth };

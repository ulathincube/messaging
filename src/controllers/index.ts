import type { Request, Response, NextFunction } from 'express';

function showServerHealth(req: Request, res: Response, next: NextFunction) {
  console.log({ user: req.session?.user || null });
  return res
    .status(200)
    .json({ error: null, data: null, message: 'Health 100' });
}

function wakeServerUp(req: Request, res: Response, next: NextFunction) {
  res.status(200).json({ message: 'Waking up!', error: null, data: null });
}

export { showServerHealth, wakeServerUp };

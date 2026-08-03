import type { Request, Response, NextFunction } from 'express';

async function index(req: Request, res: Response, next: NextFunction) {
  // query into db,
  // send back state,
}

export { index };

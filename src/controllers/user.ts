import { createUser, findUser } from '../models/user.js';
import type { Response, Request, NextFunction } from 'express';

async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await createUser('name', 'email');
    res
      .status(201)
      .json({ message: 'User successfully created', error: null, data: user });
  } catch (error) {
    next(error);
  }
}

async function findUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { query } = req.query;
    //  zod
    const user = await findUser('email');
    if (!user)
      return res
        .status(404)
        .json({ data: null, error: null, message: 'User not found' });

    return res
      .status(200)
      .json({ data: user, error: null, message: 'User found successfully' });
  } catch (error) {
    next(error);
  }
}

export { createUserController, findUserController };

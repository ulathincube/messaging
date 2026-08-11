import { createUser, findUser, findUserRaw } from '../models/user.js';
import type { Response, Request, NextFunction } from 'express';
import { User, Query } from '../lib/zod.js';
import { hashPassword, comparePassword } from '../lib/bcrypt.js';

async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = User.parse(req.body);

    const user = await createUser(email, await hashPassword(password));
    return res
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
    const { query } = Query.parse(req.query);

    console.log(query);
    //  zod
    const user = await findUser(query);
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

async function loginUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = User.parse(req.body);
    const user = await findUserRaw(email);

    if (!user) throw new Error('Invalid login credentials');
    const match = await comparePassword(password, user.password);

    if (!match) throw new Error('Invalid login credentials');

    req.session.user = user.user_id;
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
}

export { createUserController, findUserController, loginUserController };

import {
  createUser,
  findUser,
  findUserRaw,
  findChats,
  findContacts,
  findAllUsers,
  updatePassword,
} from '../models/user.js';
import type { Response, Request, NextFunction } from 'express';
import { User, Query, UsersQuery, UserParam, Password } from '../lib/zod.js';
import { hashPassword, comparePassword } from '../lib/bcrypt.js';

async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = User.parse(req.body);

    const user = await createUser(email, await hashPassword(password));
    return res.status(201).json({
      message: 'User successfully created',
      error: null,
      data: 'User created!',
    });
  } catch (error) {
    next(error);
  }
}

//not in use
async function findUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { query } = Query.parse(req.query);

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
    res.status(200).json({
      data: { email: user.email, userId: user.user_id },
      error: null,
      message: 'User logged in!',
    });
  } catch (error) {
    next(error);
  }
}

async function findUserChatsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { sender, receiver } = UsersQuery.parse(req.query);

  try {
    const chats = await findChats(sender, receiver);

    return res
      .status(200)
      .json({ data: chats, message: 'Chats found!', error: null });
  } catch (error) {
    next(error);
  }
}

// not in use
async function findContactsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email } = UserParam.parse(req.params);
    const contacts = await findContacts(email);
    return res
      .status(200)
      .json({ data: contacts, error: null, message: 'Contacts found' });
  } catch (error) {
    next(error);
  }
}

async function findAllUsersController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const allUsers = await findAllUsers();
    return res
      .status(200)
      .json({ data: allUsers, error: null, message: 'Users found!' });
  } catch (error) {
    next(error);
  }
}

async function startPasswordReset(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email } = UserParam.parse(req.body);
    const user = await findUserRaw(email);
    if (!user) throw new Error('User not found!');
    res.json({ data: true, error: null, message: 'Reset password' });
  } catch (error) {
    next(error);
  }
}

async function finishResetPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email } = UserParam.parse(req.params);
    const { password } = Password.parse(req.body);
    const user = await findUserRaw(email);
    const hashedPassword = await hashPassword(password);
    const updatedUser = await updatePassword({
      email,
      password: hashedPassword,
    });
    res.json({
      data: true,
      error: null,
      message: 'Password reset successful',
    });
  } catch (error) {
    next(error);
  }
}

export {
  createUserController,
  findUserController,
  loginUserController,
  findUserChatsController,
  findContactsController,
  findAllUsersController,
  startPasswordReset,
  finishResetPassword,
};

import type { Request, Response, NextFunction } from 'express';
import { createMessage } from '../models/message.js';

async function createMessageController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const message = await createMessage('message', 'email1', 'email2');
    return res
      .status(201)
      .json({
        message: 'Message sent successfully',
        error: null,
        data: message,
      });
  } catch (error) {
    next(error);
  }
}

export { createMessageController };

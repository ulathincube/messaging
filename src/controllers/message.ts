import type { Request, Response, NextFunction } from 'express';
import { createMessage } from '../models/message.js';
import { Message } from '../lib/zod.js';

async function createMessageController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { text, sender, receiver } = Message.parse(req.body);
    const message = await createMessage(text, sender, receiver);

    return res.status(201).json({
      message: 'Message sent successfully',
      error: null,
      data: 'Message sent!',
    });
  } catch (error) {
    next(error);
  }
}

export { createMessageController };

import { createProfile } from '../models/profile.js';
import type { Request, Response, NextFunction } from 'express';

async function createProfileController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const response = await createProfile('status', 'email');
    return res.status(201).json({
      data: response,
      error: null,
      message: 'Profile created successfully',
    });
  } catch (error) {
    next(error);
  }
}

export { createProfileController };

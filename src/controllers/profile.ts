import { createProfile } from '../models/profile.js';
import type { Request, Response, NextFunction } from 'express';
import { Profile } from '../lib/zod.js';

async function createProfileController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, status } = Profile.parse(req.body);
    const response = await createProfile(email, status);
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

import { createProfile, getStatus } from '../models/profile.js';
import type { Request, Response, NextFunction } from 'express';
import { Profile, UserParam } from '../lib/zod.js';

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

async function getStatusController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email } = UserParam.parse(req.params);
    const response = await getStatus(email);

    return res
      .status(200)
      .json({ data: response, error: null, message: 'Status found!' });
  } catch (error) {
    next(error);
  }
}

export { createProfileController, getStatusController };

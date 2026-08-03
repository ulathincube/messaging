import { createProfileController } from '../controllers/profile.js';
import { Router } from 'express';

const router = Router();

router.post('/', createProfileController);

export default router;

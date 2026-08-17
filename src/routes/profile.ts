import {
  createProfileController,
  getStatusController,
} from '../controllers/profile.js';
import { Router } from 'express';

const router = Router();

router.get('/:email', getStatusController);
router.post('/', createProfileController);

export default router;

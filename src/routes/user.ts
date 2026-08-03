import { Router } from 'express';
import {
  createUserController,
  findUserController,
} from '../controllers/user.js';

const router = Router();

router.get('/search', findUserController);
router.post('/register', createUserController);

export default router;

// ?q=movies&filter=desc

import { Router } from 'express';
import {
  createUserController,
  findUserController,
  loginUserController,
} from '../controllers/user.js';

const router = Router();

router.get('/search', findUserController);
router.post('/register', createUserController);
router.post('/login', loginUserController);

export default router;

// ?q=movies&filter=desc

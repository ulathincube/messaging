import { Router } from 'express';
import {
  createUserController,
  findUserController,
  loginUserController,
  findUserChatsController,
} from '../controllers/user.js';

const router = Router();

router.get('/search', findUserController);
router.post('/register', createUserController);
router.post('/login', loginUserController);
router.get('/chats', findUserChatsController);

export default router;

// ?q=movies&filter=desc

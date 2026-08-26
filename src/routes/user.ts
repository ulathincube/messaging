import { Router } from 'express';
import {
  createUserController,
  findUserController,
  loginUserController,
  findUserChatsController,
  findContactsController,
  findAllUsersController,
  startPasswordReset,
  finishResetPassword,
} from '../controllers/user.js';

const router = Router();

router.get('/search', findUserController);
router.post('/reset/:email', finishResetPassword);
router.post('/reset', startPasswordReset);
router.post('/register', createUserController);
router.post('/login', loginUserController);
router.get('/chats', findUserChatsController);
router.get('/user/:email', findContactsController);
router.get('/', findAllUsersController);

export default router;

// ?q=movies&filter=desc

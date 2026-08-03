import { createMessageController } from '../controllers/message.js';
import { Router } from 'express';

const router = Router();
router.post('/', createMessageController);

export default router;

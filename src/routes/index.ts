import { Router } from 'express';
import { showServerHealth } from '../controllers/index.js';

const router = Router();

router.get('/health', showServerHealth);

export default router;

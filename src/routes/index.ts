import { Router } from 'express';
import { showServerHealth, wakeServerUp } from '../controllers/index.js';

const router = Router();

router.get('/health', showServerHealth);
router.get('/start', wakeServerUp);

export default router;

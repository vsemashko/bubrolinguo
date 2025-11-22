import { Router } from 'express';
import { getLeaderboard } from '../controllers/leaderboard.controller';

const router = Router();

// All routes require authentication (middleware should be added in main app)
router.get('/', getLeaderboard);

export default router;

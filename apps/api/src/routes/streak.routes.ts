import { Router } from 'express';
import {
  getStreakStats,
  recordActivity,
  activateStreakFreeze,
  repairBrokenStreak,
  getStreakRawData,
} from '../controllers/streak.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * All streak routes require authentication
 */
router.use(authenticateToken);

/**
 * GET /api/v1/users/:userId/streak
 * Get current streak statistics
 */
router.get('/users/:userId/streak', async (req, res, next) => {
  try {
    await getStreakStats(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/users/:userId/streak/raw
 * Get raw streak data (for debugging)
 */
router.get('/users/:userId/streak/raw', async (req, res, next) => {
  try {
    await getStreakRawData(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/users/:userId/activity
 * Record user activity (updates streak)
 */
router.post('/users/:userId/activity', async (req, res, next) => {
  try {
    await recordActivity(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/users/:userId/streak/freeze
 * Activate a streak freeze
 */
router.post('/users/:userId/streak/freeze', async (req, res, next) => {
  try {
    await activateStreakFreeze(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/users/:userId/streak/repair
 * Repair a broken streak (costs 2 freezes)
 */
router.post('/users/:userId/streak/repair', async (req, res, next) => {
  try {
    await repairBrokenStreak(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;

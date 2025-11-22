/**
 * Achievement Routes
 *
 * API endpoints for achievement system
 */

import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import {
  getAchievements,
  checkAchievements,
  getStats,
} from '../controllers/achievements.controller';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * GET /api/v1/users/:userId/achievements
 * Get all achievements with unlock status
 */
router.get('/users/:userId/achievements', async (req, res, next) => {
  try {
    await getAchievements(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/v1/users/:userId/achievements/check
 * Check and award new achievements
 */
router.post('/users/:userId/achievements/check', async (req, res, next) => {
  try {
    await checkAchievements(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/users/:userId/achievements/stats
 * Get achievement statistics
 */
router.get('/users/:userId/achievements/stats', async (req, res, next) => {
  try {
    await getStats(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;

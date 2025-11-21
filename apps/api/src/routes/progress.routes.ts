import { Router } from 'express';
import {
  getDashboardData,
  getStatistics,
  getDailyActivities,
  getRecentActivities,
  getAchievements,
  getLeaderboard,
  getLevelProgress,
} from '../controllers/progress.controller';

const router = Router();

/**
 * GET /api/v1/progress/dashboard
 * Get user dashboard data
 */
router.get('/dashboard', getDashboardData);

/**
 * GET /api/v1/progress/statistics
 * Get detailed statistics
 */
router.get('/statistics', getStatistics);

/**
 * GET /api/v1/progress/daily-activities
 * Get daily activities
 */
router.get('/daily-activities', getDailyActivities);

/**
 * GET /api/v1/progress/recent-activities
 * Get recent activities
 */
router.get('/recent-activities', getRecentActivities);

/**
 * GET /api/v1/progress/achievements
 * Get user achievements
 */
router.get('/achievements', getAchievements);

/**
 * GET /api/v1/progress/leaderboard
 * Get leaderboard
 */
router.get('/leaderboard', getLeaderboard);

/**
 * GET /api/v1/progress/levels
 * Get level progress
 */
router.get('/levels', getLevelProgress);

export default router;

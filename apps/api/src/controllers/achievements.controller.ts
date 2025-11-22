/**
 * Achievement Controller
 *
 * Handles HTTP requests for achievement system
 */

import { Request, Response } from 'express';
import {
  getUserAchievements,
  checkAndAwardAchievements,
  getAchievementStats,
} from '../services/achievements.service';
import { AppError } from '../middleware/errorHandler';

/**
 * GET /api/v1/users/:userId/achievements
 * Get all achievements with unlock status for a user
 */
export async function getAchievements(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const authenticatedUserId = (req as any).userId;

    // Verify user is requesting their own data
    if (authenticatedUserId !== userId) {
      throw new AppError('Unauthorized to view these achievements', 403, 'FORBIDDEN');
    }

    const achievements = await getUserAchievements(userId);

    res.json({
      success: true,
      data: {
        unlocked: achievements.unlocked,
        locked: achievements.locked,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    throw error;
  }
}

/**
 * POST /api/v1/users/:userId/achievements/check
 * Check and award any new achievements based on current stats
 */
export async function checkAchievements(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const authenticatedUserId = (req as any).userId;

    // Verify user is updating their own data
    if (authenticatedUserId !== userId) {
      throw new AppError('Unauthorized to check achievements', 403, 'FORBIDDEN');
    }

    const newAchievements = await checkAndAwardAchievements(userId);

    res.json({
      success: true,
      data: {
        newAchievements,
        count: newAchievements.length,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    throw error;
  }
}

/**
 * GET /api/v1/users/:userId/achievements/stats
 * Get achievement statistics for a user
 */
export async function getStats(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const authenticatedUserId = (req as any).userId;

    // Verify user is requesting their own data
    if (authenticatedUserId !== userId) {
      throw new AppError('Unauthorized to view these stats', 403, 'FORBIDDEN');
    }

    const stats = await getAchievementStats(userId);

    res.json({
      success: true,
      data: {
        stats: {
          unlockedCount: parseInt(stats.unlocked_count),
          totalCount: parseInt(stats.total_count),
          xpEarned: parseInt(stats.xp_earned),
          totalXpAvailable: parseInt(stats.total_xp_available),
          completionPercentage: Math.round((parseInt(stats.unlocked_count) / parseInt(stats.total_count)) * 100),
        },
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    throw error;
  }
}

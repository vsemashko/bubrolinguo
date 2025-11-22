import { Request, Response } from 'express';
import {
  calculateStreakStats,
  updateUserActivity,
  useStreakFreeze,
  repairStreak,
  checkStreakAchievements,
  getUserStreakData,
} from '../services/streak.service';
import { logger } from '../utils/logger';
import { AppError } from '../middleware/errorHandler';

/**
 * GET /api/v1/users/:userId/streak
 * Get current streak statistics for a user
 */
export async function getStreakStats(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const authenticatedUserId = (req as any).userId;

    // Verify user is requesting their own data
    if (authenticatedUserId !== userId) {
      throw new AppError('Unauthorized to view this streak data', 403, 'FORBIDDEN');
    }

    const stats = await calculateStreakStats(userId);

    res.json({
      success: true,
      data: stats,
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Error getting streak stats', { error });
    throw error;
  }
}

/**
 * POST /api/v1/users/:userId/activity
 * Update user's last active date (call this when user completes a lesson)
 */
export async function recordActivity(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const authenticatedUserId = (req as any).userId;

    // Verify user is updating their own data
    if (authenticatedUserId !== userId) {
      throw new AppError('Unauthorized to update this user', 403, 'FORBIDDEN');
    }

    logger.info('Recording user activity', { userId });

    // Update activity and get new stats
    const updatedStats = await updateUserActivity(userId);

    // Check for streak achievements
    const newAchievements = await checkStreakAchievements(userId, updatedStats.currentStreak);

    res.json({
      success: true,
      data: {
        stats: updatedStats,
        newAchievements: newAchievements.length > 0 ? newAchievements : undefined,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Error recording activity', { error });
    throw error;
  }
}

/**
 * POST /api/v1/users/:userId/streak/freeze
 * Use a streak freeze to protect the streak
 */
export async function activateStreakFreeze(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const authenticatedUserId = (req as any).userId;

    // Verify user is updating their own data
    if (authenticatedUserId !== userId) {
      throw new AppError('Unauthorized to use streak freeze', 403, 'FORBIDDEN');
    }

    logger.info('Activating streak freeze', { userId });

    const result = await useStreakFreeze(userId);

    // Get updated stats
    const updatedStats = await calculateStreakStats(userId);

    res.json({
      success: true,
      data: {
        ...result,
        stats: updatedStats,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Error activating streak freeze', { error });
    throw error;
  }
}

/**
 * POST /api/v1/users/:userId/streak/repair
 * Repair a broken streak (costs 2 freezes, 24-hour window)
 */
export async function repairBrokenStreak(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const authenticatedUserId = (req as any).userId;

    // Verify user is updating their own data
    if (authenticatedUserId !== userId) {
      throw new AppError('Unauthorized to repair streak', 403, 'FORBIDDEN');
    }

    logger.info('Attempting to repair streak', { userId });

    const result = await repairStreak(userId);

    // Get updated stats
    const updatedStats = await calculateStreakStats(userId);

    res.json({
      success: true,
      data: {
        ...result,
        stats: updatedStats,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Error repairing streak', { error });
    throw error;
  }
}

/**
 * GET /api/v1/users/:userId/streak/raw
 * Get raw streak data from database (for debugging)
 */
export async function getStreakRawData(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const authenticatedUserId = (req as any).userId;

    // Verify user is requesting their own data
    if (authenticatedUserId !== userId) {
      throw new AppError('Unauthorized to view this data', 403, 'FORBIDDEN');
    }

    const rawData = await getUserStreakData(userId);

    res.json({
      success: true,
      data: rawData,
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Error getting raw streak data', { error });
    throw error;
  }
}

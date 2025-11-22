import { query } from '../db/connection';
import { logger } from '../utils/logger';
import { AppError } from '../middleware/errorHandler';

interface StreakData {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: Date | null;
  totalActiveDays: number;
  streakFreezeAvailable: number;
}

interface StreakStats {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  streakFreezeAvailable: number;
  lastActiveDate: Date | null;
  nextMilestone: number;
  daysToNextMilestone: number;
  isActiveToday: boolean;
  streakAtRisk: boolean;
}

/**
 * Calculate the number of days between two dates
 */
function daysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  // Reset time to midnight for accurate day comparison
  firstDate.setHours(0, 0, 0, 0);
  secondDate.setHours(0, 0, 0, 0);

  return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
}

/**
 * Get the next streak milestone
 */
function getNextMilestone(currentStreak: number): number {
  const milestones = [7, 30, 100, 365];
  for (const milestone of milestones) {
    if (currentStreak < milestone) {
      return milestone;
    }
  }
  return 730; // 2 years
}

/**
 * Get current streak data for a user
 */
export async function getUserStreakData(userId: string): Promise<StreakData> {
  try {
    const result = await query(
      `SELECT
        id as "userId",
        streak_count as "currentStreak",
        longest_streak as "longestStreak",
        last_activity_date as "lastActiveDate",
        total_active_days as "totalActiveDays",
        streak_freeze_available as "streakFreezeAvailable"
      FROM users
      WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    return result.rows[0];
  } catch (error) {
    logger.error('Error fetching user streak data', { error, userId });
    throw error;
  }
}

/**
 * Calculate current streak status
 */
export async function calculateStreakStats(userId: string): Promise<StreakStats> {
  try {
    const streakData = await getUserStreakData(userId);
    const today = new Date();

    let isActiveToday = false;
    let streakAtRisk = false;
    let currentStreak = streakData.currentStreak;

    if (streakData.lastActiveDate) {
      const daysSinceActive = daysBetween(today, streakData.lastActiveDate);

      // User is active today
      if (daysSinceActive === 0) {
        isActiveToday = true;
        streakAtRisk = false;
      }
      // User was active yesterday - streak continues
      else if (daysSinceActive === 1) {
        isActiveToday = false;
        streakAtRisk = true; // Need to complete activity today
      }
      // Streak broken (more than 1 day gap)
      else {
        currentStreak = 0;
        streakAtRisk = false;
      }
    }

    const nextMilestone = getNextMilestone(currentStreak);
    const daysToNextMilestone = nextMilestone - currentStreak;

    return {
      currentStreak,
      longestStreak: streakData.longestStreak,
      totalActiveDays: streakData.totalActiveDays,
      streakFreezeAvailable: streakData.streakFreezeAvailable,
      lastActiveDate: streakData.lastActiveDate,
      nextMilestone,
      daysToNextMilestone,
      isActiveToday,
      streakAtRisk,
    };
  } catch (error) {
    logger.error('Error calculating streak stats', { error, userId });
    throw error;
  }
}

/**
 * Update user's last active date and streak count
 */
export async function updateUserActivity(userId: string): Promise<StreakStats> {
  try {
    const streakData = await getUserStreakData(userId);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight

    let newStreakCount = streakData.currentStreak;
    let incrementActiveDays = false;

    // Check if user was already active today
    if (streakData.lastActiveDate) {
      const lastActiveDate = new Date(streakData.lastActiveDate);
      lastActiveDate.setHours(0, 0, 0, 0);
      const daysSinceActive = daysBetween(today, lastActiveDate);

      if (daysSinceActive === 0) {
        // Already active today, no change needed
        logger.info('User already active today', { userId });
      } else if (daysSinceActive === 1) {
        // Consecutive day - increment streak
        newStreakCount += 1;
        incrementActiveDays = true;
        logger.info('Streak incremented', { userId, newStreak: newStreakCount });
      } else {
        // Streak broken - reset to 1
        newStreakCount = 1;
        incrementActiveDays = true;
        logger.info('Streak reset', { userId, daysSinceActive });
      }
    } else {
      // First time tracking - start streak at 1
      newStreakCount = 1;
      incrementActiveDays = true;
      logger.info('Starting new streak', { userId });
    }

    // Update longest streak if current is higher
    const newLongestStreak = Math.max(streakData.longestStreak, newStreakCount);

    // Update database
    await query(
      `UPDATE users
       SET
         last_activity_date = $1,
         streak_count = $2,
         longest_streak = $3,
         total_active_days = total_active_days + $4,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $5`,
      [today, newStreakCount, newLongestStreak, incrementActiveDays ? 1 : 0, userId]
    );

    logger.info('User activity updated', {
      userId,
      newStreakCount,
      newLongestStreak
    });

    // Return updated stats
    return calculateStreakStats(userId);
  } catch (error) {
    logger.error('Error updating user activity', { error, userId });
    throw error;
  }
}

/**
 * Use a streak freeze to protect the streak
 */
export async function useStreakFreeze(userId: string): Promise<{ success: boolean; message: string }> {
  try {
    const streakData = await getUserStreakData(userId);

    if (streakData.streakFreezeAvailable <= 0) {
      throw new AppError('No streak freezes available', 400, 'NO_FREEZES_AVAILABLE');
    }

    // Decrement streak freeze count
    await query(
      `UPDATE users
       SET streak_freeze_available = streak_freeze_available - 1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [userId]
    );

    logger.info('Streak freeze used', {
      userId,
      remainingFreezes: streakData.streakFreezeAvailable - 1
    });

    return {
      success: true,
      message: 'Streak freeze activated successfully',
    };
  } catch (error) {
    logger.error('Error using streak freeze', { error, userId });
    throw error;
  }
}

/**
 * Award streak freeze (typically from premium subscription or achievement)
 */
export async function awardStreakFreeze(userId: string, count: number = 1): Promise<void> {
  try {
    await query(
      `UPDATE users
       SET streak_freeze_available = streak_freeze_available + $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [count, userId]
    );

    logger.info('Streak freeze awarded', { userId, count });
  } catch (error) {
    logger.error('Error awarding streak freeze', { error, userId });
    throw error;
  }
}

/**
 * Repair a broken streak (24-hour window after break)
 */
export async function repairStreak(userId: string): Promise<{ success: boolean; message: string }> {
  try {
    const streakData = await getUserStreakData(userId);
    const today = new Date();

    if (!streakData.lastActiveDate) {
      throw new AppError('No streak to repair', 400, 'NO_STREAK_TO_REPAIR');
    }

    const daysSinceActive = daysBetween(today, streakData.lastActiveDate);

    // Can only repair if exactly 2 days have passed (1 day missed)
    if (daysSinceActive !== 2) {
      throw new AppError('Streak can only be repaired within 24 hours of breaking', 400, 'REPAIR_WINDOW_EXPIRED');
    }

    // Check if user has enough streak freezes (repair costs 2 freezes)
    if (streakData.streakFreezeAvailable < 2) {
      throw new AppError('Not enough streak freezes (repair costs 2)', 400, 'INSUFFICIENT_FREEZES');
    }

    // Restore previous streak and use 2 freezes
    await query(
      `UPDATE users
       SET
         streak_count = $1,
         streak_freeze_available = streak_freeze_available - 2,
         last_activity_date = $2,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $3`,
      [streakData.currentStreak, today, userId]
    );

    logger.info('Streak repaired', {
      userId,
      restoredStreak: streakData.currentStreak,
      freezesUsed: 2
    });

    return {
      success: true,
      message: `Streak repaired! Your ${streakData.currentStreak}-day streak has been restored.`,
    };
  } catch (error) {
    logger.error('Error repairing streak', { error, userId });
    throw error;
  }
}

/**
 * Check for streak achievements and return any newly unlocked
 */
export async function checkStreakAchievements(userId: string, streakCount: number): Promise<string[]> {
  try {
    const streakMilestones = [
      { days: 7, achievementKey: 'week_warrior' },
      { days: 30, achievementKey: 'month_master' },
      { days: 100, achievementKey: 'century_club' },
      { days: 365, achievementKey: 'year_champion' },
    ];

    const newAchievements: string[] = [];

    for (const milestone of streakMilestones) {
      if (streakCount === milestone.days) {
        // Check if user already has this achievement
        const existingAchievement = await query(
          `SELECT ua.id
           FROM user_achievements ua
           JOIN achievements a ON ua.achievement_id = a.id
           WHERE ua.user_id = $1 AND a.key = $2`,
          [userId, milestone.achievementKey]
        );

        if (existingAchievement.rows.length === 0) {
          // Award the achievement
          const achievementResult = await query(
            `SELECT id, xp_reward FROM achievements WHERE key = $1`,
            [milestone.achievementKey]
          );

          if (achievementResult.rows.length > 0) {
            const achievement = achievementResult.rows[0];

            await query(
              `INSERT INTO user_achievements (user_id, achievement_id, unlocked_at)
               VALUES ($1, $2, CURRENT_TIMESTAMP)`,
              [userId, achievement.id]
            );

            // Award XP
            await query(
              `UPDATE users
               SET total_xp = total_xp + $1
               WHERE id = $2`,
              [achievement.xp_reward, userId]
            );

            newAchievements.push(milestone.achievementKey);
            logger.info('Streak achievement unlocked', {
              userId,
              achievement: milestone.achievementKey,
              xpAwarded: achievement.xp_reward
            });
          }
        }
      }
    }

    return newAchievements;
  } catch (error) {
    logger.error('Error checking streak achievements', { error, userId });
    return []; // Don't throw - achievements are nice-to-have
  }
}

import { Request, Response } from 'express';
import { query } from '../db/connection';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

/**
 * Get dashboard data (overview)
 */
export async function getDashboardData(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;

    // Get user data
    const userResult = await query(
      `SELECT id, email, display_name, interface_language, current_level,
        total_xp, streak_count, longest_streak, last_activity_date
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    const user = userResult.rows[0];

    // Get lessons completed
    const lessonsResult = await query(
      `SELECT COUNT(*) as completed
       FROM user_progress
       WHERE user_id = $1 AND status = 'completed'`,
      [userId]
    );

    // Get vocabulary learned
    const vocabResult = await query(
      `SELECT COUNT(*) as learned
       FROM user_vocabulary
       WHERE user_id = $1`,
      [userId]
    );

    // Get words to review today
    const reviewResult = await query(
      `SELECT COUNT(*) as to_review
       FROM user_vocabulary
       WHERE user_id = $1 AND next_review_date <= CURRENT_DATE`,
      [userId]
    );

    // Get recent activity (last 5)
    const activityResult = await query(
      `SELECT up.lesson_id, up.completed_at, up.xp_earned,
        l.title_en, l.title_ru, l.level
       FROM user_progress up
       JOIN lessons l ON up.lesson_id = l.id
       WHERE up.user_id = $1 AND up.status = 'completed'
       ORDER BY up.completed_at DESC
       LIMIT 5`,
      [userId]
    );

    // Calculate next milestone (level progression)
    const levelXpThresholds: { [key: string]: number } = {
      A1: 500,
      A2: 1500,
      B1: 3000,
      B2: 5000,
      C1: 8000,
    };

    const currentLevel = user.current_level;
    const totalXp = user.total_xp;
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
    const currentLevelIndex = levels.indexOf(currentLevel);
    const nextLevel = currentLevelIndex < levels.length - 1 ? levels[currentLevelIndex + 1] : null;

    let nextMilestone = null;
    if (nextLevel) {
      const targetXp = levelXpThresholds[nextLevel];
      const previousXp = currentLevelIndex > 0 ? levelXpThresholds[currentLevel] : 0;
      const progress = (totalXp - previousXp) / (targetXp - previousXp);

      nextMilestone = {
        type: 'level',
        target: nextLevel,
        progress: Math.min(progress, 1),
        currentXp: totalXp,
        targetXp: targetXp,
      };
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          displayName: user.display_name,
          currentLevel: user.current_level,
          totalXp: user.total_xp,
          streakCount: user.streak_count,
        },
        stats: {
          lessonsCompleted: parseInt(lessonsResult.rows[0].completed),
          vocabularyLearned: parseInt(vocabResult.rows[0].learned),
          wordsToReview: parseInt(reviewResult.rows[0].to_review),
          nextMilestone,
        },
        recentActivity: activityResult.rows.map((row) => ({
          type: 'lesson_completed',
          lessonId: row.lesson_id,
          lessonTitle: user.interface_language === 'ru' ? row.title_ru : row.title_en,
          level: row.level,
          timestamp: row.completed_at,
          xpEarned: row.xp_earned,
        })),
      },
    });
  } catch (error) {
    logger.error('Error getting dashboard data', { error });
    throw error;
  }
}

/**
 * Get detailed statistics
 */
export async function getStatistics(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;

    // Get total time spent
    const timeResult = await query(
      `SELECT COALESCE(SUM(time_spent_seconds), 0) as total_time,
        COALESCE(AVG(time_spent_seconds), 0) as avg_time,
        COUNT(*) as session_count
       FROM user_progress
       WHERE user_id = $1 AND status = 'completed'`,
      [userId]
    );

    // Get lessons completed by level
    const lessonsByLevelResult = await query(
      `SELECT l.level, COUNT(*) as count
       FROM user_progress up
       JOIN lessons l ON up.lesson_id = l.id
       WHERE up.user_id = $1 AND up.status = 'completed'
       GROUP BY l.level
       ORDER BY l.level`,
      [userId]
    );

    const lessonsCompletedByLevel: { [key: string]: number } = {};
    lessonsByLevelResult.rows.forEach((row) => {
      lessonsCompletedByLevel[row.level] = parseInt(row.count);
    });

    // Get vocabulary mastery breakdown
    const vocabMasteryResult = await query(
      `SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'new') as new,
        COUNT(*) FILTER (WHERE status = 'learning') as learning,
        COUNT(*) FILTER (WHERE status = 'mastered') as mastered,
        COUNT(*) FILTER (WHERE status = 'relearning') as relearning
       FROM user_vocabulary
       WHERE user_id = $1`,
      [userId]
    );

    const vocabMastery = vocabMasteryResult.rows[0];

    // Get weak areas (topics with low accuracy)
    // This would require more detailed exercise tracking
    // For now, return empty array
    const weakAreas: any[] = [];

    // Get exercise type performance
    const exercisePerformanceResult = await query(
      `SELECT
        exercise_type,
        COUNT(*) as attempts,
        AVG(score) as avg_score
       FROM user_exercise_results
       WHERE user_id = $1
       GROUP BY exercise_type`,
      [userId]
    );

    res.json({
      success: true,
      data: {
        totalTimeSpent: parseInt(timeResult.rows[0].total_time),
        averageSessionDuration: Math.round(parseFloat(timeResult.rows[0].avg_time)),
        sessionCount: parseInt(timeResult.rows[0].session_count),
        lessonsCompletedByLevel,
        vocabularyMastery: {
          total: parseInt(vocabMastery.total || 0),
          mastered: parseInt(vocabMastery.mastered || 0),
          learning: parseInt(vocabMastery.learning || 0),
          new: parseInt(vocabMastery.new || 0),
          relearning: parseInt(vocabMastery.relearning || 0),
        },
        exercisePerformance: exercisePerformanceResult.rows.map((row) => ({
          type: row.exercise_type,
          attempts: parseInt(row.attempts),
          averageScore: parseFloat(row.avg_score),
        })),
        weakAreas,
      },
    });
  } catch (error) {
    logger.error('Error getting statistics', { error });
    throw error;
  }
}

/**
 * Get daily activities
 */
export async function getDailyActivities(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const days = parseInt(req.query.days as string) || 30;

    const result = await query(
      `SELECT
        activity_date,
        lessons_completed,
        exercises_completed,
        words_reviewed,
        xp_earned,
        time_spent_seconds
       FROM daily_activity
       WHERE user_id = $1
       AND activity_date >= CURRENT_DATE - $2
       ORDER BY activity_date DESC`,
      [userId, days]
    );

    const activities = result.rows.map((row) => ({
      date: row.activity_date,
      lessonsCompleted: row.lessons_completed,
      exercisesCompleted: row.exercises_completed,
      wordsReviewed: row.words_reviewed,
      xpEarned: row.xp_earned,
      timeSpentSeconds: row.time_spent_seconds,
    }));

    res.json({
      success: true,
      data: { activities },
    });
  } catch (error) {
    logger.error('Error getting daily activities', { error });
    throw error;
  }
}

/**
 * Get recent activities
 */
export async function getRecentActivities(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const limit = parseInt(req.query.limit as string) || 10;

    // Get recent lesson completions
    const lessonsResult = await query(
      `SELECT
        'lesson_completed' as type,
        up.lesson_id as reference_id,
        l.title_en, l.title_ru, l.level,
        up.completed_at as timestamp,
        up.xp_earned
       FROM user_progress up
       JOIN lessons l ON up.lesson_id = l.id
       WHERE up.user_id = $1 AND up.status = 'completed'
       ORDER BY up.completed_at DESC
       LIMIT $2`,
      [userId, limit]
    );

    // Get recent achievement unlocks
    const achievementsResult = await query(
      `SELECT
        'achievement_unlocked' as type,
        ua.achievement_id as reference_id,
        a.name_en, a.name_ru, a.icon,
        ua.unlocked_at as timestamp
       FROM user_achievements ua
       JOIN achievements a ON ua.achievement_id = a.id
       WHERE ua.user_id = $1
       ORDER BY ua.unlocked_at DESC
       LIMIT $2`,
      [userId, Math.min(limit, 5)]
    );

    // Combine and sort by timestamp
    const activities = [
      ...lessonsResult.rows.map((row) => ({
        type: row.type,
        referenceId: row.reference_id,
        title: row.title_en,
        titleRu: row.title_ru,
        level: row.level,
        timestamp: row.timestamp,
        xpEarned: row.xp_earned,
      })),
      ...achievementsResult.rows.map((row) => ({
        type: row.type,
        referenceId: row.reference_id,
        title: row.name_en,
        titleRu: row.name_ru,
        icon: row.icon,
        timestamp: row.timestamp,
      })),
    ]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);

    res.json({
      success: true,
      data: { activities },
    });
  } catch (error) {
    logger.error('Error getting recent activities', { error });
    throw error;
  }
}

/**
 * Get user achievements
 */
export async function getAchievements(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;

    // Get all achievements with user progress
    const result = await query(
      `SELECT
        a.id, a.code, a.title_en, a.title_ru, a.description_en, a.description_ru,
        a.icon_url, a.badge_color, a.requirement_type, a.requirement_value, a.xp_reward,
        ua.unlocked_at
       FROM achievements a
       LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = $1
       ORDER BY a.requirement_type, a.requirement_value`,
      [userId]
    );

    const achievements = result.rows.map((row) => ({
      id: row.id,
      code: row.code,
      titleEn: row.title_en,
      titleRu: row.title_ru,
      descriptionEn: row.description_en,
      descriptionRu: row.description_ru,
      iconUrl: row.icon_url,
      badgeColor: row.badge_color,
      requirementType: row.requirement_type,
      requirementValue: row.requirement_value,
      xpReward: row.xp_reward,
      unlocked: row.unlocked_at !== null,
      unlockedAt: row.unlocked_at,
    }));

    res.json({
      success: true,
      data: { achievements },
    });
  } catch (error) {
    logger.error('Error getting achievements', { error });
    throw error;
  }
}

/**
 * Get leaderboard
 */
export async function getLeaderboard(req: Request, res: Response) {
  try {
    const type = (req.query.type as string) || 'xp';
    const limit = parseInt(req.query.limit as string) || 50;

    let orderBy = 'total_xp DESC';
    if (type === 'streak') {
      orderBy = 'streak_count DESC, total_xp DESC';
    }

    const result = await query(
      `SELECT
        id, display_name, current_level,
        total_xp, streak_count
       FROM users
       WHERE total_xp > 0
       ORDER BY ${orderBy}
       LIMIT $1`,
      [limit]
    );

    const leaderboard = result.rows.map((row, index) => ({
      rank: index + 1,
      userId: row.id,
      displayName: row.display_name,
      currentLevel: row.current_level,
      totalXp: row.total_xp,
      streakCount: row.streak_count,
    }));

    res.json({
      success: true,
      data: { leaderboard },
    });
  } catch (error) {
    logger.error('Error getting leaderboard', { error });
    throw error;
  }
}

/**
 * Get level progress
 */
export async function getLevelProgress(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;

    // Get user's current level and XP
    const userResult = await query(
      `SELECT current_level, total_xp
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    const user = userResult.rows[0];

    // Define level thresholds
    const levels = [
      { level: 'A1', minXp: 0, maxXp: 500, name: 'Beginner' },
      { level: 'A2', minXp: 500, maxXp: 1500, name: 'Elementary' },
      { level: 'B1', minXp: 1500, maxXp: 3000, name: 'Intermediate' },
      { level: 'B2', minXp: 3000, maxXp: 5000, name: 'Upper Intermediate' },
      { level: 'C1', minXp: 5000, maxXp: 8000, name: 'Advanced' },
    ];

    const currentLevelIndex = levels.findIndex((l) => l.level === user.current_level);
    const currentLevelData = levels[currentLevelIndex];
    const progress = currentLevelData
      ? (user.total_xp - currentLevelData.minXp) / (currentLevelData.maxXp - currentLevelData.minXp)
      : 0;

    res.json({
      success: true,
      data: {
        currentLevel: user.current_level,
        totalXp: user.total_xp,
        progress: Math.min(Math.max(progress, 0), 1),
        levels: levels.map((level) => ({
          ...level,
          unlocked: user.total_xp >= level.minXp,
          completed: user.total_xp >= level.maxXp,
        })),
      },
    });
  } catch (error) {
    logger.error('Error getting level progress', { error });
    throw error;
  }
}

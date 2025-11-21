import { Request, Response } from 'express';
import { query, transaction } from '../db/connection';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

/**
 * Get all lessons with optional filtering
 */
export async function getLessons(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { level, status } = req.query;

    let whereClause = 'WHERE l.is_published = true';
    const params: any[] = [];
    let paramCount = 1;

    if (level && level !== 'all') {
      whereClause += ` AND l.level = $${paramCount}`;
      params.push(level);
      paramCount++;
    }

    const result = await query(
      `SELECT
        l.id, l.lesson_number, l.level, l.unit_number, l.order_in_unit,
        l.title_en, l.title_ru, l.description_en, l.description_ru,
        l.exercises, l.xp_reward, l.estimated_duration,
        up.status as user_status, up.score, up.completed_at,
        CASE
          WHEN l.lesson_number = 1 THEN false
          WHEN EXISTS (
            SELECT 1 FROM user_progress up2
            WHERE up2.user_id = $${paramCount}
            AND up2.lesson_id IN (
              SELECT id FROM lessons WHERE lesson_number = l.lesson_number - 1
            )
            AND up2.status = 'completed'
          ) THEN false
          ELSE true
        END as is_locked
      FROM lessons l
      LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = $${paramCount}
      ${whereClause}
      ORDER BY l.lesson_number ASC`,
      [...params, userId]
    );

    const lessons = result.rows.map((row) => ({
      id: row.id,
      lessonNumber: row.lesson_number,
      level: row.level,
      unitNumber: row.unit_number,
      orderInUnit: row.order_in_unit,
      titleEn: row.title_en,
      titleRu: row.title_ru,
      descriptionEn: row.description_en,
      descriptionRu: row.description_ru,
      xpReward: row.xp_reward,
      estimatedDuration: row.estimated_duration,
      exerciseCount: row.exercises.length,
      userProgress: row.user_status ? {
        status: row.user_status,
        score: row.score,
        completedAt: row.completed_at,
      } : undefined,
      isLocked: row.is_locked,
    }));

    // Apply status filter if provided
    let filteredLessons = lessons;
    if (status && status !== 'all') {
      filteredLessons = lessons.filter((lesson) => {
        const lessonStatus = lesson.userProgress?.status || 'not_started';
        return lessonStatus === status;
      });
    }

    res.json({
      success: true,
      data: {
        lessons: filteredLessons,
        total: filteredLessons.length,
      },
    });
  } catch (error) {
    logger.error('Error getting lessons', { error });
    throw error;
  }
}

/**
 * Get lesson by ID
 */
export async function getLessonById(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;

    const result = await query(
      `SELECT
        l.*,
        up.status as user_status, up.score, up.completed_at
      FROM lessons l
      LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = $1
      WHERE l.id = $2 AND l.is_published = true`,
      [userId, id]
    );

    if (result.rows.length === 0) {
      throw new AppError('Lesson not found', 404, 'LESSON_NOT_FOUND');
    }

    const row = result.rows[0];
    const lesson = {
      id: row.id,
      lesson_number: row.lesson_number,
      level: row.level,
      unit_number: row.unit_number,
      order_in_unit: row.order_in_unit,
      title_en: row.title_en,
      title_ru: row.title_ru,
      description_en: row.description_en,
      description_ru: row.description_ru,
      exercises: row.exercises,
      target_words: row.target_words,
      grammar_topics: row.grammar_topics,
      xp_reward: row.xp_reward,
      estimated_duration: row.estimated_duration,
      userProgress: row.user_status ? {
        status: row.user_status,
        score: row.score,
        completedAt: row.completed_at,
      } : undefined,
    };

    res.json({
      success: true,
      data: { lesson },
    });
  } catch (error) {
    logger.error('Error getting lesson', { error });
    throw error;
  }
}

/**
 * Submit lesson result
 */
export async function submitLessonResult(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    const { score, xp_earned, mistakes_count, time_spent, exercise_results } = req.body;

    await transaction(async (client) => {
      // Insert or update user progress
      await client.query(
        `INSERT INTO user_progress (
          user_id, lesson_id, status, score, xp_earned, mistakes_count,
          time_spent_seconds, exercise_results, completed_at, first_attempted_at,
          last_attempted_at, attempt_number
        )
        VALUES ($1, $2, 'completed', $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1)
        ON CONFLICT (user_id, lesson_id, attempt_number)
        DO UPDATE SET
          status = 'completed',
          score = $3,
          xp_earned = $4,
          mistakes_count = $5,
          time_spent_seconds = $6,
          exercise_results = $7,
          completed_at = CURRENT_TIMESTAMP,
          last_attempted_at = CURRENT_TIMESTAMP`,
        [userId, id, score, xp_earned, mistakes_count, time_spent, JSON.stringify(exercise_results)]
      );

      // Update user XP
      await client.query(
        `UPDATE users SET
          total_xp = total_xp + $1,
          last_activity_date = CURRENT_DATE
         WHERE id = $2`,
        [xp_earned, userId]
      );

      // Insert daily activity
      await client.query(
        `INSERT INTO daily_activity (user_id, activity_date, xp_earned, lessons_completed, time_spent_seconds)
         VALUES ($1, CURRENT_DATE, $2, 1, $3)
         ON CONFLICT (user_id, activity_date)
         DO UPDATE SET
           xp_earned = daily_activity.xp_earned + $2,
           lessons_completed = daily_activity.lessons_completed + 1,
           time_spent_seconds = daily_activity.time_spent_seconds + $3`,
        [userId, xp_earned, time_spent]
      );

      // Check for achievements (simplified - just check lesson completion count)
      const progressResult = await client.query(
        `SELECT COUNT(*) as completed FROM user_progress WHERE user_id = $1 AND status = 'completed'`,
        [userId]
      );

      const completedCount = parseInt(progressResult.rows[0].completed);
      const achievements_unlocked: string[] = [];

      // First lesson achievement
      if (completedCount === 1) {
        const achievementResult = await client.query(
          `SELECT id FROM achievements WHERE code = 'first_lesson'`
        );
        if (achievementResult.rows.length > 0) {
          const achievementId = achievementResult.rows[0].id;
          await client.query(
            `INSERT INTO user_achievements (user_id, achievement_id)
             VALUES ($1, $2)
             ON CONFLICT DO NOTHING`,
            [userId, achievementId]
          );
          achievements_unlocked.push('first_lesson');
        }
      }

      res.json({
        success: true,
        data: {
          xp_earned,
          achievements_unlocked,
          level_up: false, // TODO: Implement level up logic
        },
      });
    });
  } catch (error) {
    logger.error('Error submitting lesson result', { error });
    throw error;
  }
}

/**
 * Get next recommended lesson
 */
export async function getNextLesson(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;

    // Get the next incomplete lesson
    const result = await query(
      `SELECT l.*
       FROM lessons l
       LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = $1
       WHERE l.is_published = true
       AND (up.status IS NULL OR up.status != 'completed')
       ORDER BY l.lesson_number ASC
       LIMIT 1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.json({
        success: true,
        data: { lesson: null, message: 'All lessons completed!' },
      });
    }

    const row = result.rows[0];
    const lesson = {
      id: row.id,
      lesson_number: row.lesson_number,
      level: row.level,
      title_en: row.title_en,
      title_ru: row.title_ru,
      description_en: row.description_en,
      description_ru: row.description_ru,
      xp_reward: row.xp_reward,
    };

    return res.json({
      success: true,
      data: { lesson },
    });
  } catch (error) {
    logger.error('Error getting next lesson', { error });
    throw error;
  }
}

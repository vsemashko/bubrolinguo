import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { query } from '../db/connection';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

/**
 * Get current user profile
 */
export async function getCurrentUser(req: Request, res: Response) {
  try {
    // User ID should be attached to request by auth middleware
    const userId = (req as any).userId;

    if (!userId) {
      throw new AppError('User not authenticated', 401, 'UNAUTHORIZED');
    }

    const result = await query(
      `SELECT
        id, email, display_name, interface_language, current_level,
        total_xp, streak_count, longest_streak, subscription_tier,
        daily_goal, email_notifications, push_notifications,
        created_at, last_login_at
      FROM users
      WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    const user = result.rows[0];

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          displayName: user.display_name,
          interfaceLanguage: user.interface_language,
          currentLevel: user.current_level,
          totalXp: user.total_xp,
          streakCount: user.streak_count,
          longestStreak: user.longest_streak,
          subscriptionTier: user.subscription_tier,
          dailyGoal: user.daily_goal,
          emailNotifications: user.email_notifications,
          pushNotifications: user.push_notifications,
          createdAt: user.created_at,
          lastLoginAt: user.last_login_at,
        },
      },
    });
  } catch (error) {
    logger.error('Error getting current user', { error });
    throw error;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { displayName, interfaceLanguage } = req.body;

    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (displayName !== undefined) {
      updates.push(`display_name = $${paramCount++}`);
      values.push(displayName);
    }

    if (interfaceLanguage !== undefined) {
      updates.push(`interface_language = $${paramCount++}`);
      values.push(interfaceLanguage);
    }

    if (updates.length === 0) {
      throw new AppError('No updates provided', 400, 'NO_UPDATES');
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(userId);

    const result = await query(
      `UPDATE users
       SET ${updates.join(', ')}
       WHERE id = $${paramCount}
       RETURNING id, email, display_name, interface_language, current_level, total_xp`,
      values
    );

    res.json({
      success: true,
      data: {
        user: {
          id: result.rows[0].id,
          email: result.rows[0].email,
          displayName: result.rows[0].display_name,
          interfaceLanguage: result.rows[0].interface_language,
          currentLevel: result.rows[0].current_level,
          totalXp: result.rows[0].total_xp,
        },
      },
    });
  } catch (error) {
    logger.error('Error updating user profile', { error });
    throw error;
  }
}

/**
 * Update user settings
 */
export async function updateUserSettings(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const {
      dailyGoal,
      emailNotifications,
      pushNotifications,
      interfaceLanguage,
    } = req.body;

    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (dailyGoal !== undefined) {
      updates.push(`daily_goal = $${paramCount++}`);
      values.push(dailyGoal);
    }

    if (emailNotifications !== undefined) {
      updates.push(`email_notifications = $${paramCount++}`);
      values.push(emailNotifications);
    }

    if (pushNotifications !== undefined) {
      updates.push(`push_notifications = $${paramCount++}`);
      values.push(pushNotifications);
    }

    if (interfaceLanguage !== undefined) {
      updates.push(`interface_language = $${paramCount++}`);
      values.push(interfaceLanguage);
    }

    if (updates.length === 0) {
      throw new AppError('No settings provided', 400, 'NO_SETTINGS');
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(userId);

    await query(
      `UPDATE users
       SET ${updates.join(', ')}
       WHERE id = $${paramCount}`,
      values
    );

    res.json({
      success: true,
      data: {
        message: 'Settings updated successfully',
      },
    });
  } catch (error) {
    logger.error('Error updating user settings', { error });
    throw error;
  }
}

/**
 * Get user statistics
 */
export async function getUserStats(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;

    // Get basic stats
    const userResult = await query(
      `SELECT
        total_xp, current_level, streak_count, longest_streak,
        last_activity_date
      FROM users
      WHERE id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    // Get lessons completed
    const lessonsResult = await query(
      `SELECT COUNT(*) as completed
       FROM user_progress
       WHERE user_id = $1 AND status = 'completed'`,
      [userId]
    );

    // Get total lessons
    const totalLessonsResult = await query(
      `SELECT COUNT(*) as total FROM lessons WHERE is_published = true`
    );

    // Get vocabulary stats
    const vocabResult = await query(
      `SELECT
        COUNT(*) as total_learned,
        COUNT(*) FILTER (WHERE status = 'mastered') as mastered,
        AVG(CASE WHEN times_reviewed > 0
          THEN (times_correct::float / times_reviewed::float) * 100
          ELSE 0 END) as avg_accuracy
       FROM user_vocabulary
       WHERE user_id = $1`,
      [userId]
    );

    // Get total time spent
    const timeResult = await query(
      `SELECT COALESCE(SUM(time_spent_seconds), 0) as total_time
       FROM user_progress
       WHERE user_id = $1`,
      [userId]
    );

    const user = userResult.rows[0];
    const stats = {
      totalXp: user.total_xp,
      currentLevel: user.current_level,
      streakCount: user.streak_count,
      longestStreak: user.longest_streak,
      lessonsCompleted: parseInt(lessonsResult.rows[0].completed),
      totalLessons: parseInt(totalLessonsResult.rows[0].total),
      wordsLearned: parseInt(vocabResult.rows[0].total_learned || 0),
      wordsMastered: parseInt(vocabResult.rows[0].mastered || 0),
      averageAccuracy: parseFloat(vocabResult.rows[0].avg_accuracy || 0),
      totalTimeSpent: parseInt(timeResult.rows[0].total_time),
      lastActivityDate: user.last_activity_date,
    };

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    logger.error('Error getting user stats', { error });
    throw error;
  }
}

/**
 * Change user password
 */
export async function changePassword(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      throw new AppError('Current password and new password are required', 400, 'MISSING_FIELDS');
    }

    if (newPassword.length < 8) {
      throw new AppError('New password must be at least 8 characters', 400, 'PASSWORD_TOO_SHORT');
    }

    // Get current password hash
    const userResult = await query(
      'SELECT password_hash FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, userResult.rows[0].password_hash);
    if (!isValid) {
      throw new AppError('Current password is incorrect', 401, 'INVALID_PASSWORD');
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update password
    await query(
      `UPDATE users
       SET password_hash = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [newPasswordHash, userId]
    );

    logger.info('Password changed successfully', { userId });

    res.json({
      success: true,
      data: {
        message: 'Password changed successfully',
      },
    });
  } catch (error) {
    logger.error('Error changing password', { error });
    throw error;
  }
}

/**
 * Delete user account
 */
export async function deleteAccount(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { password, confirmation } = req.body;

    if (!password) {
      throw new AppError('Password is required to delete account', 400, 'PASSWORD_REQUIRED');
    }

    if (confirmation !== 'DELETE') {
      throw new AppError('Confirmation text must be "DELETE"', 400, 'INVALID_CONFIRMATION');
    }

    // Verify password
    const userResult = await query(
      'SELECT password_hash, email FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    const isValid = await bcrypt.compare(password, userResult.rows[0].password_hash);
    if (!isValid) {
      throw new AppError('Incorrect password', 401, 'INVALID_PASSWORD');
    }

    // Delete user data (cascade will handle related records)
    await query('DELETE FROM users WHERE id = $1', [userId]);

    logger.info('User account deleted', {
      userId,
      email: userResult.rows[0].email
    });

    res.json({
      success: true,
      data: {
        message: 'Account deleted successfully',
      },
    });
  } catch (error) {
    logger.error('Error deleting account', { error });
    throw error;
  }
}

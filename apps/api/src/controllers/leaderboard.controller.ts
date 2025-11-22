import { Request, Response } from 'express';
import { query } from '../db/connection';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

/**
 * Get leaderboard rankings
 * Query params:
 * - period: 'daily' | 'weekly' | 'monthly' | 'allTime'
 * - scope: 'global' | 'friends'
 * - limit: number (default 100)
 */
export async function getLeaderboard(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const period = (req.query.period as string) || 'weekly';
    const scope = (req.query.scope as string) || 'global';
    const limit = parseInt(req.query.limit as string) || 100;

    // Validate parameters
    const validPeriods = ['daily', 'weekly', 'monthly', 'allTime'];
    const validScopes = ['global', 'friends'];

    if (!validPeriods.includes(period)) {
      throw new AppError('Invalid period parameter', 400, 'INVALID_PERIOD');
    }

    if (!validScopes.includes(scope)) {
      throw new AppError('Invalid scope parameter', 400, 'INVALID_SCOPE');
    }

    // Build query based on period
    let xpColumn = 'total_xp';
    let timeFilter = '';

    switch (period) {
      case 'daily':
        // For daily, we would need a daily_xp column or calculate from activity
        // For now, use last_activity_date as a filter
        timeFilter = "AND last_activity_date >= CURRENT_DATE";
        break;
      case 'weekly':
        timeFilter = "AND last_activity_date >= CURRENT_DATE - INTERVAL '7 days'";
        break;
      case 'monthly':
        timeFilter = "AND last_activity_date >= CURRENT_DATE - INTERVAL '30 days'";
        break;
      case 'allTime':
        // No time filter
        break;
    }

    // TODO: Implement friends scope (requires friends table)
    // For now, only global scope is supported
    if (scope === 'friends') {
      // Return empty leaderboard for friends (not yet implemented)
      return res.json({
        success: true,
        data: {
          leaderboard: [],
          currentUserRank: null,
          period,
          scope,
        },
      });
    }

    // Get top users
    const leaderboardQuery = `
      SELECT
        u.id,
        u.display_name,
        u.${xpColumn},
        u.current_level,
        u.streak_count,
        ROW_NUMBER() OVER (ORDER BY u.${xpColumn} DESC) as rank,
        (u.id = $1) as is_current_user
      FROM users u
      WHERE u.${xpColumn} > 0
        ${timeFilter}
      ORDER BY u.${xpColumn} DESC
      LIMIT $2
    `;

    const result = await query(leaderboardQuery, [userId, limit]);

    // Get current user's rank if not in top results
    let currentUserRank = null;
    const userInTop = result.rows.find(row => row.is_current_user);

    if (!userInTop) {
      const rankQuery = `
        SELECT
          u.id,
          u.display_name,
          u.${xpColumn},
          u.current_level,
          u.streak_count,
          (
            SELECT COUNT(*) + 1
            FROM users u2
            WHERE u2.${xpColumn} > u.${xpColumn}
              ${timeFilter}
          ) as rank
        FROM users u
        WHERE u.id = $1
      `;

      const rankResult = await query(rankQuery, [userId]);

      if (rankResult.rows.length > 0) {
        const user = rankResult.rows[0];
        currentUserRank = {
          rank: parseInt(user.rank),
          userId: user.id,
          displayName: user.display_name,
          totalXp: user[xpColumn],
          weeklyXp: period === 'weekly' ? user[xpColumn] : null,
          currentLevel: user.current_level,
          streakCount: user.streak_count,
          isCurrentUser: true,
        };
      }
    }

    // Format leaderboard entries
    const leaderboard = result.rows.map(row => ({
      rank: parseInt(row.rank),
      userId: row.id,
      displayName: row.display_name,
      totalXp: row[xpColumn],
      weeklyXp: period === 'weekly' ? row[xpColumn] : null,
      currentLevel: row.current_level,
      streakCount: row.streak_count,
      isFriend: false, // TODO: Implement when friends system exists
      isCurrentUser: row.is_current_user,
    }));

    res.json({
      success: true,
      data: {
        leaderboard,
        currentUserRank: userInTop
          ? leaderboard.find(entry => entry.isCurrentUser)
          : currentUserRank,
        period,
        scope,
      },
    });
  } catch (error) {
    logger.error('Error getting leaderboard', { error });
    throw error;
  }
}

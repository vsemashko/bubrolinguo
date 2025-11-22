/**
 * Achievement Service
 *
 * Handles achievement detection, awarding, and retrieval logic
 */

import { pool } from '../config/database';
import { logger } from '../config/logger';

export interface Achievement {
  id: string;
  code: string;
  titleEn: string;
  titleRu: string;
  descriptionEn: string | null;
  descriptionRu: string | null;
  iconUrl: string | null;
  badgeColor: string | null;
  requirementType: string | null;
  requirementValue: number | null;
  xpReward: number;
  category: string;
  rarity: string;
}

export interface UserAchievement extends Achievement {
  unlockedAt: Date;
}

/**
 * Get all achievements with user unlock status
 */
export async function getUserAchievements(userId: string): Promise<{
  unlocked: UserAchievement[];
  locked: Achievement[];
}> {
  const query = `
    SELECT
      a.id,
      a.code,
      a.title_en as "titleEn",
      a.title_ru as "titleRu",
      a.description_en as "descriptionEn",
      a.description_ru as "descriptionRu",
      a.icon_url as "iconUrl",
      a.badge_color as "badgeColor",
      a.requirement_type as "requirementType",
      a.requirement_value as "requirementValue",
      a.xp_reward as "xpReward",
      a.category,
      a.rarity,
      ua.unlocked_at as "unlockedAt"
    FROM achievements a
    LEFT JOIN user_achievements ua
      ON a.id = ua.achievement_id AND ua.user_id = $1
    ORDER BY a.xp_reward ASC, a.code ASC
  `;

  const result = await pool.query(query, [userId]);

  const unlocked: UserAchievement[] = [];
  const locked: Achievement[] = [];

  for (const row of result.rows) {
    if (row.unlockedAt) {
      unlocked.push(row);
    } else {
      const { unlockedAt, ...achievement } = row;
      locked.push(achievement);
    }
  }

  return { unlocked, locked };
}

/**
 * Check if user has unlocked an achievement
 */
export async function hasAchievement(userId: string, achievementCode: string): Promise<boolean> {
  const query = `
    SELECT 1 FROM user_achievements ua
    JOIN achievements a ON ua.achievement_id = a.id
    WHERE ua.user_id = $1 AND a.code = $2
  `;

  const result = await pool.query(query, [userId, achievementCode]);
  return result.rows.length > 0;
}

/**
 * Award achievement to user
 */
export async function awardAchievement(userId: string, achievementCode: string): Promise<Achievement | null> {
  // Check if already awarded
  const alreadyHas = await hasAchievement(userId, achievementCode);
  if (alreadyHas) {
    return null;
  }

  // Get achievement details
  const achievementQuery = `
    SELECT
      id, code, title_en as "titleEn", title_ru as "titleRu",
      description_en as "descriptionEn", description_ru as "descriptionRu",
      icon_url as "iconUrl", badge_color as "badgeColor",
      requirement_type as "requirementType", requirement_value as "requirementValue",
      xp_reward as "xpReward", category, rarity
    FROM achievements
    WHERE code = $1
  `;

  const achResult = await pool.query(achievementQuery, [achievementCode]);

  if (achResult.rows.length === 0) {
    logger.warn(`Achievement with code ${achievementCode} not found`);
    return null;
  }

  const achievement = achResult.rows[0];

  // Insert user_achievement
  const insertQuery = `
    INSERT INTO user_achievements (user_id, achievement_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    RETURNING unlocked_at as "unlockedAt"
  `;

  await pool.query(insertQuery, [userId, achievement.id]);

  // Award XP to user
  if (achievement.xpReward > 0) {
    await pool.query(
      'UPDATE users SET total_xp = total_xp + $1 WHERE id = $2',
      [achievement.xpReward, userId]
    );
  }

  logger.info(`Achievement awarded: ${achievementCode} to user ${userId} (+${achievement.xpReward} XP)`);

  return achievement;
}

/**
 * Check and award achievements based on user stats
 */
export async function checkAndAwardAchievements(userId: string): Promise<Achievement[]> {
  // Get user stats
  const statsQuery = `
    SELECT
      total_xp,
      streak_count,
      (SELECT COUNT(*) FROM user_progress WHERE user_id = $1 AND completed_at IS NOT NULL) as lessons_completed,
      (SELECT COUNT(*) FROM user_vocabulary WHERE user_id = $1) as words_learned,
      (SELECT COUNT(*) FROM user_vocabulary WHERE user_id = $1 AND mastery_level >= 5) as words_mastered,
      (SELECT COUNT(*) FROM user_vocabulary WHERE user_id = $1 AND last_reviewed_at IS NOT NULL) as words_reviewed
    FROM users
    WHERE id = $1
  `;

  const statsResult = await pool.query(statsQuery, [userId]);

  if (statsResult.rows.length === 0) {
    return [];
  }

  const stats = statsResult.rows[0];

  const newAchievements: Achievement[] = [];

  // Check lesson achievements
  const lessonMilestones = [1, 5, 10, 25, 50, 100];
  for (const milestone of lessonMilestones) {
    if (stats.lessons_completed >= milestone) {
      const code = `lessons_${milestone}`;
      const ach = await awardAchievement(userId, code);
      if (ach) {newAchievements.push(ach);}
    }
  }

  // Check vocabulary achievements
  const wordMilestones = [10, 50, 100, 250, 500, 1000];
  for (const milestone of wordMilestones) {
    if (stats.words_learned >= milestone) {
      const code = `words_${milestone}`;
      const ach = await awardAchievement(userId, code);
      if (ach) {newAchievements.push(ach);}
    }
  }

  // Check mastery achievements
  const masteryMilestones = [5, 25, 50, 100, 250, 500];
  for (const milestone of masteryMilestones) {
    if (stats.words_mastered >= milestone) {
      const code = `mastered_${milestone}`;
      const ach = await awardAchievement(userId, code);
      if (ach) {newAchievements.push(ach);}
    }
  }

  // Check streak achievements
  const streakMilestones = [3, 7, 14, 30, 60, 100, 365];
  for (const milestone of streakMilestones) {
    if (stats.streak_count >= milestone) {
      const code = `streak_${milestone}`;
      const ach = await awardAchievement(userId, code);
      if (ach) {newAchievements.push(ach);}
    }
  }

  // Check XP achievements
  const xpMilestones = [100, 500, 1000, 2500, 5000, 10000];
  for (const milestone of xpMilestones) {
    if (stats.total_xp >= milestone) {
      const code = `xp_${milestone}`;
      const ach = await awardAchievement(userId, code);
      if (ach) {newAchievements.push(ach);}
    }
  }

  // Check review achievements
  const reviewMilestones = [10, 50, 100, 250, 500, 1000];
  for (const milestone of reviewMilestones) {
    if (stats.words_reviewed >= milestone) {
      const code = `review_${milestone}`;
      const ach = await awardAchievement(userId, code);
      if (ach) {newAchievements.push(ach);}
    }
  }

  return newAchievements;
}

/**
 * Get achievement statistics for a user
 */
export async function getAchievementStats(userId: string) {
  const query = `
    SELECT
      COUNT(*) FILTER (WHERE ua.id IS NOT NULL) as unlocked_count,
      COUNT(*) as total_count,
      COALESCE(SUM(a.xp_reward) FILTER (WHERE ua.id IS NOT NULL), 0) as xp_earned,
      COALESCE(SUM(a.xp_reward), 0) as total_xp_available
    FROM achievements a
    LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = $1
  `;

  const result = await pool.query(query, [userId]);
  return result.rows[0];
}

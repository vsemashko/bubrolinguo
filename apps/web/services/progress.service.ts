// Progress Service - Dashboard, statistics, and progress tracking

import { get } from '@/lib/api';
import {
  DashboardData,
  UserStats,
  DailyActivity,
  Achievement,
  RecentActivity,
  LeaderboardEntry,
} from '@/types/progress';

/**
 * Get dashboard data
 */
export async function getDashboardData() {
  return get<DashboardData>('/api/v1/progress/dashboard');
}

/**
 * Get user statistics
 */
export async function getUserStatistics() {
  return get<UserStats>('/api/v1/progress/statistics');
}

/**
 * Get daily activities
 */
export async function getDailyActivities(days = 30) {
  return get<{ activities: DailyActivity[] }>(
    '/api/v1/progress/daily-activities',
    { days }
  );
}

/**
 * Get recent activities
 */
export async function getRecentActivities(limit = 10) {
  return get<{ activities: RecentActivity[] }>(
    '/api/v1/progress/recent-activities',
    { limit }
  );
}

/**
 * Get achievements
 */
export async function getAchievements() {
  return get<{ achievements: Achievement[] }>('/api/v1/progress/achievements');
}

/**
 * Get leaderboard
 */
export async function getLeaderboard(type: 'xp' | 'streak' = 'xp', limit = 50) {
  return get<{ leaderboard: LeaderboardEntry[] }>(
    '/api/v1/progress/leaderboard',
    { type, limit }
  );
}

/**
 * Get level progress
 */
export async function getLevelProgress() {
  return get('/api/v1/progress/levels');
}

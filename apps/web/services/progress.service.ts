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
 * Get achievements
 */
export async function getAchievements() {
  return get<{
    achievements: Achievement[];
    unlockedCount: number;
    totalCount: number;
  }>('/api/v1/progress/achievements');
}

/**
 * Get leaderboard
 */
export async function getLeaderboard(params?: {
  timeframe?: 'weekly' | 'monthly' | 'alltime';
  limit?: number;
}) {
  return get<{
    leaderboard: LeaderboardEntry[];
    userRank?: {
      rank: number;
      totalXp: number;
    };
  }>('/api/v1/progress/leaderboard', params);
}

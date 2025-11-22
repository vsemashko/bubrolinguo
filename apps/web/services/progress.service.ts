// Progress Service - Dashboard, statistics, and progress tracking

import { get } from '@/lib/api';
import {
  DashboardData,
  UserStats as _UserStats,
  DailyActivity as _DailyActivity,
  Achievement,
  RecentActivity as _RecentActivity,
  LeaderboardEntry,
} from '@/types/progress';
import {
  mockUser,
  mockUserProgress,
  mockAchievements,
  useMockData,
  mockDelay,
  mockApiResponse,
} from '@/lib/mockData';

/**
 * Get dashboard data
 */
export async function getDashboardData() {
  if (useMockData()) {
    await mockDelay(400);
    const dashboardData: DashboardData = {
      user: mockUser as any,
      stats: {
        totalXp: mockUserProgress.totalXp,
        currentLevel: mockUserProgress.currentLevel,
        lessonsCompleted: mockUserProgress.lessonsCompleted,
        vocabularyLearned: mockUserProgress.vocabularyLearned,
        currentStreak: mockUserProgress.currentStreak,
        longestStreak: mockUserProgress.longestStreak,
        studyTimeMinutes: mockUserProgress.studyTimeMinutes,
      },
      recentActivity: [
        {
          id: '1',
          type: 'lesson_completed',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          data: { lessonTitle: 'Greetings and Introductions', xpEarned: 50 },
        },
        {
          id: '2',
          type: 'achievement_unlocked',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          data: { achievementName: 'Streak Starter', xpEarned: 50 },
        },
      ],
      upcomingReviews: 3,
      dailyGoalProgress: {
        current: 150,
        target: 200,
        percentage: 75,
      },
    };
    return mockApiResponse(dashboardData);
  }

  return get<DashboardData>('/progress/dashboard');
}

/**
 * Get achievements
 */
export async function getAchievements() {
  if (useMockData()) {
    await mockDelay(250);
    const achievements = mockAchievements.map(a => ({
      id: a.id,
      name: a.name,
      description: a.description,
      category: a.category,
      icon: a.icon,
      xpReward: a.xpReward,
      unlockedAt: a.unlockedAt,
      unlocked: !!a.unlockedAt,
    })) as Achievement[];

    const unlockedCount = achievements.filter(a => a.unlocked).length;

    return mockApiResponse({
      achievements,
      unlockedCount,
      totalCount: achievements.length,
    });
  }

  return get<{
    achievements: Achievement[];
    unlockedCount: number;
    totalCount: number;
  }>('/progress/achievements');
}

/**
 * Get leaderboard
 */
export async function getLeaderboard(params?: {
  timeframe?: 'weekly' | 'monthly' | 'alltime';
  limit?: number;
}) {
  if (useMockData()) {
    await mockDelay(300);
    const leaderboard: LeaderboardEntry[] = [
      { rank: 1, userId: 'user-1', displayName: 'Anna K.', totalXp: 3200, avatarUrl: '' },
      { rank: 2, userId: 'user-2', displayName: 'Jan P.', totalXp: 2850, avatarUrl: '' },
      { rank: 3, userId: 'user-3', displayName: 'Maria S.', totalXp: 2400, avatarUrl: '' },
      { rank: 4, userId: mockUser.id, displayName: mockUser.displayName, totalXp: mockUser.totalXp, avatarUrl: '' },
      { rank: 5, userId: 'user-5', displayName: 'Piotr W.', totalXp: 1100, avatarUrl: '' },
    ];

    return mockApiResponse({
      leaderboard,
      userRank: {
        rank: 4,
        totalXp: mockUser.totalXp,
      },
    });
  }

  return get<{
    leaderboard: LeaderboardEntry[];
    userRank?: {
      rank: number;
      totalXp: number;
    };
  }>('/progress/leaderboard', params);
}

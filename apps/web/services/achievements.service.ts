// Achievements Service - Achievement system API integration

import { get, post } from '@/lib/api';
import { mockAchievements, mockUserProgress, useMockData, mockDelay, mockApiResponse } from '@/lib/mockData';

/**
 * Achievement interface
 */
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
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked?: boolean;
  unlockedAt?: string;
}

/**
 * Achievement statistics
 */
export interface AchievementStats {
  unlockedCount: number;
  totalCount: number;
  xpEarned: number;
  totalXpAvailable: number;
  completionPercentage: number;
}

/**
 * Get all achievements for a user
 */
export async function getUserAchievements(userId: string) {
  if (useMockData()) {
    await mockDelay(300);
    return mockApiResponse({
      unlocked: mockAchievements.filter(a => a.unlockedAt).map(a => ({ ...a, unlocked: true })),
      locked: mockAchievements.filter(a => !a.unlockedAt).map(a => ({ ...a, unlocked: false })),
    });
  }

  return get<{ unlocked: Achievement[]; locked: Achievement[] }>(`/api/v1/users/${userId}/achievements`);
}

/**
 * Check and award new achievements
 */
export async function checkAchievements(userId: string) {
  if (useMockData()) {
    await mockDelay(400);
    return mockApiResponse({
      newAchievements: [],
      count: 0,
    });
  }

  return post<{ newAchievements: Achievement[]; count: number }>(`/api/v1/users/${userId}/achievements/check`);
}

/**
 * Get achievement statistics
 */
export async function getAchievementStats(userId: string) {
  if (useMockData()) {
    await mockDelay(200);
    const stats: AchievementStats = {
      unlockedCount: mockAchievements.filter(a => a.unlockedAt).length,
      totalCount: mockAchievements.length,
      xpEarned: mockAchievements.filter(a => a.unlockedAt).reduce((sum, a) => sum + a.xpReward, 0),
      totalXpAvailable: mockAchievements.reduce((sum, a) => sum + a.xpReward, 0),
      completionPercentage: Math.round((mockAchievements.filter(a => a.unlockedAt).length / mockAchievements.length) * 100),
    };
    return mockApiResponse({ stats });
  }

  return get<{ stats: AchievementStats }>(`/api/v1/users/${userId}/achievements/stats`);
}

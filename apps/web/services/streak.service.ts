// Streak Service - Streak tracking and management

import { get, post } from '@/lib/api';
import { mockUserProgress, useMockData, mockDelay, mockApiResponse } from '@/lib/mockData';

/**
 * Streak statistics interface
 */
export interface StreakStats {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  streakFreezeAvailable: number;
  lastActiveDate: string | null;
  nextMilestone: number;
  daysToNextMilestone: number;
  isActiveToday: boolean;
  streakAtRisk: boolean;
}

/**
 * Activity update response interface
 */
export interface ActivityResponse {
  stats: StreakStats;
  newAchievements: string[];
}

/**
 * Streak freeze/repair response interface
 */
export interface StreakActionResponse {
  success: boolean;
  message: string;
  stats: StreakStats;
}

/**
 * Get user's streak statistics
 */
export async function getStreakStats(userId: string) {
  if (useMockData()) {
    await mockDelay(200);
    const stats: StreakStats = {
      currentStreak: mockUserProgress.currentStreak,
      longestStreak: mockUserProgress.longestStreak,
      totalActiveDays: mockUserProgress.vocabularyLearned,
      streakFreezeAvailable: 2,
      lastActiveDate: new Date().toISOString(),
      nextMilestone: 14,
      daysToNextMilestone: 7,
      isActiveToday: true,
      streakAtRisk: false,
    };
    return mockApiResponse({ stats });
  }

  return get<{ stats: StreakStats }>(`/api/v1/users/${userId}/streak`);
}

/**
 * Record user activity (updates streak)
 */
export async function recordActivity(userId: string) {
  if (useMockData()) {
    await mockDelay(300);
    const stats: StreakStats = {
      currentStreak: mockUserProgress.currentStreak + 1,
      longestStreak: Math.max(mockUserProgress.longestStreak, mockUserProgress.currentStreak + 1),
      totalActiveDays: mockUserProgress.vocabularyLearned + 1,
      streakFreezeAvailable: 2,
      lastActiveDate: new Date().toISOString(),
      nextMilestone: 14,
      daysToNextMilestone: 6,
      isActiveToday: true,
      streakAtRisk: false,
    };
    const response: ActivityResponse = {
      stats,
      newAchievements: [],
    };
    return mockApiResponse(response);
  }

  return post<ActivityResponse>(`/api/v1/users/${userId}/activity`);
}

/**
 * Activate streak freeze
 */
export async function activateStreakFreeze(userId: string) {
  if (useMockData()) {
    await mockDelay(400);
    const stats: StreakStats = {
      currentStreak: mockUserProgress.currentStreak,
      longestStreak: mockUserProgress.longestStreak,
      totalActiveDays: mockUserProgress.vocabularyLearned,
      streakFreezeAvailable: 1, // One less after activation
      lastActiveDate: new Date().toISOString(),
      nextMilestone: 14,
      daysToNextMilestone: 7,
      isActiveToday: true,
      streakAtRisk: false,
    };
    const response: StreakActionResponse = {
      success: true,
      message: 'Streak freeze activated successfully',
      stats,
    };
    return mockApiResponse(response);
  }

  return post<StreakActionResponse>(`/api/v1/users/${userId}/streak/freeze`);
}

/**
 * Repair broken streak
 */
export async function repairStreak(userId: string) {
  if (useMockData()) {
    await mockDelay(500);
    const stats: StreakStats = {
      currentStreak: mockUserProgress.longestStreak,
      longestStreak: mockUserProgress.longestStreak,
      totalActiveDays: mockUserProgress.vocabularyLearned,
      streakFreezeAvailable: 0, // Costs 2 freezes
      lastActiveDate: new Date().toISOString(),
      nextMilestone: 14,
      daysToNextMilestone: 7,
      isActiveToday: true,
      streakAtRisk: false,
    };
    const response: StreakActionResponse = {
      success: true,
      message: 'Streak repaired successfully',
      stats,
    };
    return mockApiResponse(response);
  }

  return post<StreakActionResponse>(`/api/v1/users/${userId}/streak/repair`);
}

/**
 * Get raw streak data (for debugging)
 */
export async function getStreakRawData(userId: string) {
  if (useMockData()) {
    await mockDelay(150);
    return mockApiResponse({
      userId,
      streakCount: mockUserProgress.currentStreak,
      longestStreak: mockUserProgress.longestStreak,
      lastActivityDate: new Date().toISOString(),
      totalActiveDays: mockUserProgress.vocabularyLearned,
      streakFreezeAvailable: 2,
    });
  }

  return get(`/api/v1/users/${userId}/streak/raw`);
}

// User Service - User data and profile management

import { get, put, post, del } from '@/lib/api';
import { User } from '@/types/auth';
import { mockUser, useMockData, mockDelay, mockApiResponse } from '@/lib/mockData';

/**
 * Get current user profile
 */
export async function getCurrentUser() {
  if (useMockData()) {
    await mockDelay(200);
    const user: User = {
      id: mockUser.id,
      email: mockUser.email,
      displayName: mockUser.displayName,
      interfaceLanguage: mockUser.interfaceLanguage,
      currentLevel: mockUser.currentLevel,
      totalXp: mockUser.totalXp,
      streak: mockUser.streak,
      createdAt: mockUser.createdAt,
    };
    return mockApiResponse({ user });
  }

  return get<{ user: User }>('/users/me');
}

/**
 * Update user profile
 */
export async function updateUserProfile(updates: Partial<User>) {
  if (useMockData()) {
    await mockDelay(400);
    const updatedUser = { ...mockUser, ...updates };
    return mockApiResponse({ user: updatedUser as User });
  }

  return put<{ user: User }>('/users/me', updates);
}

/**
 * Update user settings
 */
export async function updateUserSettings(settings: {
  dailyGoal?: number;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  interfaceLanguage?: 'en' | 'ru';
}) {
  if (useMockData()) {
    await mockDelay(300);
    return mockApiResponse({ settings: { ...settings, success: true } });
  }

  return put('/users/me/settings', settings);
}

/**
 * Get user statistics
 */
export async function getUserStats() {
  if (useMockData()) {
    await mockDelay(250);
    return mockApiResponse({
      stats: {
        totalXp: mockUser.totalXp,
        currentLevel: mockUser.currentLevel,
        lessonsCompleted: 12,
        vocabularyLearned: 87,
        currentStreak: mockUser.streak,
        longestStreak: 14,
        studyTimeMinutes: 340,
      },
    });
  }

  return get('/users/me/stats');
}

/**
 * Change user password
 */
export async function changePassword(currentPassword: string, newPassword: string) {
  if (useMockData()) {
    await mockDelay(500);
    return mockApiResponse({ message: 'Password changed successfully' });
  }

  return put('/users/me/password', { currentPassword, newPassword });
}

/**
 * Delete user account
 */
export async function deleteUserAccount(password: string, confirmation: string) {
  if (useMockData()) {
    await mockDelay(500);
    return mockApiResponse({ message: 'Account deleted successfully' });
  }

  return del('/users/me', { password, confirmation });
}

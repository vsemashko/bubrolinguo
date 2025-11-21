// User Service - User data and profile management

import { get, put, post } from '@/lib/api';
import { User } from '@/types/auth';

/**
 * Get current user profile
 */
export async function getCurrentUser() {
  return get<{ user: User }>('/api/v1/users/me');
}

/**
 * Update user profile
 */
export async function updateUserProfile(updates: Partial<User>) {
  return put<{ user: User }>('/api/v1/users/me', updates);
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
  return put('/api/v1/users/me/settings', settings);
}

/**
 * Get user statistics
 */
export async function getUserStats() {
  return get('/api/v1/users/me/stats');
}

/**
 * Delete user account
 */
export async function deleteUserAccount(password: string) {
  return post('/api/v1/users/me/delete', { password });
}

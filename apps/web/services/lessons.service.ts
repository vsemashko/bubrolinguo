// Lessons Service - Lesson data and progress management

import { get, post } from '@/lib/api';
import { Lesson, LessonResult, CEFRLevel } from '@/types/lesson';

/**
 * Get all lessons
 */
export async function getLessons(filters?: {
  level?: CEFRLevel | 'all';
  status?: 'all' | 'not_started' | 'in_progress' | 'completed';
}) {
  return get<{ lessons: Lesson[] }>('/api/v1/lessons', filters);
}

/**
 * Get lesson by ID
 */
export async function getLessonById(lessonId: string) {
  return get<{ lesson: Lesson }>(`/api/v1/lessons/${lessonId}`);
}

/**
 * Submit lesson completion
 */
export async function submitLessonResult(
  lessonId: string,
  result: LessonResult
) {
  return post<{
    xp_earned: number;
    achievements_unlocked: string[];
    level_up: boolean;
  }>(`/api/v1/lessons/${lessonId}/submit`, result);
}

/**
 * Get next recommended lesson
 */
export async function getNextLesson() {
  return get<{ lesson: Lesson }>('/api/v1/lessons/next');
}

/**
 * Get user's lesson progress
 */
export async function getUserLessonProgress(lessonId: string) {
  return get(`/api/v1/lessons/${lessonId}/progress`);
}

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
  result: { score: number; timeSpent: number }
) {
  return post<{
    progress: {
      lessonId: string;
      completed: boolean;
      score: number;
      timeSpent: number;
      xpEarned: number;
      completedAt: string;
    };
    achievements: Array<{
      id: string;
      name: string;
      description: string;
    }>;
  }>(`/api/v1/lessons/${lessonId}/complete`, result);
}

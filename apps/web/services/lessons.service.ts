// Lessons Service - Lesson data and progress management

import { get, post } from '@/lib/api';
import { Lesson, LessonResult, CEFRLevel } from '@/types/lesson';
import {
  mockLessons,
  useMockData,
  mockDelay,
  mockApiResponse,
  type Lesson as MockLesson
} from '@/lib/mockData';

/**
 * Convert mock lesson to frontend lesson type
 */
function convertMockLesson(mockLesson: MockLesson): Lesson {
  return {
    id: mockLesson.id,
    lesson_number: mockLesson.lessonNumber,
    level: mockLesson.level as CEFRLevel,
    unit_number: Math.ceil(mockLesson.lessonNumber / 5),
    order_in_unit: ((mockLesson.lessonNumber - 1) % 5) + 1,
    title_en: mockLesson.titleEn,
    title_ru: mockLesson.titleRu,
    description_en: mockLesson.descriptionEn,
    description_ru: mockLesson.descriptionRu,
    exercises: mockLesson.exercises || [],
    xp_reward: mockLesson.xpReward,
    estimated_duration: mockLesson.estimatedMinutes,
  };
}

/**
 * Get all lessons
 */
export async function getLessons(filters?: {
  level?: CEFRLevel | 'all';
  status?: 'all' | 'not_started' | 'in_progress' | 'completed';
}) {
  if (useMockData()) {
    await mockDelay(300);
    let filteredLessons = mockLessons;

    // Apply level filter
    if (filters?.level && filters.level !== 'all') {
      filteredLessons = filteredLessons.filter(l => l.level === filters.level);
    }

    const lessons = filteredLessons.map(convertMockLesson);
    return mockApiResponse({ lessons });
  }

  return get<{ lessons: Lesson[] }>('/lessons', filters);
}

/**
 * Get lesson by ID
 */
export async function getLessonById(lessonId: string) {
  if (useMockData()) {
    await mockDelay(200);
    const mockLesson = mockLessons.find(l => l.id === lessonId);

    if (!mockLesson) {
      return mockApiResponse(
        { message: 'Lesson not found' } as any,
        false
      );
    }

    const lesson = convertMockLesson(mockLesson);
    return mockApiResponse({ lesson });
  }

  return get<{ lesson: Lesson }>(`/lessons/${lessonId}`);
}

/**
 * Submit lesson completion
 */
export async function submitLessonResult(
  lessonId: string,
  result: { score: number; timeSpent: number }
) {
  if (useMockData()) {
    await mockDelay(500);
    const mockLesson = mockLessons.find(l => l.id === lessonId);

    const xpEarned = mockLesson ? Math.floor(mockLesson.xpReward * (result.score / 100)) : 0;

    return mockApiResponse({
      progress: {
        lessonId,
        completed: result.score >= 70,
        score: result.score,
        timeSpent: result.timeSpent,
        xpEarned,
        completedAt: new Date().toISOString(),
      },
      achievements: result.score >= 90 ? [{
        id: 'achievement-perfectionist',
        name: 'Perfectionist',
        description: 'Score 90% or higher on a lesson',
      }] : [],
    });
  }

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
  }>(`/lessons/${lessonId}/complete`, result);
}

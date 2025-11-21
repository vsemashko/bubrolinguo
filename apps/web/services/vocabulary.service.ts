// Vocabulary Service - Vocabulary and spaced repetition management

import { get, post } from '@/lib/api';
import {
  VocabularyWithUserProgress,
  ReviewResult,
  VocabularyStats,
  VocabularyFilters,
} from '@/types/vocabulary';

/**
 * Get vocabulary words for review (spaced repetition)
 */
export async function getReviewQueue(limit?: number) {
  return get<{ reviewQueue: VocabularyWithUserProgress[]; total: number }>(
    '/api/v1/vocabulary/review',
    { limit }
  );
}

/**
 * Submit vocabulary review result for a single word
 */
export async function submitReviewResult(
  vocabularyId: string,
  result: { correct: boolean; timeSpent: number }
) {
  return post<{
    vocabulary: {
      id: string;
      nextReview: string;
      mastery: number;
      reviewCount: number;
    };
  }>(`/api/v1/vocabulary/${vocabularyId}/review`, result);
}

/**
 * Get vocabulary word details
 */
export async function getVocabularyById(vocabularyId: string) {
  return get<{ word: VocabularyWithUserProgress }>(
    `/api/v1/vocabulary/${vocabularyId}`
  );
}

/**
 * Get vocabulary statistics
 */
export async function getVocabularyStats() {
  return get<{ stats: VocabularyStats }>('/api/v1/vocabulary/stats');
}

/**
 * Get all vocabulary with optional filtering
 */
export async function getVocabulary(filters?: {
  level?: string;
  partOfSpeech?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  return get<{
    vocabulary: VocabularyWithUserProgress[];
    total: number;
  }>('/api/v1/vocabulary', filters);
}

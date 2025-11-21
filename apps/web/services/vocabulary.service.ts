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
  return get<{ words: VocabularyWithUserProgress[]; totalDue: number }>(
    '/api/v1/vocabulary/review',
    { limit }
  );
}

/**
 * Submit vocabulary review results
 */
export async function submitReviewResults(results: ReviewResult[]) {
  return post<{
    words_reviewed: number;
    xp_earned: number;
    next_review_count: number;
  }>('/api/v1/vocabulary/review/submit', { results });
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
  return get<VocabularyStats>('/api/v1/vocabulary/stats');
}

/**
 * Search vocabulary
 */
export async function searchVocabulary(
  query: string,
  filters?: VocabularyFilters
) {
  return get<{ words: VocabularyWithUserProgress[] }>(
    '/api/v1/vocabulary/search',
    { query, ...filters }
  );
}

/**
 * Get vocabulary by level
 */
export async function getVocabularyByLevel(level: string, page = 1, limit = 20) {
  return get<{
    words: VocabularyWithUserProgress[];
    total: number;
    page: number;
    totalPages: number;
  }>('/api/v1/vocabulary', { level, page, limit });
}

/**
 * Mark vocabulary word as known
 */
export async function markWordAsKnown(vocabularyId: string) {
  return post(`/api/v1/vocabulary/${vocabularyId}/known`);
}

/**
 * Reset vocabulary progress
 */
export async function resetWordProgress(vocabularyId: string) {
  return post(`/api/v1/vocabulary/${vocabularyId}/reset`);
}

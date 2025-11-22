// Vocabulary Service - Vocabulary and spaced repetition management

import { get, post } from '@/lib/api';
import {
  VocabularyWithUserProgress,
  ReviewResult as _ReviewResult,
  VocabularyStats,
  VocabularyFilters as _VocabularyFilters,
} from '@/types/vocabulary';
import {
  mockVocabulary,
  mockUserVocabulary,
  useMockData,
  mockDelay,
  mockApiResponse,
  type VocabularyWord,
  type UserVocabulary as MockUserVocabulary,
} from '@/lib/mockData';

/**
 * Convert mock vocabulary to frontend type
 */
function convertMockVocabulary(
  mockWord: VocabularyWord,
  mockUserProgress?: MockUserVocabulary
): VocabularyWithUserProgress {
  const word: VocabularyWithUserProgress = {
    id: mockWord.id,
    polishWord: mockWord.polish,
    translationEn: mockWord.english,
    translationRu: mockWord.russian,
    partOfSpeech: mockWord.partOfSpeech as any,
    gender: mockWord.gender as any,
    level: mockWord.level as any,
    pronunciationIpa: mockWord.ipa,
    exampleSentencePl: mockWord.exampleSentencePolish,
    exampleSentenceEn: mockWord.exampleSentenceEnglish,
    exampleSentenceRu: mockWord.exampleSentenceRussian,
  };

  if (mockUserProgress) {
    word.userProgress = {
      id: `up-${mockUserProgress.id}`,
      vocabularyId: mockUserProgress.id,
      proficiencyLevel: mockUserProgress.repetitions,
      easinessFactor: mockUserProgress.easinessFactor,
      intervalDays: mockUserProgress.interval,
      nextReviewDate: mockUserProgress.nextReviewDate,
      timesReviewed: mockUserProgress.repetitions,
      timesCorrect: Math.floor(mockUserProgress.repetitions * 0.8),
      timesIncorrect: Math.floor(mockUserProgress.repetitions * 0.2),
      currentStreak: mockUserProgress.repetitions,
      status: mockUserProgress.isLearned ? 'mastered' : 'learning',
      firstSeenAt: mockUserProgress.lastReviewedAt || new Date().toISOString(),
      lastReviewedAt: mockUserProgress.lastReviewedAt,
      masteredAt: mockUserProgress.isLearned ? mockUserProgress.lastReviewedAt : undefined,
    };
  }

  return word;
}

/**
 * Get vocabulary words for review (spaced repetition)
 */
export async function getReviewQueue(limit?: number) {
  if (useMockData()) {
    await mockDelay(300);
    const dueWords = mockUserVocabulary
      .filter(w => new Date(w.nextReviewDate) <= new Date())
      .slice(0, limit || 10);

    const reviewQueue = dueWords.map(w => {
      const mockWord = mockVocabulary.find(v => v.id === w.id);
      return mockWord ? convertMockVocabulary(mockWord, w) : null;
    }).filter(Boolean) as VocabularyWithUserProgress[];

    return mockApiResponse({ reviewQueue, total: reviewQueue.length });
  }

  return get<{ reviewQueue: VocabularyWithUserProgress[]; total: number }>(
    '/vocabulary/review',
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
  if (useMockData()) {
    await mockDelay(400);
    const userVocab = mockUserVocabulary.find(v => v.id === vocabularyId);

    // Simulate SM-2 algorithm
    const newInterval = result.correct
      ? (userVocab?.interval || 1) * (userVocab?.easinessFactor || 2.5)
      : 1;

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + Math.floor(newInterval));

    return mockApiResponse({
      vocabulary: {
        id: vocabularyId,
        nextReview: nextReview.toISOString(),
        mastery: (userVocab?.repetitions || 0) + 1,
        reviewCount: (userVocab?.repetitions || 0) + 1,
      },
    });
  }

  return post<{
    vocabulary: {
      id: string;
      nextReview: string;
      mastery: number;
      reviewCount: number;
    };
  }>(`/vocabulary/${vocabularyId}/review`, result);
}

/**
 * Get vocabulary word details
 */
export async function getVocabularyById(vocabularyId: string) {
  if (useMockData()) {
    await mockDelay(200);
    const mockWord = mockVocabulary.find(v => v.id === vocabularyId);
    const mockUserProgress = mockUserVocabulary.find(v => v.id === vocabularyId);

    if (!mockWord) {
      return mockApiResponse({ message: 'Word not found' } as any, false);
    }

    const word = convertMockVocabulary(mockWord, mockUserProgress);
    return mockApiResponse({ word });
  }

  return get<{ word: VocabularyWithUserProgress }>(
    `/vocabulary/${vocabularyId}`
  );
}

/**
 * Get vocabulary statistics
 */
export async function getVocabularyStats() {
  if (useMockData()) {
    await mockDelay(250);
    const learned = mockUserVocabulary.filter(v => v.isLearned).length;
    const learning = mockUserVocabulary.filter(v => !v.isLearned).length;
    const dueToday = mockUserVocabulary.filter(
      v => new Date(v.nextReviewDate) <= new Date()
    ).length;

    return mockApiResponse({
      stats: {
        totalWords: mockVocabulary.length,
        newWords: mockVocabulary.length - mockUserVocabulary.length,
        learningWords: learning,
        masteredWords: learned,
        wordsReviewDueToday: dueToday,
        currentStreak: 7,
        longestStreak: 14,
      },
    });
  }

  return get<{ stats: VocabularyStats }>('/vocabulary/stats');
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
  if (useMockData()) {
    await mockDelay(300);
    let filteredWords = [...mockVocabulary];

    // Apply filters
    if (filters?.level) {
      filteredWords = filteredWords.filter(w => w.level === filters.level);
    }
    if (filters?.partOfSpeech) {
      filteredWords = filteredWords.filter(w => w.partOfSpeech === filters.partOfSpeech);
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filteredWords = filteredWords.filter(
        w =>
          w.polish.toLowerCase().includes(search) ||
          w.english.toLowerCase().includes(search) ||
          w.russian.toLowerCase().includes(search)
      );
    }

    // Apply pagination
    const offset = filters?.offset || 0;
    const limit = filters?.limit || 20;
    const paginatedWords = filteredWords.slice(offset, offset + limit);

    const vocabulary = paginatedWords.map(w => {
      const userProgress = mockUserVocabulary.find(uv => uv.id === w.id);
      return convertMockVocabulary(w, userProgress);
    });

    return mockApiResponse({ vocabulary, total: filteredWords.length });
  }

  return get<{
    vocabulary: VocabularyWithUserProgress[];
    total: number;
  }>('/vocabulary', filters);
}

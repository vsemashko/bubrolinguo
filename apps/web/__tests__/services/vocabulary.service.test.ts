/**
 * Vocabulary Service Tests
 *
 * Note: These tests run against mock data by default since useMockData()
 * returns true in test environment (process.env.NEXT_PUBLIC_USE_MOCK_DATA)
 */
import {
  getReviewQueue,
  submitReviewResult,
  getVocabularyById,
  getVocabularyStats,
  getVocabulary,
} from '@/services/vocabulary.service';

jest.mock('@/lib/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

// Mock environment to use mock data
process.env.NEXT_PUBLIC_USE_MOCK_DATA = 'true';

describe('Vocabulary Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getReviewQueue', () => {
    it('should return words due for review', async () => {
      const result = await getReviewQueue(10);

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('reviewQueue');
      expect(result.data).toHaveProperty('total');
      expect(Array.isArray(result.data.reviewQueue)).toBe(true);
    });

    it('should respect limit parameter', async () => {
      const limit = 5;
      const result = await getReviewQueue(limit);

      expect(result.data.reviewQueue.length).toBeLessThanOrEqual(limit);
    });

    it('should include user progress data', async () => {
      const result = await getReviewQueue();

      if (result.data.reviewQueue.length > 0) {
        const word = result.data.reviewQueue[0];
        expect(word).toHaveProperty('polishWord');
        expect(word).toHaveProperty('translationEn');
        expect(word).toHaveProperty('userProgress');
      }
    });
  });

  describe('submitReviewResult', () => {
    it('should submit correct review result', async () => {
      const result = await submitReviewResult('vocab-1', {
        correct: true,
        timeSpent: 5,
      });

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('vocabulary');
      expect(result.data.vocabulary).toHaveProperty('nextReview');
    });

    it('should submit incorrect review result', async () => {
      const result = await submitReviewResult('vocab-1', {
        correct: false,
        timeSpent: 10,
      });

      expect(result.success).toBe(true);
      expect(result.data.vocabulary).toHaveProperty('reviewCount');
    });

    it('should update mastery level', async () => {
      const result = await submitReviewResult('vocab-1', {
        correct: true,
        timeSpent: 4,
      });

      expect(result.data.vocabulary).toHaveProperty('mastery');
      expect(result.data.vocabulary.mastery).toBeGreaterThanOrEqual(0);
    });

    it('should schedule next review based on SM-2 algorithm', async () => {
      const result = await submitReviewResult('vocab-1', {
        correct: true,
        timeSpent: 3,
      });

      const nextReview = new Date(result.data.vocabulary.nextReview);
      const now = new Date();
      expect(nextReview.getTime()).toBeGreaterThan(now.getTime());
    });
  });

  describe('getVocabularyById', () => {
    it('should return vocabulary word details', async () => {
      const result = await getVocabularyById('vocab-1');

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('word');
      expect(result.data.word).toHaveProperty('polishWord');
      expect(result.data.word).toHaveProperty('translationEn');
      expect(result.data.word).toHaveProperty('partOfSpeech');
    });

    it('should include example sentences', async () => {
      const result = await getVocabularyById('vocab-1');

      expect(result.data.word).toHaveProperty('exampleSentencePl');
      expect(result.data.word).toHaveProperty('exampleSentenceEn');
    });

    it('should handle non-existent word', async () => {
      const result = await getVocabularyById('non-existent');

      expect(result.success).toBe(false);
    });
  });

  describe('getVocabularyStats', () => {
    it('should return comprehensive statistics', async () => {
      const result = await getVocabularyStats();

      expect(result.success).toBe(true);
      expect(result.data.stats).toHaveProperty('totalWords');
      expect(result.data.stats).toHaveProperty('newWords');
      expect(result.data.stats).toHaveProperty('learningWords');
      expect(result.data.stats).toHaveProperty('masteredWords');
      expect(result.data.stats).toHaveProperty('wordsReviewDueToday');
    });

    it('should include streak information', async () => {
      const result = await getVocabularyStats();

      expect(result.data.stats).toHaveProperty('currentStreak');
      expect(result.data.stats).toHaveProperty('longestStreak');
    });
  });

  describe('getVocabulary', () => {
    it('should return all vocabulary with pagination', async () => {
      const result = await getVocabulary({ limit: 20, offset: 0 });

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('vocabulary');
      expect(result.data).toHaveProperty('total');
      expect(result.data.vocabulary.length).toBeLessThanOrEqual(20);
    });

    it('should filter by CEFR level', async () => {
      const result = await getVocabulary({ level: 'A1' });

      expect(result.success).toBe(true);
      const words = result.data.vocabulary;
      if (words.length > 0) {
        expect(words.every((w: any) => w.level === 'A1')).toBe(true);
      }
    });

    it('should filter by part of speech', async () => {
      const result = await getVocabulary({ partOfSpeech: 'noun' });

      expect(result.success).toBe(true);
      const words = result.data.vocabulary;
      if (words.length > 0) {
        expect(words.every((w: any) => w.partOfSpeech === 'noun')).toBe(true);
      }
    });

    it('should search vocabulary by text', async () => {
      const result = await getVocabulary({ search: 'hello' });

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data.vocabulary)).toBe(true);
    });
  });
});

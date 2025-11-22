/**
 * Lessons Service Tests
 *
 * Note: These tests run against mock data by default since useMockData()
 * returns true in test environment (process.env.NEXT_PUBLIC_USE_MOCK_DATA)
 */
import { getLessons, getLessonById, submitLessonResult } from '@/services/lessons.service';

// Mock the API module
jest.mock('@/lib/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

// Mock environment to use mock data
process.env.NEXT_PUBLIC_USE_MOCK_DATA = 'true';

describe('Lessons Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getLessons', () => {
    it('should return all lessons when no filters applied', async () => {
      const result = await getLessons();

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('lessons');
      expect(Array.isArray(result.data.lessons)).toBe(true);
    });

    it('should filter lessons by CEFR level', async () => {
      const result = await getLessons({ level: 'A1' });

      expect(result.success).toBe(true);
      const lessons = result.data.lessons;
      expect(lessons.every((l: any) => l.level === 'A1')).toBe(true);
    });

    it('should handle "all" level filter', async () => {
      const result = await getLessons({ level: 'all' });

      expect(result.success).toBe(true);
      expect(result.data.lessons.length).toBeGreaterThan(0);
    });
  });

  describe('getLessonById', () => {
    it('should return lesson details for valid ID', async () => {
      const lessonId = 'lesson-1-greetings';
      const result = await getLessonById(lessonId);

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('lesson');
      expect(result.data.lesson.id).toBe(lessonId);
    });

    it('should handle non-existent lesson ID', async () => {
      const result = await getLessonById('non-existent-id');

      expect(result.success).toBe(false);
      expect(result.data).toHaveProperty('message');
    });

    it('should include lesson exercises and metadata', async () => {
      const result = await getLessonById('lesson-1-greetings');

      expect(result.data.lesson).toHaveProperty('exercises');
      expect(result.data.lesson).toHaveProperty('xp_reward');
      expect(result.data.lesson).toHaveProperty('estimated_duration');
    });
  });

  describe('submitLessonResult', () => {
    it('should submit lesson completion successfully', async () => {
      const lessonId = 'lesson-1-greetings';
      const result = await submitLessonResult(lessonId, {
        score: 85,
        timeSpent: 180,
      });

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('progress');
      expect(result.data.progress.score).toBe(85);
    });

    it('should mark lesson as completed when score >= 70', async () => {
      const result = await submitLessonResult('lesson-1-greetings', {
        score: 75,
        timeSpent: 200,
      });

      expect(result.data.progress.completed).toBe(true);
    });

    it('should mark lesson as incomplete when score < 70', async () => {
      const result = await submitLessonResult('lesson-1-greetings', {
        score: 65,
        timeSpent: 200,
      });

      expect(result.data.progress.completed).toBe(false);
    });

    it('should award XP based on score', async () => {
      const result = await submitLessonResult('lesson-1-greetings', {
        score: 100,
        timeSpent: 150,
      });

      expect(result.data.progress.xpEarned).toBeGreaterThan(0);
    });

    it('should unlock achievements for high scores', async () => {
      const result = await submitLessonResult('lesson-1-greetings', {
        score: 95,
        timeSpent: 120,
      });

      expect(result.data.achievements).toBeDefined();
      if (result.data.achievements.length > 0) {
        expect(result.data.achievements[0]).toHaveProperty('id');
        expect(result.data.achievements[0]).toHaveProperty('name');
      }
    });
  });
});

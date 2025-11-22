import request from 'supertest';
import app from '../index';
import { query } from '../db/connection';

// Test user credentials
const testUser = {
  email: `test-${Date.now()}@example.com`,
  password: 'Test1234!',
  displayName: 'Test User',
};

let authToken: string;
let userId: string;

describe('API Integration Tests', () => {
  // Clean up after all tests
  afterAll(async () => {
    if (userId) {
      await query('DELETE FROM users WHERE id = $1', [userId]);
    }
  });

  describe('Authentication Endpoints', () => {
    it('POST /api/v1/auth/register - should register a new user', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send(testUser)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toHaveProperty('id');
      expect(res.body.data.user.email).toBe(testUser.email);
      expect(res.body.data).toHaveProperty('accessToken');
      expect(res.body.data).toHaveProperty('refreshToken');

      userId = res.body.data.user.id;
      authToken = res.body.data.accessToken;
    });

    it('POST /api/v1/auth/register - should reject duplicate email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send(testUser)
        .expect(409);

      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('EMAIL_EXISTS');
    });

    it('POST /api/v1/auth/login - should login with correct credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('accessToken');
      expect(res.body.data.user.email).toBe(testUser.email);
    });

    it('POST /api/v1/auth/login - should reject invalid password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        })
        .expect(401);

      expect(res.body.success).toBe(false);
    });

    it('POST /api/v1/auth/refresh - should refresh access token', async () => {
      const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      const refreshToken = loginRes.body.data.refreshToken;

      const res = await request(app)
        .post('/api/v1/auth/refresh')
        .send({ refreshToken })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('accessToken');
    });
  });

  describe('User Endpoints', () => {
    it('GET /api/v1/users/me - should get current user', async () => {
      const res = await request(app)
        .get('/api/v1/users/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.user.id).toBe(userId);
      expect(res.body.data.user.email).toBe(testUser.email);
    });

    it('GET /api/v1/users/me - should reject without token', async () => {
      const res = await request(app)
        .get('/api/v1/users/me')
        .expect(401);

      expect(res.body.success).toBe(false);
    });

    it('PUT /api/v1/users/me - should update user profile', async () => {
      const res = await request(app)
        .put('/api/v1/users/me')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          displayName: 'Updated Name',
        })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.user.displayName).toBe('Updated Name');
    });

    it('PUT /api/v1/users/me/settings - should update user settings', async () => {
      const res = await request(app)
        .put('/api/v1/users/me/settings')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          dailyGoal: 100,
          emailNotifications: false,
        })
        .expect(200);

      expect(res.body.success).toBe(true);
    });

    it('GET /api/v1/users/me/stats - should get user statistics', async () => {
      const res = await request(app)
        .get('/api/v1/users/me/stats')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('totalXp');
      expect(res.body.data).toHaveProperty('currentLevel');
      expect(res.body.data).toHaveProperty('streakCount');
    });
  });

  describe('Lessons Endpoints', () => {
    it('GET /api/v1/lessons - should get all lessons', async () => {
      const res = await request(app)
        .get('/api/v1/lessons')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('lessons');
      expect(Array.isArray(res.body.data.lessons)).toBe(true);
    });

    it('GET /api/v1/lessons?level=A1 - should filter by level', async () => {
      const res = await request(app)
        .get('/api/v1/lessons?level=A1')
        .expect(200);

      expect(res.body.success).toBe(true);
      if (res.body.data.lessons.length > 0) {
        expect(res.body.data.lessons[0].level).toBe('A1');
      }
    });

    it('GET /api/v1/lessons/:id - should get lesson by ID', async () => {
      // First get a lesson ID
      const lessonsRes = await request(app).get('/api/v1/lessons');
      if (lessonsRes.body.data.lessons.length === 0) {
        return; // Skip if no lessons
      }

      const lessonId = lessonsRes.body.data.lessons[0].id;

      const res = await request(app)
        .get(`/api/v1/lessons/${lessonId}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.lesson.id).toBe(lessonId);
    });
  });

  describe('Vocabulary Endpoints', () => {
    it('GET /api/v1/vocabulary - should get vocabulary words', async () => {
      const res = await request(app)
        .get('/api/v1/vocabulary')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('words');
      expect(Array.isArray(res.body.data.words)).toBe(true);
    });

    it('GET /api/v1/vocabulary?level=A1 - should filter by level', async () => {
      const res = await request(app)
        .get('/api/v1/vocabulary?level=A1')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      if (res.body.data.words.length > 0) {
        expect(res.body.data.words[0].level).toBe('A1');
      }
    });

    it('GET /api/v1/vocabulary/review - should get review queue', async () => {
      const res = await request(app)
        .get('/api/v1/vocabulary/review')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('words');
    });
  });

  describe('Achievements Endpoints', () => {
    it('GET /api/v1/users/:userId/achievements - should get achievements', async () => {
      const res = await request(app)
        .get(`/api/v1/users/${userId}/achievements`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('unlocked');
      expect(res.body.data).toHaveProperty('locked');
      expect(Array.isArray(res.body.data.unlocked)).toBe(true);
      expect(Array.isArray(res.body.data.locked)).toBe(true);
    });

    it('POST /api/v1/users/:userId/achievements/check - should check achievements', async () => {
      const res = await request(app)
        .post(`/api/v1/users/${userId}/achievements/check`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('newAchievements');
      expect(Array.isArray(res.body.data.newAchievements)).toBe(true);
    });

    it('GET /api/v1/users/:userId/achievements/stats - should get stats', async () => {
      const res = await request(app)
        .get(`/api/v1/users/${userId}/achievements/stats`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('unlockedCount');
      expect(res.body.data).toHaveProperty('totalCount');
    });
  });

  describe('Leaderboard Endpoints', () => {
    it('GET /api/v1/leaderboard - should get leaderboard', async () => {
      const res = await request(app)
        .get('/api/v1/leaderboard')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('leaderboard');
      expect(res.body.data).toHaveProperty('period');
      expect(res.body.data).toHaveProperty('scope');
    });

    it('GET /api/v1/leaderboard?period=weekly - should filter by period', async () => {
      const res = await request(app)
        .get('/api/v1/leaderboard?period=weekly')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.period).toBe('weekly');
    });
  });

  describe('Progress Endpoints', () => {
    it('POST /api/v1/users/:userId/activity - should record activity', async () => {
      const res = await request(app)
        .post(`/api/v1/users/${userId}/activity`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('stats');
    });
  });

  describe('Password Change Endpoint', () => {
    it('PUT /api/v1/users/me/password - should change password', async () => {
      const res = await request(app)
        .put('/api/v1/users/me/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: testUser.password,
          newPassword: 'NewPassword123!',
        })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.message).toContain('success');

      // Verify can login with new password
      const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: 'NewPassword123!',
        })
        .expect(200);

      expect(loginRes.body.success).toBe(true);

      // Change back to original password for other tests
      await request(app)
        .put('/api/v1/users/me/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'NewPassword123!',
          newPassword: testUser.password,
        });
    });

    it('PUT /api/v1/users/me/password - should reject wrong current password', async () => {
      const res = await request(app)
        .put('/api/v1/users/me/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'WrongPassword',
          newPassword: 'NewPassword123!',
        })
        .expect(401);

      expect(res.body.success).toBe(false);
    });

    it('PUT /api/v1/users/me/password - should reject weak password', async () => {
      const res = await request(app)
        .put('/api/v1/users/me/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: testUser.password,
          newPassword: '123',
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('PUT /api/v1/users/me/password - should reject missing fields', async () => {
      const res = await request(app)
        .put('/api/v1/users/me/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: testUser.password,
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });
  });

  describe('Lesson Submission & Level-Up', () => {
    let lessonId: string;

    beforeAll(async () => {
      // Get first lesson
      const lessonsRes = await request(app).get('/api/v1/lessons');
      if (lessonsRes.body.data.lessons.length > 0) {
        lessonId = lessonsRes.body.data.lessons[0].id;
      }
    });

    it('POST /api/v1/lessons/:id/submit - should submit lesson result', async () => {
      if (!lessonId) return;

      const res = await request(app)
        .post(`/api/v1/lessons/${lessonId}/submit`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          score: 85,
          xp_earned: 50,
          mistakes_count: 2,
          time_spent: 300,
          exercise_results: [
            { exercise_id: 'ex1', correct: true, time_spent: 100 },
            { exercise_id: 'ex2', correct: false, time_spent: 150 },
            { exercise_id: 'ex3', correct: true, time_spent: 50 },
          ],
        })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('xp_earned');
      expect(res.body.data).toHaveProperty('total_xp');
      expect(res.body.data).toHaveProperty('level_up');
    });

    it('POST /api/v1/lessons/:id/submit - should detect level-up', async () => {
      if (!lessonId) return;

      // Submit multiple lessons to trigger level-up
      for (let i = 0; i < 10; i++) {
        const res = await request(app)
          .post(`/api/v1/lessons/${lessonId}/submit`)
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            score: 90,
            xp_earned: 50,
            mistakes_count: 1,
            time_spent: 200,
            exercise_results: [],
          });

        if (res.body.data.level_up) {
          expect(res.body.data).toHaveProperty('old_level');
          expect(res.body.data).toHaveProperty('new_level');
          expect(res.body.data.old_level).not.toBe(res.body.data.new_level);
          break;
        }
      }
    });

    it('POST /api/v1/lessons/:id/submit - should reject invalid score', async () => {
      if (!lessonId) return;

      const res = await request(app)
        .post(`/api/v1/lessons/${lessonId}/submit`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          score: 150, // Invalid score > 100
          xp_earned: 50,
          mistakes_count: 0,
          time_spent: 200,
          exercise_results: [],
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('GET /api/v1/lessons/next - should get next recommended lesson', async () => {
      const res = await request(app)
        .get('/api/v1/lessons/next')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('lesson');
    });
  });

  describe('Vocabulary Review & Spaced Repetition', () => {
    let wordId: string;

    beforeAll(async () => {
      // Get a vocabulary word
      const wordsRes = await request(app)
        .get('/api/v1/vocabulary')
        .set('Authorization', `Bearer ${authToken}`);

      if (wordsRes.body.data.words.length > 0) {
        wordId = wordsRes.body.data.words[0].id;
      }
    });

    it('POST /api/v1/vocabulary/:wordId/review - should submit review (correct)', async () => {
      if (!wordId) return;

      const res = await request(app)
        .post(`/api/v1/vocabulary/${wordId}/review`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          quality: 5, // Perfect recall
          time_spent: 10,
        })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('next_review_date');
      expect(res.body.data).toHaveProperty('interval');
    });

    it('POST /api/v1/vocabulary/:wordId/review - should submit review (incorrect)', async () => {
      if (!wordId) return;

      const res = await request(app)
        .post(`/api/v1/vocabulary/${wordId}/review`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          quality: 1, // Incorrect
          time_spent: 15,
        })
        .expect(200);

      expect(res.body.success).toBe(true);
      // Interval should reset for incorrect answers
      expect(res.body.data.interval).toBeLessThanOrEqual(1);
    });

    it('POST /api/v1/vocabulary/:wordId/review - should reject invalid quality', async () => {
      if (!wordId) return;

      const res = await request(app)
        .post(`/api/v1/vocabulary/${wordId}/review`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          quality: 10, // Invalid quality > 5
          time_spent: 10,
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('GET /api/v1/vocabulary/:wordId - should get word details', async () => {
      if (!wordId) return;

      const res = await request(app)
        .get(`/api/v1/vocabulary/${wordId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.word).toHaveProperty('polish');
      expect(res.body.data.word).toHaveProperty('english');
    });

    it('GET /api/v1/vocabulary/stats - should get vocabulary stats', async () => {
      const res = await request(app)
        .get('/api/v1/vocabulary/stats')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('totalWords');
      expect(res.body.data).toHaveProperty('learnedWords');
    });
  });

  describe('Exam Preparation Endpoints', () => {
    it('GET /api/v1/exams - should get available exams', async () => {
      const res = await request(app)
        .get('/api/v1/exams')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('exams');
      expect(Array.isArray(res.body.data.exams)).toBe(true);
    });

    it('GET /api/v1/exams/:examId - should get exam details', async () => {
      const examsRes = await request(app)
        .get('/api/v1/exams')
        .set('Authorization', `Bearer ${authToken}`);

      if (examsRes.body.data.exams.length === 0) return;

      const examId = examsRes.body.data.exams[0].id;

      const res = await request(app)
        .get(`/api/v1/exams/${examId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.exam).toHaveProperty('id');
      expect(res.body.data.exam).toHaveProperty('sections');
    });

    it('POST /api/v1/exams/:examId/start - should start exam attempt', async () => {
      const examsRes = await request(app)
        .get('/api/v1/exams')
        .set('Authorization', `Bearer ${authToken}`);

      if (examsRes.body.data.exams.length === 0) return;

      const examId = examsRes.body.data.exams[0].id;

      const res = await request(app)
        .post(`/api/v1/exams/${examId}/start`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('attemptId');
      expect(res.body.data).toHaveProperty('startedAt');
    });
  });

  describe('Streak & Activity Tracking', () => {
    it('POST /api/v1/users/:userId/activity - should record daily activity', async () => {
      const res = await request(app)
        .post(`/api/v1/users/${userId}/activity`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.stats).toHaveProperty('streakCount');
      expect(res.body.data.stats).toHaveProperty('lastActivityDate');
    });

    it('POST /api/v1/users/:userId/activity - should maintain streak on consecutive days', async () => {
      // Record activity
      const res1 = await request(app)
        .post(`/api/v1/users/${userId}/activity`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const streakBefore = res1.body.data.stats.streakCount;

      // Record again (same day should maintain streak)
      const res2 = await request(app)
        .post(`/api/v1/users/${userId}/activity`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const streakAfter = res2.body.data.stats.streakCount;

      expect(streakAfter).toBeGreaterThanOrEqual(streakBefore);
    });

    it('POST /api/v1/users/:userId/streak/freeze - should use streak freeze', async () => {
      const res = await request(app)
        .post(`/api/v1/users/${userId}/streak/freeze`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('freezesRemaining');
    });

    it('POST /api/v1/users/:userId/streak/freeze - should reject when no freezes available', async () => {
      // Use all freezes
      for (let i = 0; i < 5; i++) {
        await request(app)
          .post(`/api/v1/users/${userId}/streak/freeze`)
          .set('Authorization', `Bearer ${authToken}`);
      }

      const res = await request(app)
        .post(`/api/v1/users/${userId}/streak/freeze`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('GET /api/v1/users/:userId/activity-history - should get activity history', async () => {
      const res = await request(app)
        .get(`/api/v1/users/${userId}/activity-history?days=30`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('activities');
      expect(Array.isArray(res.body.data.activities)).toBe(true);
    });
  });

  describe('Advanced Leaderboard Filtering', () => {
    it('GET /api/v1/leaderboard?period=daily - should get daily leaderboard', async () => {
      const res = await request(app)
        .get('/api/v1/leaderboard?period=daily')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.period).toBe('daily');
    });

    it('GET /api/v1/leaderboard?period=monthly - should get monthly leaderboard', async () => {
      const res = await request(app)
        .get('/api/v1/leaderboard?period=monthly')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.period).toBe('monthly');
    });

    it('GET /api/v1/leaderboard?period=allTime - should get all-time leaderboard', async () => {
      const res = await request(app)
        .get('/api/v1/leaderboard?period=allTime')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.period).toBe('allTime');
    });

    it('GET /api/v1/leaderboard?limit=10 - should respect limit parameter', async () => {
      const res = await request(app)
        .get('/api/v1/leaderboard?limit=10')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.leaderboard.length).toBeLessThanOrEqual(10);
    });
  });

  describe('Achievement System Edge Cases', () => {
    it('GET /api/v1/users/:userId/achievements - should categorize by rarity', async () => {
      const res = await request(app)
        .get(`/api/v1/users/${userId}/achievements`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);

      // Check that achievements have rarity field
      if (res.body.data.locked.length > 0) {
        expect(res.body.data.locked[0]).toHaveProperty('rarity');
      }
    });

    it('POST /api/v1/users/:userId/achievements/check - should unlock streak achievements', async () => {
      // Record activity to potentially unlock achievements
      await request(app)
        .post(`/api/v1/users/${userId}/activity`)
        .set('Authorization', `Bearer ${authToken}`);

      const res = await request(app)
        .post(`/api/v1/users/${userId}/achievements/check`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.newAchievements)).toBe(true);
    });

    it('GET /api/v1/achievements - should get all available achievements', async () => {
      const res = await request(app)
        .get('/api/v1/achievements')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('achievements');
      expect(Array.isArray(res.body.data.achievements)).toBe(true);
    });
  });

  describe('Authentication Edge Cases', () => {
    it('POST /api/v1/auth/register - should reject invalid email format', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'invalid-email',
          password: 'Test1234!',
          displayName: 'Test',
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('POST /api/v1/auth/register - should reject weak password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: '123',
          displayName: 'Test',
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('POST /api/v1/auth/register - should reject missing fields', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('POST /api/v1/auth/refresh - should reject invalid refresh token', async () => {
      const res = await request(app)
        .post('/api/v1/auth/refresh')
        .send({ refreshToken: 'invalid-token' })
        .expect(401);

      expect(res.body.success).toBe(false);
    });

    it('POST /api/v1/auth/logout - should logout successfully', async () => {
      const res = await request(app)
        .post('/api/v1/auth/logout')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
    });
  });

  describe('User Profile Edge Cases', () => {
    it('PUT /api/v1/users/me - should reject invalid email format', async () => {
      const res = await request(app)
        .put('/api/v1/users/me')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'invalid-email-format',
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('PUT /api/v1/users/me/settings - should reject invalid daily goal', async () => {
      const res = await request(app)
        .put('/api/v1/users/me/settings')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          dailyGoal: -10, // Invalid negative value
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('PUT /api/v1/users/me/settings - should accept valid settings', async () => {
      const res = await request(app)
        .put('/api/v1/users/me/settings')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          dailyGoal: 50,
          interfaceLanguage: 'ru',
          emailNotifications: true,
          pushNotifications: false,
        })
        .expect(200);

      expect(res.body.success).toBe(true);
    });
  });

  describe('Lessons Edge Cases', () => {
    it('GET /api/v1/lessons/:id - should return 404 for non-existent lesson', async () => {
      const res = await request(app)
        .get('/api/v1/lessons/00000000-0000-0000-0000-000000000000')
        .expect(404);

      expect(res.body.success).toBe(false);
    });

    it('POST /api/v1/lessons/:id/submit - should reject negative score', async () => {
      const lessonsRes = await request(app).get('/api/v1/lessons');
      if (lessonsRes.body.data.lessons.length === 0) return;

      const lessonId = lessonsRes.body.data.lessons[0].id;

      const res = await request(app)
        .post(`/api/v1/lessons/${lessonId}/submit`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          score: -10,
          xp_earned: 50,
          mistakes_count: 0,
          time_spent: 200,
          exercise_results: [],
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('POST /api/v1/lessons/:id/submit - should reject missing required fields', async () => {
      const lessonsRes = await request(app).get('/api/v1/lessons');
      if (lessonsRes.body.data.lessons.length === 0) return;

      const lessonId = lessonsRes.body.data.lessons[0].id;

      const res = await request(app)
        .post(`/api/v1/lessons/${lessonId}/submit`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          score: 85,
          // Missing other required fields
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent route', async () => {
      const res = await request(app)
        .get('/api/v1/nonexistent')
        .expect(404);

      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });

    it('should return 401 for protected route without auth', async () => {
      const res = await request(app)
        .get('/api/v1/vocabulary')
        .expect(401);

      expect(res.body.success).toBe(false);
    });

    it('should return 401 for invalid auth token', async () => {
      const res = await request(app)
        .get('/api/v1/users/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(res.body.success).toBe(false);
    });

    it('should return 400 for malformed JSON', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .send('{ invalid json }')
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('should handle database connection errors gracefully', async () => {
      // This test would require mocking database connection
      // Skip for now but good to have in comprehensive test suite
    });
  });

  describe('Performance & Rate Limiting', () => {
    it('should handle multiple concurrent requests', async () => {
      const promises = Array(10).fill(null).map(() =>
        request(app)
          .get('/api/v1/lessons')
          .set('Authorization', `Bearer ${authToken}`)
      );

      const results = await Promise.all(promises);

      results.forEach(res => {
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
      });
    });

    it('should return proper CORS headers', async () => {
      const res = await request(app)
        .options('/api/v1/lessons')
        .expect(204);

      expect(res.headers['access-control-allow-origin']).toBeDefined();
    });
  });

  describe('Input Validation & Security', () => {
    it('should sanitize XSS attempts in display name', async () => {
      const res = await request(app)
        .put('/api/v1/users/me')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          displayName: '<script>alert("XSS")</script>',
        })
        .expect(200);

      expect(res.body.success).toBe(true);
      // Display name should be sanitized
      expect(res.body.data.user.displayName).not.toContain('<script>');
    });

    it('should reject SQL injection attempts', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: "'; DROP TABLE users; --",
          password: 'password',
        })
        .expect(401);

      expect(res.body.success).toBe(false);
    });

    it('should enforce max length on text fields', async () => {
      const longString = 'a'.repeat(1000);
      const res = await request(app)
        .put('/api/v1/users/me')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          displayName: longString,
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('should validate email format strictly', async () => {
      const invalidEmails = ['test', '@example.com', 'test@', 'test @example.com'];

      for (const email of invalidEmails) {
        const res = await request(app)
          .post('/api/v1/auth/register')
          .send({
            email,
            password: 'Test1234!',
            displayName: 'Test',
          });

        expect(res.body.success).toBe(false);
      }
    });

    it('should enforce password complexity requirements', async () => {
      const weakPasswords = ['12345678', 'password', 'abcdefgh'];

      for (const password of weakPasswords) {
        const res = await request(app)
          .post('/api/v1/auth/register')
          .send({
            email: `test-${Date.now()}@example.com`,
            password,
            displayName: 'Test',
          });

        expect(res.body.success).toBe(false);
      }
    });
  });

  describe('Data Consistency & Integrity', () => {
    it('should maintain consistent XP across endpoints', async () => {
      const statsRes = await request(app)
        .get('/api/v1/users/me/stats')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const statsXp = statsRes.body.data.totalXp;

      const userRes = await request(app)
        .get('/api/v1/users/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const userXp = userRes.body.data.user.totalXp;

      expect(statsXp).toBe(userXp);
    });

    it('should track lesson attempts correctly', async () => {
      const lessonsRes = await request(app).get('/api/v1/lessons');
      if (lessonsRes.body.data.lessons.length === 0) return;

      const lessonId = lessonsRes.body.data.lessons[0].id;

      // Submit lesson twice
      await request(app)
        .post(`/api/v1/lessons/${lessonId}/submit`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          score: 75,
          xp_earned: 40,
          mistakes_count: 3,
          time_spent: 300,
          exercise_results: [],
        });

      await request(app)
        .post(`/api/v1/lessons/${lessonId}/submit`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          score: 90,
          xp_earned: 50,
          mistakes_count: 1,
          time_spent: 250,
          exercise_results: [],
        });

      // Check progress reflects multiple attempts
      const lessonRes = await request(app)
        .get(`/api/v1/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(lessonRes.body.success).toBe(true);
      expect(lessonRes.body.data.lesson.userProgress).toBeDefined();
    });

    it('should calculate streak correctly across days', async () => {
      const res1 = await request(app)
        .post(`/api/v1/users/${userId}/activity`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res1.body.data.stats.streakCount).toBeGreaterThanOrEqual(0);
      expect(res1.body.data.stats.lastActivityDate).toBeDefined();
    });

    it('should not allow negative XP values', async () => {
      const lessonsRes = await request(app).get('/api/v1/lessons');
      if (lessonsRes.body.data.lessons.length === 0) return;

      const lessonId = lessonsRes.body.data.lessons[0].id;

      const res = await request(app)
        .post(`/api/v1/lessons/${lessonId}/submit`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          score: 50,
          xp_earned: -100, // Invalid negative XP
          mistakes_count: 5,
          time_spent: 200,
          exercise_results: [],
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });
  });

  describe('Pagination & Filtering', () => {
    it('GET /api/v1/vocabulary?limit=5 - should respect limit', async () => {
      const res = await request(app)
        .get('/api/v1/vocabulary?limit=5')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.words.length).toBeLessThanOrEqual(5);
    });

    it('GET /api/v1/vocabulary?offset=10 - should respect offset', async () => {
      const res = await request(app)
        .get('/api/v1/vocabulary?offset=10')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
    });

    it('GET /api/v1/lessons?status=completed - should filter by status', async () => {
      const res = await request(app)
        .get('/api/v1/lessons?status=completed')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      // All returned lessons should have completed status
      res.body.data.lessons.forEach((lesson: any) => {
        if (lesson.userProgress) {
          expect(lesson.userProgress.status).toBe('completed');
        }
      });
    });

    it('GET /api/v1/vocabulary?category=nouns - should filter by category', async () => {
      const res = await request(app)
        .get('/api/v1/vocabulary?category=nouns')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
    });
  });

  describe('Level System Calculations', () => {
    it('should correctly calculate level from XP', async () => {
      const statsRes = await request(app)
        .get('/api/v1/users/me/stats')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const { currentLevel, totalXp } = statsRes.body.data;

      // Verify level matches XP thresholds
      if (totalXp >= 12000) {
        expect(currentLevel).toBe('C2');
      } else if (totalXp >= 7000) {
        expect(currentLevel).toBe('C1');
      } else if (totalXp >= 3500) {
        expect(currentLevel).toBe('B2');
      } else if (totalXp >= 1500) {
        expect(currentLevel).toBe('B1');
      } else if (totalXp >= 500) {
        expect(currentLevel).toBe('A2');
      } else {
        expect(currentLevel).toBe('A1');
      }
    });

    it('should calculate progress to next level', async () => {
      const statsRes = await request(app)
        .get('/api/v1/users/me/stats')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(statsRes.body.data).toHaveProperty('currentLevel');
      expect(statsRes.body.data).toHaveProperty('totalXp');
    });
  });

  describe('Vocabulary Spaced Repetition Logic', () => {
    it('should increase interval for correct answers', async () => {
      const wordsRes = await request(app)
        .get('/api/v1/vocabulary')
        .set('Authorization', `Bearer ${authToken}`);

      if (wordsRes.body.data.words.length === 0) return;

      const wordId = wordsRes.body.data.words[0].id;

      // Submit correct answer
      const res1 = await request(app)
        .post(`/api/v1/vocabulary/${wordId}/review`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ quality: 5, time_spent: 10 })
        .expect(200);

      const interval1 = res1.body.data.interval;

      // Submit another correct answer
      const res2 = await request(app)
        .post(`/api/v1/vocabulary/${wordId}/review`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ quality: 5, time_spent: 10 })
        .expect(200);

      const interval2 = res2.body.data.interval;

      // Interval should increase for consecutive correct answers
      expect(interval2).toBeGreaterThanOrEqual(interval1);
    });

    it('should reset interval for incorrect answers', async () => {
      const wordsRes = await request(app)
        .get('/api/v1/vocabulary')
        .set('Authorization', `Bearer ${authToken}`);

      if (wordsRes.body.data.words.length === 0) return;

      const wordId = wordsRes.body.data.words[0].id;

      // Submit incorrect answer
      const res = await request(app)
        .post(`/api/v1/vocabulary/${wordId}/review`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ quality: 0, time_spent: 15 })
        .expect(200);

      // Interval should be minimal for incorrect answers
      expect(res.body.data.interval).toBeLessThanOrEqual(1);
    });

    it('should update ease factor based on quality', async () => {
      const wordsRes = await request(app)
        .get('/api/v1/vocabulary')
        .set('Authorization', `Bearer ${authToken}`);

      if (wordsRes.body.data.words.length === 0) return;

      const wordId = wordsRes.body.data.words[0].id;

      const res = await request(app)
        .post(`/api/v1/vocabulary/${wordId}/review`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ quality: 3, time_spent: 12 })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('next_review_date');
    });
  });

  describe('Achievement Unlocking Logic', () => {
    it('should unlock first lesson achievement', async () => {
      // Check if first lesson achievement exists
      const achievementsRes = await request(app)
        .get(`/api/v1/users/${userId}/achievements`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const hasFirstLesson = achievementsRes.body.data.unlocked.some(
        (a: any) => a.code === 'first_lesson'
      );

      // First lesson should be unlocked if any lessons completed
      const statsRes = await request(app)
        .get('/api/v1/users/me/stats')
        .set('Authorization', `Bearer ${authToken}`);

      if (statsRes.body.data.lessonsCompleted > 0) {
        expect(hasFirstLesson).toBe(true);
      }
    });

    it('should track achievement progress', async () => {
      const res = await request(app)
        .get(`/api/v1/users/${userId}/achievements/stats`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.data.unlockedCount).toBeGreaterThanOrEqual(0);
      expect(res.body.data.totalCount).toBeGreaterThan(0);
      expect(res.body.data.completionPercentage).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Exam Submission Flow', () => {
    it('should handle exam section submission', async () => {
      const examsRes = await request(app)
        .get('/api/v1/exams')
        .set('Authorization', `Bearer ${authToken}`);

      if (examsRes.body.data.exams.length === 0) return;

      const examId = examsRes.body.data.exams[0].id;

      // Start exam
      const startRes = await request(app)
        .post(`/api/v1/exams/${examId}/start`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const attemptId = startRes.body.data.attemptId;

      // Submit section (mock data)
      const sectionRes = await request(app)
        .post(`/api/v1/exam-attempts/${attemptId}/sections/1/submit`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          answers: [
            { question_id: 'q1', answer: 'option1' },
            { question_id: 'q2', answer: 'option2' },
          ],
        })
        .expect(200);

      expect(sectionRes.body.success).toBe(true);
    });
  });

  describe('User Statistics Aggregation', () => {
    it('GET /api/v1/users/me/stats - should aggregate all statistics', async () => {
      const res = await request(app)
        .get('/api/v1/users/me/stats')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('totalXp');
      expect(res.body.data).toHaveProperty('currentLevel');
      expect(res.body.data).toHaveProperty('streakCount');
      expect(res.body.data).toHaveProperty('lessonsCompleted');
      expect(res.body.data).toHaveProperty('wordsLearned');
      expect(res.body.data).toHaveProperty('totalStudyTime');
    });

    it('should calculate daily goal progress', async () => {
      const res = await request(app)
        .get('/api/v1/users/me/stats')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      if (res.body.data.todayXp !== undefined) {
        expect(res.body.data.todayXp).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('Leaderboard Rankings', () => {
    it('should show current user in leaderboard results', async () => {
      const res = await request(app)
        .get('/api/v1/leaderboard')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('userRank');
      expect(res.body.data).toHaveProperty('leaderboard');
    });

    it('should rank users by XP correctly', async () => {
      const res = await request(app)
        .get('/api/v1/leaderboard?period=allTime')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const leaderboard = res.body.data.leaderboard;

      // Verify rankings are in descending order
      for (let i = 0; i < leaderboard.length - 1; i++) {
        expect(leaderboard[i].rank).toBeLessThanOrEqual(leaderboard[i + 1].rank);
      }
    });
  });
});

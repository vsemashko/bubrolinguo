import axios from 'axios';

/**
 * Simple API testing script for Bubrolinguo
 * Tests basic endpoints to verify API is working
 */

const API_URL = process.env.API_URL || 'http://localhost:3001';
const api = axios.create({ baseURL: API_URL });

// Test results
let passed = 0;
let failed = 0;

async function test(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    console.log(`✅ PASS: ${name}`);
    passed++;
  } catch (error: any) {
    console.log(`❌ FAIL: ${name}`);
    console.log(`   Error: ${error.message}`);
    if (error.response?.data) {
      console.log(`   Response:`, error.response.data);
    }
    failed++;
  }
}

async function runTests() {
  console.log('\n🧪 Testing Bubrolinguo API\n');
  console.log(`API URL: ${API_URL}\n`);

  let authToken = '';
  let _userId = '';

  // Test 1: Health Check
  await test('GET / - Health check', async () => {
    const response = await api.get('/');
    if (!response.data.success) {throw new Error('Health check failed');}
  });

  // Test 2: Register a new user
  await test('POST /api/v1/auth/register - Register user', async () => {
    const testEmail = `test${Date.now()}@example.com`;
    const response = await api.post('/api/v1/auth/register', {
      email: testEmail,
      password: 'TestPassword123!',
      displayName: 'Test User',
      interfaceLanguage: 'en',
    });

    if (!response.data.success) {throw new Error('Registration failed');}
    if (!response.data.data.token) {throw new Error('No token received');}

    authToken = response.data.data.token;
    _userId = response.data.data.user.id;
  });

  // Test 3: Get current user
  await test('GET /api/v1/users/me - Get current user', async () => {
    const response = await api.get('/api/v1/users/me', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.data.success) {throw new Error('Failed to get user');}
    if (!response.data.data.user.id) {throw new Error('No user ID in response');}
  });

  // Test 4: Get lessons (public)
  await test('GET /api/v1/lessons - Get all lessons', async () => {
    const response = await api.get('/api/v1/lessons');

    if (!response.data.success) {throw new Error('Failed to get lessons');}
    if (!Array.isArray(response.data.data.lessons)) {throw new Error('Lessons is not an array');}
  });

  // Test 5: Get lessons with auth (should show progress)
  await test('GET /api/v1/lessons - Get lessons with auth', async () => {
    const response = await api.get('/api/v1/lessons', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.data.success) {throw new Error('Failed to get lessons');}
    if (response.data.data.lessons.length === 0) {
      console.log('   ⚠️  Warning: No lessons found. Did you run db:seed?');
    }
  });

  // Test 6: Get specific lesson
  await test('GET /api/v1/lessons/:id - Get lesson details', async () => {
    // First get all lessons to find an ID
    const lessonsResponse = await api.get('/api/v1/lessons');
    const lessons = lessonsResponse.data.data.lessons;

    if (lessons.length === 0) {
      console.log('   ⚠️  Skipping: No lessons in database');
      return;
    }

    const lessonId = lessons[0].id;
    const response = await api.get(`/api/v1/lessons/${lessonId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.data.success) {throw new Error('Failed to get lesson');}
    if (!response.data.data.lesson.exercises) {throw new Error('No exercises in lesson');}
  });

  // Test 7: Get vocabulary review queue
  await test('GET /api/v1/vocabulary/review - Get review queue', async () => {
    const response = await api.get('/api/v1/vocabulary/review', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.data.success) {throw new Error('Failed to get review queue');}
  });

  // Test 8: Get vocabulary stats
  await test('GET /api/v1/vocabulary/stats - Get vocabulary stats', async () => {
    const response = await api.get('/api/v1/vocabulary/stats', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.data.success) {throw new Error('Failed to get vocabulary stats');}
  });

  // Test 9: Get dashboard data
  await test('GET /api/v1/progress/dashboard - Get dashboard', async () => {
    const response = await api.get('/api/v1/progress/dashboard', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.data.success) {throw new Error('Failed to get dashboard');}
    if (!response.data.data.user) {throw new Error('No user in dashboard');}
  });

  // Test 10: Get achievements
  await test('GET /api/v1/progress/achievements - Get achievements', async () => {
    const response = await api.get('/api/v1/progress/achievements', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.data.success) {throw new Error('Failed to get achievements');}
    if (!Array.isArray(response.data.data.achievements)) {throw new Error('Achievements is not an array');}

    if (response.data.data.achievements.length === 0) {
      console.log('   ⚠️  Warning: No achievements found. Did you run db:seed?');
    }
  });

  // Test 11: Get leaderboard
  await test('GET /api/v1/progress/leaderboard - Get leaderboard', async () => {
    const response = await api.get('/api/v1/progress/leaderboard', {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.data.success) {throw new Error('Failed to get leaderboard');}
  });

  // Test 12: Update user profile
  await test('PUT /api/v1/users/me - Update profile', async () => {
    const response = await api.put(
      '/api/v1/users/me',
      {
        displayName: 'Updated Test User',
        interfaceLanguage: 'ru',
      },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    if (!response.data.success) {throw new Error('Failed to update profile');}
  });

  // Test 13: Invalid auth token
  await test('Authentication - Reject invalid token', async () => {
    try {
      await api.get('/api/v1/users/me', {
        headers: { Authorization: 'Bearer invalid-token' },
      });
      throw new Error('Should have rejected invalid token');
    } catch (error: any) {
      if (error.response?.status !== 401) {
        throw new Error('Should return 401 for invalid token');
      }
      // This is expected - test passes
    }
  });

  // Test 14: Missing auth token
  await test('Authentication - Reject missing token', async () => {
    try {
      await api.get('/api/v1/users/me');
      throw new Error('Should have rejected missing token');
    } catch (error: any) {
      if (error.response?.status !== 401) {
        throw new Error('Should return 401 for missing token');
      }
      // This is expected - test passes
    }
  });

  // Print results
  console.log('\n' + '='.repeat(50));
  console.log(`\n✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📊 Total:  ${passed + failed}`);

  if (failed === 0) {
    console.log('\n🎉 All tests passed!\n');
  } else {
    console.log('\n⚠️  Some tests failed. Check the output above.\n');
    process.exit(1);
  }
}

// Run tests
runTests().catch((error) => {
  console.error('\n💥 Test suite crashed:', error);
  process.exit(1);
});

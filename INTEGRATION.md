# Frontend-Backend Integration Guide

This guide covers the integration between the Next.js web app and the Express API backend.

---

## Overview

The Bubrolinguo application consists of:
- **API Server** (Express + PostgreSQL + Redis) - Port 3001
- **Web App** (Next.js 14 + React) - Port 3000

Both communicate via RESTful API endpoints with JWT authentication.

---

## Architecture

```
┌─────────────────┐         HTTP/JSON          ┌─────────────────┐
│                 │   ←────────────────────→   │                 │
│   Next.js Web   │     JWT Auth (Bearer)      │   Express API   │
│   (Frontend)    │                             │    (Backend)    │
│   Port 3000     │                             │   Port 3001     │
│                 │                             │                 │
└─────────────────┘                             └────────┬────────┘
                                                         │
                                                         ├─► PostgreSQL
                                                         └─► Redis (cache)
```

---

## Authentication Flow

### 1. User Registration

```
┌──────┐     POST /api/v1/auth/register      ┌─────┐
│ User │ ─────────────────────────────────►  │ API │
└──────┘                                      └─────┘
   │     { email, password, displayName }       │
   │                                            │
   │    ◄─────────────────────────────────────┤
   │         { user, token, refreshToken }     │
   │                                            │
   └─► Store tokens in localStorage
```

### 2. User Login

```
┌──────┐     POST /api/v1/auth/login         ┌─────┐
│ User │ ─────────────────────────────────►  │ API │
└──────┘                                      └─────┘
   │          { email, password }              │
   │                                            │
   │    ◄─────────────────────────────────────┤
   │         { user, token, refreshToken }     │
   │                                            │
   └─► Store tokens in localStorage
```

### 3. Authenticated Requests

```
┌──────┐     GET /api/v1/lessons             ┌─────┐
│ User │ ─────────────────────────────────►  │ API │
└──────┘   Authorization: Bearer <token>     └─────┘
   │                                            │
   │                                        Validate JWT
   │                                            │
   │    ◄─────────────────────────────────────┤
   │         { lessons: [...], total: 15 }     │
```

### 4. Token Refresh

```
┌──────┐     POST /api/v1/auth/refresh       ┌─────┐
│ User │ ─────────────────────────────────►  │ API │
└──────┘      { refreshToken }                └─────┘
   │                                            │
   │    ◄─────────────────────────────────────┤
   │         { token, refreshToken }           │
   │                                            │
   └─► Update token in localStorage
```

---

## API Client Structure

### Base API Client (`/lib/api.ts`)

Handles all HTTP requests with:
- Automatic JWT token injection
- Token refresh on 401 errors
- Consistent error handling
- TypeScript types

```typescript
import { get, post, put, del } from '@/lib/api';

// GET request
const response = await get('/api/v1/lessons');

// POST request
const response = await post('/api/v1/lessons/123/complete', {
  score: 85,
  timeSpent: 900
});
```

### Service Layer

Services encapsulate API calls for specific domains:

| Service | File | Purpose |
|---------|------|---------|
| Auth | `lib/auth.ts` | Login, register, logout |
| User | `services/user.service.ts` | User profile management |
| Lessons | `services/lessons.service.ts` | Lesson data and completion |
| Vocabulary | `services/vocabulary.service.ts` | Vocabulary and spaced repetition |
| Progress | `services/progress.service.ts` | Dashboard, achievements, leaderboard |

---

## State Management

### Auth Context (`contexts/AuthContext.tsx`)

Global authentication state using React Context:

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  return <div>Hello, {user.displayName}!</div>;
}
```

**Available methods:**
- `user` - Current user object (or null)
- `loading` - Loading state
- `isAuthenticated` - Boolean authentication status
- `login(email, password)` - Login user
- `register(data)` - Register new user
- `logout()` - Logout user
- `refreshUser()` - Reload user data

### Protected Routes

Use the `withAuth` HOC to protect routes:

```typescript
import { withAuth } from '@/contexts/AuthContext';

function DashboardPage() {
  return <div>Protected Dashboard Content</div>;
}

export default withAuth(DashboardPage);
```

---

## Data Fetching Patterns

### 1. Client-Side Fetching (Recommended)

Use React hooks for dynamic data:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getLessons } from '@/services/lessons.service';

export default function LessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLessons() {
      const response = await getLessons();
      if (response.success) {
        setLessons(response.data.lessons);
      }
      setLoading(false);
    }

    fetchLessons();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {lessons.map(lesson => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}
```

### 2. Server-Side Fetching (For SEO)

For public pages that need SEO:

```typescript
import { getLessons } from '@/services/lessons.service';

export default async function PublicLessonsPage() {
  const response = await getLessons();
  const lessons = response.data?.lessons || [];

  return (
    <div>
      {lessons.map(lesson => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}
```

---

## Common Integration Patterns

### Pattern 1: Submit Lesson Completion

```typescript
import { submitLessonResult } from '@/services/lessons.service';
import { useAuth } from '@/contexts/AuthContext';

function LessonPlayer({ lessonId }) {
  const { refreshUser } = useAuth();

  async function handleComplete(score: number, timeSpent: number) {
    const response = await submitLessonResult(lessonId, {
      score,
      timeSpent,
    });

    if (response.success) {
      const { progress, achievements } = response.data;

      // Show XP earned
      showNotification(`+${progress.xpEarned} XP!`);

      // Show new achievements
      if (achievements.length > 0) {
        showAchievements(achievements);
      }

      // Refresh user data to update XP/level
      await refreshUser();
    }
  }

  return <LessonContent onComplete={handleComplete} />;
}
```

### Pattern 2: Vocabulary Review

```typescript
import { getReviewQueue, submitReviewResult } from '@/services/vocabulary.service';

function VocabularyReview() {
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadQueue() {
      const response = await getReviewQueue(20);
      if (response.success) {
        setQueue(response.data.reviewQueue);
      }
    }
    loadQueue();
  }, []);

  async function handleAnswer(correct: boolean, timeSpent: number) {
    const word = queue[currentIndex];

    const response = await submitReviewResult(word.id, {
      correct,
      timeSpent,
    });

    if (response.success) {
      // Move to next word
      setCurrentIndex(prev => prev + 1);
    }
  }

  const currentWord = queue[currentIndex];

  return (
    <VocabularyCard
      word={currentWord}
      onAnswer={handleAnswer}
    />
  );
}
```

### Pattern 3: Dashboard Data

```typescript
import { getDashboardData } from '@/services/progress.service';
import { useAuth } from '@/contexts/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      const response = await getDashboardData();
      if (response.success) {
        setDashboard(response.data);
      }
    }
    loadDashboard();
  }, []);

  if (!dashboard) return <Loading />;

  return (
    <div>
      <UserHeader user={user} />
      <Stats stats={dashboard.stats} />
      <RecentActivity activity={dashboard.recentActivity} />
      <UpcomingReviews count={dashboard.upcomingReviews} />
    </div>
  );
}
```

---

## Error Handling

### Standard Error Response

```typescript
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Human-readable error message"
  }
}
```

### Handling Errors

```typescript
const response = await getLessons();

if (!response.success) {
  // Show error to user
  if (response.error?.code === 'AUTHENTICATION_ERROR') {
    router.push('/login');
  } else {
    showError(response.error?.message || 'Something went wrong');
  }
  return;
}

// Success - use data
const lessons = response.data.lessons;
```

---

## Environment Variables

### Web App (`.env.local`)

```bash
# API Server URL
NEXT_PUBLIC_API_URL=http://localhost:3001

# For production:
# NEXT_PUBLIC_API_URL=https://api.bubrolinguo.com
```

### API Server (`.env`)

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# CORS - Allow web app origin
CORS_ORIGIN=http://localhost:3000

# For production:
# CORS_ORIGIN=https://bubrolinguo.vercel.app

# Database & JWT (see .env.example)
```

---

## Running Both Services

### Development Mode

**Terminal 1 - API Server:**
```bash
cd apps/api
npm run dev
# Runs on http://localhost:3001
```

**Terminal 2 - Web App:**
```bash
cd apps/web
npm run dev
# Runs on http://localhost:3000
```

**Terminal 3 - Database (if needed):**
```bash
# Ensure PostgreSQL is running
# Run migrations and seeding
cd apps/api
npm run db:init
```

### Testing the Integration

1. **Start both servers**
2. **Open browser:** http://localhost:3000
3. **Register a new user**
4. **Complete a lesson**
5. **Check dashboard for XP and progress**

---

## API Response Caching (Optional)

For better performance, consider caching API responses:

```typescript
import { useEffect, useState } from 'react';

// Simple cache implementation
const cache = new Map();

export function useCachedAPI<T>(key: string, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(cache.get(key) || null);
  const [loading, setLoading] = useState(!cache.has(key));

  useEffect(() => {
    if (cache.has(key)) {
      setData(cache.get(key));
      return;
    }

    fetcher().then(result => {
      cache.set(key, result);
      setData(result);
      setLoading(false);
    });
  }, [key]);

  return { data, loading };
}

// Usage
const { data: lessons, loading } = useCachedAPI('lessons', async () => {
  const response = await getLessons();
  return response.data?.lessons || [];
});
```

---

## Troubleshooting

### Issue: CORS Errors

**Symptom:** Browser console shows CORS policy errors

**Solution:**
1. Check API server `.env` has correct `CORS_ORIGIN`
2. Ensure web app URL matches exactly (no trailing slash)
3. Restart API server after changing `.env`

### Issue: 401 Unauthorized

**Symptom:** All API requests return 401

**Solution:**
1. Check if token exists: `localStorage.getItem('auth_token')`
2. Try logging out and logging back in
3. Check token expiration (JWT tokens expire in 1 hour)
4. Verify API server `JWT_SECRET` is set

### Issue: Network Error

**Symptom:** "Network error" messages

**Solution:**
1. Verify API server is running on port 3001
2. Check `NEXT_PUBLIC_API_URL` in web app `.env.local`
3. Ensure no firewall is blocking connections
4. Try accessing API directly: http://localhost:3001

### Issue: Data Not Updating

**Symptom:** User XP/progress doesn't update after completing lessons

**Solution:**
1. Call `refreshUser()` after actions that change user data
2. Check browser console for errors
3. Verify API is returning updated data

---

## Best Practices

### 1. Always Handle Loading States

```typescript
if (loading) {
  return <LoadingSpinner />;
}

if (!data) {
  return <ErrorMessage />;
}

return <Content data={data} />;
```

### 2. Use TypeScript Types

Import types from service files:

```typescript
import type { Lesson } from '@/types/lesson';
import type { User } from '@/types/auth';
```

### 3. Centralize API Calls

Don't call `fetch()` directly - always use service functions:

```typescript
// ❌ Bad
const response = await fetch(`${API_URL}/api/v1/lessons`);

// ✅ Good
const response = await getLessons();
```

### 4. Handle Errors Gracefully

```typescript
try {
  const response = await submitLessonResult(id, data);
  if (response.success) {
    // Handle success
  } else {
    showError(response.error?.message);
  }
} catch (error) {
  showError('Network error. Please try again.');
}
```

---

## Next Steps

After integration is complete:

1. ✅ Test all major flows (register, login, lessons, vocabulary)
2. ⬜ Add loading skeletons for better UX
3. ⬜ Implement error boundaries
4. ⬜ Add analytics tracking
5. ⬜ Set up Sentry for error monitoring
6. ⬜ Deploy both services to production

---

## Support

For integration issues:
- Check API documentation: `apps/api/API.md`
- Review API test script: `apps/api/src/test-api.ts`
- Test API endpoints directly with curl or Postman

---

**Last Updated:** 2025-11-21
**Version:** 0.1.0

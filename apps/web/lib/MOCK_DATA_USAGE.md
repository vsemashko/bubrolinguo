# Mock Data Usage Guide

## Overview

The `mockData.ts` file provides comprehensive mock data for frontend development when the API is not available. This allows you to develop and test UI components without a live backend connection.

## Quick Start

### 1. Enable Mock Mode

Create or update `.env.local` in the web app directory:

```env
NEXT_PUBLIC_USE_MOCK_DATA=true
```

### 2. Import Mock Data

```typescript
import {
  mockUser,
  mockLessons,
  mockVocabulary,
  mockUserVocabulary,
  mockAchievements,
  mockExam,
  mockUserProgress,
  useMockData,
  mockDelay,
  mockApiResponse,
} from '@/lib/mockData';
```

### 3. Use in Components

```typescript
'use client';

import { useEffect, useState } from 'react';
import { mockLessons, useMockData, mockDelay, type Lesson } from '@/lib/mockData';
import { lessonsService } from '@/services';

export function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        if (useMockData()) {
          // Use mock data in development
          await mockDelay(500); // Simulate network latency
          setLessons(mockLessons);
        } else {
          // Use real API in production
          const response = await lessonsService.getLessons();
          setLessons(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              {lesson.titleEn} - {lesson.level}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## Available Mock Data

### User Data

```typescript
import { mockUser } from '@/lib/mockData';

// Mock user with A2 level, 1250 XP, 7-day streak
console.log(mockUser);
```

### Lessons

```typescript
import { mockLessons, generateMockLessons } from '@/lib/mockData';

// 11 predefined lessons (A1, A2, B1, B2)
console.log(mockLessons);

// Generate custom lessons
const customLessons = generateMockLessons(10, 'A1');
```

### Vocabulary

```typescript
import { mockVocabulary, mockUserVocabulary, generateMockVocabulary } from '@/lib/mockData';

// 10 predefined vocabulary words
console.log(mockVocabulary);

// User vocabulary with spaced repetition data
console.log(mockUserVocabulary);

// Generate custom vocabulary
const customVocab = generateMockVocabulary(50, 'B1');
```

### Achievements

```typescript
import { mockAchievements } from '@/lib/mockData';

// 5 achievements (3 unlocked, 2 locked)
console.log(mockAchievements);
```

### Mock Exam

```typescript
import { mockExam } from '@/lib/mockData';

// Complete A1 exam with 4 sections
console.log(mockExam);
console.log(mockExam.sections); // Reading, Listening, Writing, Speaking
```

### User Progress

```typescript
import { mockUserProgress } from '@/lib/mockData';

// Overall user progress statistics
console.log(mockUserProgress);
```

## Utility Functions

### Check if Mock Mode is Enabled

```typescript
import { useMockData } from '@/lib/mockData';

if (useMockData()) {
  console.log('Using mock data');
} else {
  console.log('Using real API');
}
```

### Simulate Network Delay

```typescript
import { mockDelay } from '@/lib/mockData';

// Default 500ms delay
await mockDelay();

// Custom delay
await mockDelay(1000); // 1 second
```

### Create Mock API Response

```typescript
import { mockApiResponse } from '@/lib/mockData';

// Success response
const response = mockApiResponse({ user: mockUser });
// { success: true, data: { user: {...} } }

// Error response
const errorResponse = mockApiResponse({ message: 'Not found' }, false);
// { success: false, data: { message: 'Not found' } }
```

## Service Integration Example

Update your services to support mock mode:

```typescript
// services/lessons.service.ts
import { mockLessons, useMockData, mockDelay, mockApiResponse } from '@/lib/mockData';
import { api } from '@/lib/api';

export const lessonsService = {
  async getLessons() {
    if (useMockData()) {
      await mockDelay();
      return mockApiResponse(mockLessons);
    }
    return api.get('/api/v1/lessons');
  },

  async getLessonById(id: string) {
    if (useMockData()) {
      await mockDelay();
      const lesson = mockLessons.find((l) => l.id === id);
      return mockApiResponse(lesson);
    }
    return api.get(`/api/v1/lessons/${id}`);
  },
};
```

## Data Types

All mock data includes TypeScript types:

```typescript
import type {
  User,
  Lesson,
  Exercise,
  VocabularyWord,
  UserVocabulary,
  Achievement,
  MockExam,
  ExamSection,
  ExamQuestion,
  UserProgress,
} from '@/lib/mockData';
```

## Mock Data Contents

### Lessons (11 total)
- **A1 Lessons (5)**: Greetings, Numbers, Family, Colors, Days of Week
- **A2 Lessons (2)**: Past Tense, Describing People
- **B1 Lessons (2)**: Expressing Opinions, Conditional Mood
- **B2 Lessons (2)**: Advanced Verb Aspects, Business Communication

### Vocabulary (10 words)
- **A1 (7 words)**: cześć, dziękuję, proszę, dom, woda, książka, nauczyciel
- **B1 (2 words)**: przyszłość, wykształcenie
- **B2 (1 word)**: osiągnięcie

### User Vocabulary (7 words)
- Includes spaced repetition data: repetitions, easiness factor, interval
- Next review dates calculated
- 4 words marked as learned

### Achievements (5 total)
- **Unlocked (3)**: First Steps, Word Wizard, Streak Starter
- **Locked (2)**: Grammar Master, Exam Ready

### Mock Exam
- **Level**: A1
- **Duration**: 90 minutes
- **Sections (4)**: Reading (20min), Listening (15min), Writing (30min), Speaking (25min)
- **Total Points**: 100
- **Passing Score**: 60%

### User Progress
- **Total XP**: 1,250
- **Current Level**: A2
- **Lessons Completed**: 12
- **Vocabulary Learned**: 87
- **Current Streak**: 7 days
- **Longest Streak**: 14 days
- **Study Time**: 340 minutes

## Best Practices

### 1. Always Check Mock Mode First

```typescript
const data = useMockData() ? mockLessons : await api.get('/lessons');
```

### 2. Add Realistic Delays

```typescript
if (useMockData()) {
  await mockDelay(300); // Simulate fast API
}
```

### 3. Handle Both Modes in Services

Create a service layer that abstracts mock vs real data:

```typescript
// lib/dataProvider.ts
import { useMockData } from './mockData';

export const getDataProvider = () => {
  return useMockData() ? mockDataProvider : apiDataProvider;
};
```

### 4. Use for Component Testing

```typescript
// __tests__/LessonCard.test.tsx
import { render } from '@testing-library/react';
import { mockLessons } from '@/lib/mockData';
import { LessonCard } from '@/components/LessonCard';

test('renders lesson card', () => {
  const { getByText } = render(<LessonCard lesson={mockLessons[0]} />);
  expect(getByText('Greetings and Introductions')).toBeInTheDocument();
});
```

### 5. Extend Mock Data as Needed

```typescript
// Create custom mock data for specific test cases
const customMockLesson: Lesson = {
  ...mockLessons[0],
  titleEn: 'Custom Test Lesson',
  xpReward: 9999,
};
```

## Development Workflow

1. **Start with Mock Data**: Develop UI components using mock data
2. **Test Interactions**: Verify all user interactions work with mock data
3. **Add Loading States**: Test with `mockDelay()` to ensure loading states work
4. **Switch to Real API**: Set `NEXT_PUBLIC_USE_MOCK_DATA=false` once backend is ready
5. **Verify Integration**: Ensure the real API works the same as mock data

## Troubleshooting

### Mock data not loading?
- Check `.env.local` has `NEXT_PUBLIC_USE_MOCK_DATA=true`
- Restart Next.js dev server after changing environment variables

### Types not matching?
- Ensure mock data types match API response types
- Update mock data types when API changes

### Need more data?
- Use generator functions: `generateMockLessons()`, `generateMockVocabulary()`
- Add new mock data to `mockData.ts` as needed

## Future Enhancements

Consider adding:
- Mock data for exercises
- More diverse vocabulary across all levels
- Complete exam questions for all sections
- User statistics and analytics data
- Social features (friends, leaderboards)
- Notifications and reminders

## Related Files

- `lib/mockData.ts` - Mock data definitions
- `lib/api.ts` - API client
- `services/*.service.ts` - Service layer files
- `.env.local` - Environment configuration

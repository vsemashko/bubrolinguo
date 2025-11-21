# Example Components

This directory contains fully functional example components that demonstrate how to use the mock data system and service layer in Bubrolinguo.

## 📋 Components Included

### 1. LessonsList.tsx
**Purpose**: Browse and filter Polish lessons

**Features Demonstrated**:
- ✅ Fetching data from lessons service
- ✅ Loading and error states
- ✅ Level filtering (A1-C1)
- ✅ Responsive card grid layout
- ✅ XP and duration display
- ✅ Empty state handling

**Key Patterns**:
```typescript
// Service integration
const response = await getLessons({ level: 'A1', status: 'all' });

// Loading state
if (loading) return <LoadingSpinner />;

// Error handling
if (error) return <ErrorMessage error={error} />;

// Data display
lessons.map(lesson => <LessonCard lesson={lesson} />)
```

**Usage**:
```tsx
import { LessonsList } from '@/components/examples/LessonsList';

export default function LessonsPage() {
  return <LessonsList />;
}
```

---

### 2. VocabularyReview.tsx
**Purpose**: Spaced repetition vocabulary review interface

**Features Demonstrated**:
- ✅ Fetching review queue
- ✅ Flashcard interface (front/back)
- ✅ Progress tracking
- ✅ Submitting review results
- ✅ Session statistics
- ✅ Completion screen

**Key Patterns**:
```typescript
// Load review queue
const response = await getReviewQueue(10);

// Submit answer
await submitReviewResult(word.id, {
  correct: true,
  timeSpent: 5,
});

// Update local state
setCurrentIndex(i => i + 1);
```

**Usage**:
```tsx
import { VocabularyReview } from '@/components/examples/VocabularyReview';

export default function ReviewPage() {
  return <VocabularyReview />;
}
```

---

### 3. Dashboard.tsx
**Purpose**: User dashboard with statistics and activity

**Features Demonstrated**:
- ✅ Multiple service calls (dashboard + achievements)
- ✅ Stats display with icons
- ✅ Streak counter
- ✅ Daily goal progress bar
- ✅ Recent activity feed
- ✅ Achievement grid
- ✅ Quick action buttons

**Key Patterns**:
```typescript
// Multiple API calls
const [dashboardData, achievements] = await Promise.all([
  getDashboardData(),
  getAchievements(),
]);

// Progress calculation
const percentage = (current / target) * 100;

// Dynamic styling
style={{ width: `${percentage}%` }}
```

**Usage**:
```tsx
import { Dashboard } from '@/components/examples/Dashboard';

export default function DashboardPage() {
  return <Dashboard />;
}
```

---

## 🚀 Quick Start

### Step 1: Enable Mock Data

Create `.env.local` in `apps/web/`:
```bash
NEXT_PUBLIC_USE_MOCK_DATA=true
```

### Step 2: Copy Component

Copy any example component to your pages:
```bash
cp components/examples/Dashboard.tsx app/dashboard/page.tsx
```

### Step 3: Run Dev Server

```bash
cd apps/web
npm run dev
```

### Step 4: View Component

Navigate to the component's route:
- Lessons: `http://localhost:3000/lessons`
- Vocabulary: `http://localhost:3000/vocabulary/review`
- Dashboard: `http://localhost:3000/dashboard`

---

## 💡 Key Patterns & Best Practices

### 1. Service Integration Pattern

All components follow this pattern:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getService } from '@/services/service.service';
import type { ServiceType } from '@/types/service';

export function Component() {
  const [data, setData] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await getService();

        if (response.success && response.data) {
          setData(response.data);
        } else {
          setError('Failed to load data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Component JSX...
}
```

### 2. Loading States

Always show loading feedback:

```tsx
if (loading) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
```

### 3. Error Handling

Provide clear error messages:

```tsx
if (error) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 className="text-red-800 font-semibold mb-2">Error</h3>
      <p className="text-red-600">{error}</p>
      <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
        Try Again
      </button>
    </div>
  );
}
```

### 4. Empty States

Handle cases with no data:

```tsx
{data.length === 0 ? (
  <div className="text-center py-12 bg-gray-50 rounded-lg">
    <p className="text-gray-600">No data found</p>
  </div>
) : (
  // Display data
)}
```

### 5. Optimistic Updates

Update UI immediately, sync with API:

```tsx
async function handleAction() {
  // Update UI optimistically
  setLocalState(newState);

  try {
    // Sync with API
    await serviceAction();
  } catch (error) {
    // Revert on error
    setLocalState(previousState);
  }
}
```

---

## 🎨 Styling

All components use **Tailwind CSS** with a consistent design system:

### Color Palette
- **Primary**: Blue (`bg-blue-600`, `text-blue-600`)
- **Success**: Green (`bg-green-600`, `text-green-600`)
- **Warning**: Yellow (`bg-yellow-600`, `text-yellow-600`)
- **Error**: Red (`bg-red-600`, `text-red-600`)
- **Neutral**: Gray (`bg-gray-100`, `text-gray-600`)

### Spacing
- **Container**: `max-w-6xl mx-auto p-6`
- **Card**: `bg-white border border-gray-200 rounded-lg p-6`
- **Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

### Typography
- **Heading 1**: `text-3xl font-bold text-gray-900`
- **Heading 2**: `text-2xl font-bold text-gray-900`
- **Heading 3**: `text-lg font-semibold text-gray-900`
- **Body**: `text-gray-600`
- **Small**: `text-sm text-gray-500`

---

## 🧪 Testing Components

### Manual Testing

1. **Enable Mock Mode**:
   ```bash
   # .env.local
   NEXT_PUBLIC_USE_MOCK_DATA=true
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```

3. **Test Each Component**:
   - Check loading states (should show briefly)
   - Check data display (should show mock data)
   - Check interactions (filtering, navigation, etc.)
   - Check error handling (disable network, etc.)
   - Check responsive design (mobile, tablet, desktop)

### Component Testing

```typescript
// __tests__/Dashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { Dashboard } from '@/components/examples/Dashboard';

jest.mock('@/services/progress.service', () => ({
  getDashboardData: jest.fn(() => Promise.resolve({
    success: true,
    data: mockDashboardData,
  })),
  getAchievements: jest.fn(() => Promise.resolve({
    success: true,
    data: { achievements: mockAchievements },
  })),
}));

test('renders dashboard with user data', async () => {
  render(<Dashboard />);

  await waitFor(() => {
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    expect(screen.getByText(/1250/i)).toBeInTheDocument(); // XP
  });
});
```

---

## 🔧 Customization

### Modifying Components

1. **Change Styles**: Update Tailwind classes
2. **Add Features**: Add new state and handlers
3. **Change Layout**: Modify JSX structure
4. **Add Animations**: Use Tailwind animations or Framer Motion

### Example: Adding Animation

```tsx
// Add to component
import { motion } from 'framer-motion';

// Wrap element
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Content */}
</motion.div>
```

---

## 📚 Learning Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn)

### React Hooks
- [useState](https://react.dev/reference/react/useState)
- [useEffect](https://react.dev/reference/react/useEffect)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React + TypeScript](https://react-typescript-cheatsheet.netlify.app/)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)

---

## 🐛 Common Issues

### Issue: Data Not Loading

**Symptoms**: Components show loading forever

**Solutions**:
1. Check `.env.local` has `NEXT_PUBLIC_USE_MOCK_DATA=true`
2. Restart Next.js dev server
3. Check browser console for errors
4. Verify service imports are correct

### Issue: TypeScript Errors

**Symptoms**: Red squiggles, build fails

**Solutions**:
1. Run `npm run type-check` to see all errors
2. Check types match between service and component
3. Ensure all imports are correct
4. Run `npm install` to ensure types are installed

### Issue: Styles Not Applying

**Symptoms**: Components look unstyled

**Solutions**:
1. Check Tailwind CSS is configured
2. Ensure `globals.css` imports Tailwind
3. Restart dev server
4. Check for typos in class names

---

## 🔜 Next Steps

### Build More Components
- Lesson player with exercises
- Vocabulary search and filter
- Exam interface
- User profile settings
- Leaderboard

### Add Features
- Dark mode toggle
- Keyboard shortcuts
- Audio playback
- Animation effects
- Offline support

### Connect to Real API
1. Set `NEXT_PUBLIC_USE_MOCK_DATA=false`
2. Point to backend: `NEXT_PUBLIC_API_URL=http://localhost:3001`
3. Test integration
4. Handle edge cases

---

## 💬 Need Help?

- Review [Mock Data Usage Guide](../../lib/MOCK_DATA_USAGE.md)
- Check [Frontend Integration Summary](../../../FRONTEND_INTEGRATION_SUMMARY.md)
- Read [API Documentation](../../../API_DOCUMENTATION.md)
- See [Development Guidelines](../../../.claude/CLAUDE.md)

---

**Happy coding! 🚀**

*These examples are production-ready and can be used as starting points for your features.*

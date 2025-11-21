# 🚀 Quick Start Guide
## Get Bubrolinguo Running in 2 Minutes

---

## Choose Your Path

### Path 1: Frontend Only (Fastest - No Backend Needed)
**Perfect for**: UI development, component testing, frontend work

### Path 2: Full Stack (Backend + Frontend)
**Perfect for**: Full feature testing, API integration, production setup

---

## 🎨 Path 1: Frontend Only (2 Minutes)

### Step 1: Navigate to Web App
```bash
cd apps/web
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Enable Mock Data
```bash
echo "NEXT_PUBLIC_USE_MOCK_DATA=true" > .env.local
```

### Step 4: Start Dev Server
```bash
npm run dev
```

### Step 5: Open Browser
```
http://localhost:3000
```

**🎉 Done! You now have access to:**
- 11 realistic lessons
- 10 vocabulary words with spaced repetition
- Complete user dashboard
- All features working with mock data

---

## 🔧 Path 2: Full Stack (10 Minutes)

### Prerequisites
- Docker (for PostgreSQL)
- Node.js 20+
- npm 9+

### Backend Setup

#### 1. Start PostgreSQL
```bash
# From project root
docker-compose up -d postgres
```

#### 2. Navigate to API
```bash
cd apps/api
```

#### 3. Install Dependencies
```bash
npm install
```

#### 4. Setup Environment
```bash
cp .env.example .env
# Edit .env if needed (defaults work for local development)
```

#### 5: Initialize Database
```bash
npm run db:init      # Run migrations
npm run db:seed      # Seed with data
```

#### 6. Start API Server
```bash
npm run dev
```

API now running at `http://localhost:3001`

### Frontend Setup

#### 7. Open New Terminal
```bash
cd apps/web
```

#### 8. Install Dependencies
```bash
npm install
```

#### 9. Configure for Real API
```bash
cat > .env.local << EOF
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_API_URL=http://localhost:3001
EOF
```

#### 10. Start Dev Server
```bash
npm run dev
```

#### 11. Open Browser
```
http://localhost:3000
```

**🎉 Done! You now have:**
- Full backend API running
- Frontend connected to real data
- Database with seed data
- Complete Polish learning platform

---

## 📝 What's Next?

### Use Example Components

Example components are in `apps/web/components/examples/`:

1. **Copy to a page**:
   ```bash
   # Example: Dashboard
   cp apps/web/components/examples/Dashboard.tsx apps/web/app/dashboard/page.tsx
   ```

2. **Navigate to the page**:
   ```
   http://localhost:3000/dashboard
   ```

3. **See it work!** The component automatically uses mock data (if enabled) or real API

### Available Examples

| Component | File | Purpose |
|-----------|------|---------|
| Lessons List | `LessonsList.tsx` | Browse and filter lessons |
| Vocabulary Review | `VocabularyReview.tsx` | Spaced repetition flashcards |
| Dashboard | `Dashboard.tsx` | User stats and progress |

### Customize Components

All components use Tailwind CSS and are fully customizable:

```tsx
// Change colors
className="bg-blue-600"  // Change to bg-green-600

// Change sizes
className="text-3xl"     // Change to text-4xl

// Change layout
className="grid-cols-3"  // Change to grid-cols-4
```

---

## 🧪 Testing Mock Data

### View Mock Data

Mock data is defined in `apps/web/lib/mockData.ts`:

```typescript
export const mockUser = {
  displayName: 'Demo User',
  currentLevel: 'A2',
  totalXp: 1250,
  streak: 7,
};

export const mockLessons = [
  // 11 lessons (A1-B2)
];

export const mockVocabulary = [
  // 10 words
];
```

### Customize Mock Data

Edit `apps/web/lib/mockData.ts` to:
- Add more lessons
- Change vocabulary words
- Modify user profile
- Add achievements

### Switch Between Mock and Real

**Enable Mock Data**:
```bash
# .env.local
NEXT_PUBLIC_USE_MOCK_DATA=true
```

**Use Real API**:
```bash
# .env.local
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Restart dev server after changes.

---

## 🐛 Troubleshooting

### Frontend Won't Start

**Problem**: `npm run dev` fails

**Solutions**:
1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Check Node version:
   ```bash
   node --version  # Should be 20+
   ```

3. Check for port conflicts:
   ```bash
   lsof -i :3000
   # Kill process if needed
   ```

### Mock Data Not Working

**Problem**: Components show "Loading..." forever

**Solutions**:
1. Check `.env.local` exists:
   ```bash
   cat apps/web/.env.local
   # Should show: NEXT_PUBLIC_USE_MOCK_DATA=true
   ```

2. Restart dev server:
   ```bash
   # Press Ctrl+C, then:
   npm run dev
   ```

3. Clear browser cache:
   - Chrome: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Database Connection Error

**Problem**: API can't connect to PostgreSQL

**Solutions**:
1. Check PostgreSQL is running:
   ```bash
   docker ps
   # Should show bubrolinguo-postgres container
   ```

2. Start PostgreSQL if stopped:
   ```bash
   docker-compose up -d postgres
   ```

3. Check database exists:
   ```bash
   docker exec -it bubrolinguo-postgres psql -U postgres -c "\l"
   # Should list 'bubrolinguo' database
   ```

### TypeScript Errors

**Problem**: Red squiggles in editor

**Solutions**:
1. Run type check:
   ```bash
   npm run type-check
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Restart TypeScript server:
   - VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"

---

## 📚 Learn More

### Documentation

| Topic | File | Description |
|-------|------|-------------|
| Mock Data | `apps/web/lib/MOCK_DATA_USAGE.md` | Complete mock data guide |
| Components | `apps/web/components/examples/README.md` | Component patterns |
| Integration | `FRONTEND_INTEGRATION_SUMMARY.md` | Service integration |
| API | `API_DOCUMENTATION.md` | Complete API reference |
| Quality | `CODE_QUALITY_SUMMARY.md` | Code standards |

### Key Concepts

**Mock Data System**:
- Realistic test data for development
- No backend required
- Easy switching to real API

**Service Layer**:
- Clean separation of concerns
- Type-safe API calls
- Automatic mock/real switching

**Example Components**:
- Production-ready code
- Copy-paste templates
- Best practices demonstrated

---

## 🎯 Common Tasks

### Add a New Lesson

1. **Mock Data** (for testing):
   ```typescript
   // apps/web/lib/mockData.ts
   export const mockLessons = [
     ...mockLessons,
     {
       id: 'lesson-new',
       lessonNumber: 12,
       level: 'A2',
       titleEn: 'New Lesson',
       // ...
     }
   ];
   ```

2. **Real Data** (database):
   ```sql
   INSERT INTO lessons (...)
   VALUES (...);
   ```

### Add a New Component

1. **Create component**:
   ```bash
   touch apps/web/components/MyComponent.tsx
   ```

2. **Use service**:
   ```tsx
   import { getLessons } from '@/services/lessons.service';

   const response = await getLessons();
   ```

3. **Display data**:
   ```tsx
   {lessons.map(lesson => (
     <div key={lesson.id}>{lesson.title_en}</div>
   ))}
   ```

### Run Tests

```bash
# Frontend tests
cd apps/web
npm test

# Backend tests
cd apps/api
npm test

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## ⚡ Pro Tips

### 1. Use Mock Data for Fast Iteration
- Develop UI without waiting for backend
- Test edge cases easily
- Faster feedback loop

### 2. Copy Example Components
- Don't start from scratch
- Learn patterns from examples
- Customize to your needs

### 3. Check Documentation
- Each service has JSDoc comments
- README files explain patterns
- Examples show usage

### 4. Use TypeScript
- Type safety prevents bugs
- IntelliSense helps development
- Catch errors at compile time

### 5. Test with Mock First
- Verify UI works
- Then switch to real API
- Easier debugging

---

## 🚀 Deploy to Production

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd apps/web
vercel --prod
```

Set environment variables in Vercel dashboard:
```
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_API_URL=https://your-api.com
```

### Backend (Railway/Render)

1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

---

## 💬 Need Help?

### Resources
- **Documentation**: Check `/docs` folder
- **Examples**: See `apps/web/components/examples/`
- **API Docs**: Read `API_DOCUMENTATION.md`

### Common Questions

**Q: Can I use this without the backend?**
A: Yes! Enable mock data and develop the entire frontend independently.

**Q: How do I add more lessons?**
A: Add to `mockData.ts` for testing, or insert into database for production.

**Q: Where are the example components?**
A: `apps/web/components/examples/` - copy them to your pages.

**Q: How do I switch to real API?**
A: Set `NEXT_PUBLIC_USE_MOCK_DATA=false` in `.env.local`

---

**🦫 Happy coding! You're ready to build an amazing Polish learning platform! 🚀**

---

*For detailed documentation, see the main README and documentation files.*

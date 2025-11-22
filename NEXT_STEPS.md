# 🎯 Bubrolinguo - Clear Next Steps (Week 2 Day 3+)

**Current Status:** 90% Complete | Week 2 Day 2 Done
**Target:** 95% Complete by End of Week 2
**Goal:** Alpha Launch Ready by Week 3

---

## 🚨 IMMEDIATE PRIORITIES (Day 3 - Today)

### Priority 1: Fix Lessons API Title Bug ⚡ **15 min**

**Issue:** Lessons API returns `title_en: null` instead of actual titles

**Steps:**
1. Open `apps/api/src/controllers/lessons.controller.ts`
2. Find the `getLessons` function
3. Check the SQL SELECT query
4. Ensure all fields are properly selected (title_en, title_ru, etc.)
5. Test endpoint: `curl http://localhost:3001/api/v1/lessons | jq`
6. Verify titles are returned correctly

**Expected Result:**
```json
{
  "success": true,
  "data": {
    "lessons": [
      {
        "id": "...",
        "title_en": "Basic Greetings",  // ← Should not be null
        "title_ru": "Основные приветствия"
      }
    ]
  }
}
```

**Impact:** HIGH - Frontend depends on lesson titles

---

### Priority 2: End-to-End User Flow Testing ⚡ **1 hour**

**Test the complete user journey from registration to lesson completion**

**Test Scenarios:**

**Scenario 1: New User Registration → Login**
```bash
# 1. Register new user
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alpha-tester@example.com",
    "password": "TestPass123",
    "displayName": "Alpha Tester",
    "interfaceLanguage": "en"
  }'

# Expected: User created, JWT token returned

# 2. Login with credentials
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alpha-tester@example.com",
    "password": "TestPass123"
  }'

# Expected: JWT token returned, user data correct
```

**Scenario 2: Browse Lessons**
```bash
# Save token from login
TOKEN="<jwt-token-from-login>"

# Get lessons list
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/v1/lessons

# Expected: All 3 lessons returned with titles, descriptions, XP rewards
```

**Scenario 3: Get Lesson Details**
```bash
# Get specific lesson
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/v1/lessons/<lesson-id>

# Expected: Lesson details, exercises, metadata
```

**Scenario 4: Complete Lesson & Earn XP**
```bash
# Submit lesson completion
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  http://localhost:3001/api/v1/lessons/<lesson-id>/complete \
  -d '{
    "score": 85,
    "timeSpent": 600,
    "exerciseResults": [
      {"exerciseId": 1, "correct": true},
      {"exerciseId": 2, "correct": true}
    ]
  }'

# Expected: XP awarded, progress updated
```

**Scenario 5: Check User Progress**
```bash
# Get user stats
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/v1/users/me

# Expected: Total XP updated, lessons completed count increased
```

**Scenario 6: View Achievements**
```bash
# Get user achievements
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/v1/progress/achievements

# Expected: Available achievements, unlocked achievements
```

**Documentation:**
- Document any failures or unexpected behaviors
- Take screenshots of responses
- Note any performance issues
- Record any error messages

---

### Priority 3: Document Test Results ⚡ **30 min**

**Create Test Report:**

Create file: `WEEK2_DAY3_TEST_REPORT.md`

**Include:**
- ✅ / ❌ for each test scenario
- Response times for each API call
- Any errors encountered
- Screenshots or JSON responses
- Recommendations for fixes

**Template:**
```markdown
# Week 2 Day 3 - E2E Test Report

## Test Environment
- API: http://localhost:3001
- Web: http://localhost:3000
- Database: PostgreSQL 16
- Date: 2025-11-22

## Test Results

### Scenario 1: Registration & Login
- Status: ✅ / ❌
- Response Time: X ms
- Notes: ...

### Scenario 2: Browse Lessons
- Status: ✅ / ❌
- Response Time: X ms
- Issues: ...

[etc...]

## Blocking Issues
- List any critical problems

## Recommendations
- List suggested fixes
```

---

## 📋 SHORT-TERM PRIORITIES (Days 4-5)

### Day 4 Morning: Load More Lessons ⚡ **2 hours**

**Goal:** Get from 3 lessons to at least 15 lessons

**Steps:**

1. **Review Lesson Seed Files**
   ```bash
   ls -la apps/api/src/db/seeds/lessons*.sql
   ```

2. **Run Fix Script on Remaining Lessons**
   ```bash
   cd apps/api
   python3 fix_lessons_v2.py
   ```

3. **Load Fixed Lessons**
   ```bash
   psql -U postgres -d bubrolinguo -f src/db/seeds/lessons-fixed.sql
   ```

4. **Verify in Database**
   ```sql
   SELECT COUNT(*) FROM lessons;
   -- Should be 15+

   SELECT lesson_number, title_en, level
   FROM lessons
   ORDER BY lesson_number;
   ```

5. **Test API**
   ```bash
   curl http://localhost:3001/api/v1/lessons | jq '.data.total'
   # Should return 15+
   ```

**Acceptance Criteria:**
- ✅ At least 15 lessons in database
- ✅ All lessons have proper titles
- ✅ Lessons span A1-A2 levels
- ✅ API returns all lessons correctly

---

### Day 4 Afternoon: Fix Test Failures ⚡ **3 hours**

**Goal:** Get frontend tests from 68% to 90%+ passing

**Tasks:**

1. **Add API Mocking**
   ```bash
   cd apps/web
   npm install --save-dev msw@latest
   ```

   Create `__tests__/mocks/handlers.ts`:
   ```typescript
   import { http, HttpResponse } from 'msw'

   export const handlers = [
     http.get('/api/v1/lessons', () => {
       return HttpResponse.json({
         success: true,
         data: { lessons: [...] }
       })
     }),
     // Add more handlers...
   ]
   ```

2. **Configure Fake Timers**

   Update `__tests__/lib/utils.functions.test.ts`:
   ```typescript
   describe('throttle', () => {
     beforeEach(() => {
       jest.useFakeTimers();
     });

     afterEach(() => {
       jest.useRealTimers();
     });

     it('should delay execution', () => {
       // tests...
     });
   });
   ```

3. **Re-run Tests**
   ```bash
   npm test
   ```

4. **Fix Remaining Failures**
   - Review each failing test
   - Add necessary mocks
   - Update test configuration

**Acceptance Criteria:**
- ✅ At least 90% tests passing
- ✅ No test infrastructure errors
- ✅ All service tests properly mocked

---

### Day 5: Performance & Polish ⚡ **4 hours**

**Morning: Performance Testing**

1. **Load Test API Endpoints** (1 hour)
   ```bash
   # Install k6 or use curl in loop
   for i in {1..100}; do
     time curl -s http://localhost:3001/api/v1/lessons > /dev/null
   done
   ```

   **Measure:**
   - Response times
   - Database query times
   - Memory usage
   - CPU usage

2. **Optimize Slow Queries** (1 hour)
   ```sql
   -- Check slow queries
   SELECT * FROM pg_stat_statements
   WHERE mean_exec_time > 100
   ORDER BY mean_exec_time DESC;

   -- Add indexes if needed
   CREATE INDEX idx_vocabulary_level ON vocabulary(level);
   CREATE INDEX idx_lessons_level ON lessons(level);
   ```

**Afternoon: UI Polish**

3. **Test Responsive Design** (1 hour)
   - Test on mobile sizes (375px, 414px)
   - Test on tablet (768px, 1024px)
   - Test on desktop (1920px)
   - Fix any layout issues

4. **Improve Error Messages** (1 hour)
   - Review all error states
   - Make messages user-friendly
   - Add helpful suggestions
   - Test error handling flows

**Acceptance Criteria:**
- ✅ All API endpoints respond < 200ms
- ✅ Database queries optimized
- ✅ UI works on all screen sizes
- ✅ Error messages are clear and helpful

---

## 📅 MEDIUM-TERM PLAN (Days 6-7)

### Day 6: Alpha Testing Preparation ⚡ **4 hours**

1. **Create Test User Accounts** (30 min)
   ```bash
   # Create 5 alpha test accounts
   curl -X POST http://localhost:3001/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"alpha1@test.com", ...}'
   ```

2. **Write Alpha Testing Guide** (2 hours)
   - User onboarding steps
   - Test scenarios for testers
   - Feedback form
   - Known issues list
   - How to report bugs

3. **Set Up Monitoring** (1 hour)
   - Add basic logging
   - Set up error tracking
   - Monitor API performance
   - Track user actions

4. **Create Demo Video** (30 min)
   - Record 2-3 minute demo
   - Show registration → lesson → progress
   - Highlight key features

**Deliverable:** Alpha Testing Package ready

---

### Day 7: Final Polish & Documentation ⚡ **3 hours**

1. **Code Review** (1 hour)
   - Review all recent changes
   - Check for security issues
   - Remove console.logs
   - Clean up commented code

2. **Update Documentation** (1 hour)
   - README.md
   - API_DOCUMENTATION.md
   - DEPLOYMENT.md
   - USER_GUIDE.md

3. **Final Testing** (1 hour)
   - Run all test suites
   - Test all critical flows
   - Check for regressions
   - Verify all features working

**Deliverable:** Week 2 Complete, Alpha Ready

---

## 🎯 SUCCESS METRICS - END OF WEEK 2

### Must Achieve ✅
- [ ] All critical bugs fixed (lessons API, etc.)
- [ ] E2E user flows tested and working
- [ ] At least 15 lessons loaded
- [ ] Backend tests at 100%
- [ ] Frontend tests at 90%+
- [ ] Performance < 200ms response times
- [ ] Documentation updated

### Should Achieve 🎯
- [ ] All 30 A1-A2 lessons loaded
- [ ] UI polish complete
- [ ] Alpha testing guide ready
- [ ] Demo video created
- [ ] Monitoring in place

### Could Achieve 💡
- [ ] Exam preparation feature working
- [ ] B1-B2 lessons loaded
- [ ] Advanced error tracking
- [ ] Performance optimization complete

---

## 📊 DAILY CHECKLIST TEMPLATE

**Copy this for each day:**

```markdown
## Week 2 Day X - [Date]

### Morning
- [ ] Check all services running
- [ ] Review overnight errors/issues
- [ ] Plan today's tasks (this doc)
- [ ] Start Priority 1

### Midday
- [ ] Complete Priority 1
- [ ] Test changes
- [ ] Commit work
- [ ] Start Priority 2

### Afternoon
- [ ] Complete Priority 2
- [ ] Run test suites
- [ ] Fix any new issues
- [ ] Update documentation

### End of Day
- [ ] Commit all changes
- [ ] Push to remote
- [ ] Update status files
- [ ] Plan tomorrow's tasks

### Metrics
- Tests passing: __%
- Bugs fixed: __
- Features completed: __
- Time spent: __ hours
```

---

## 🚀 QUICK REFERENCE COMMANDS

### Start Services
```bash
# PostgreSQL & Redis
service postgresql start
redis-server --daemonize yes --port 6379

# API Server
cd apps/api && npm run dev

# Web App
cd apps/web && npm run dev
```

### Run Tests
```bash
# Backend
cd apps/api && npm test

# Frontend
cd apps/web && npm test

# Specific test file
npm test -- <filename>
```

### Database Operations
```bash
# Connect to DB
psql -U postgres -d bubrolinguo

# Check counts
SELECT
  (SELECT COUNT(*) FROM vocabulary) as vocab_count,
  (SELECT COUNT(*) FROM lessons) as lessons_count,
  (SELECT COUNT(*) FROM achievements) as achievements_count,
  (SELECT COUNT(*) FROM users) as users_count;

# Load seed file
\i apps/api/src/db/seeds/lessons.sql
```

### API Testing
```bash
# Get JWT token
TOKEN=$(curl -s -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}' \
  | jq -r '.data.token')

# Use token
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/v1/vocabulary
```

### Git Workflow
```bash
# Check status
git status

# Stage changes
git add <files>

# Commit
git commit -m "feat: description"

# Push
git push -u origin claude/review-and-update-plan-019PAcKJWuES6pEog7doRR9e
```

---

## 📞 NEED HELP?

### Debugging Tips

**Services not starting?**
```bash
# Check if ports are in use
lsof -i :3001  # API
lsof -i :3000  # Web
lsof -i :5432  # PostgreSQL
lsof -i :6379  # Redis

# Kill process if needed
kill -9 <PID>
```

**Database issues?**
```bash
# Restart PostgreSQL
service postgresql restart

# Check if running
pg_isready -h localhost -p 5432

# View logs
tail -f /var/log/postgresql/postgresql-16-main.log
```

**API errors?**
```bash
# Check API logs
cd apps/api
tail -f logs/app.log

# Check environment
cat .env
```

### Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot find module" | `npm install` |
| "Port already in use" | Kill process or change port |
| "Database connection failed" | Check PostgreSQL running |
| "JWT token invalid" | Get new token from login |
| "Tests failing" | Check test dependencies installed |

---

## 🎉 WEEK 2 COMPLETION CRITERIA

**Ready for Week 3 Alpha Launch when:**

✅ **Functionality:**
- All critical bugs fixed
- E2E flows tested
- 15+ lessons available
- Authentication rock solid

✅ **Quality:**
- Backend tests: 100%
- Frontend tests: 90%+
- No console errors
- Performance optimized

✅ **Documentation:**
- README updated
- API docs current
- Alpha guide ready
- Known issues documented

✅ **Readiness:**
- Demo video created
- Test accounts set up
- Monitoring in place
- Support plan ready

---

**Current Progress:** 90%
**Target by End of Week:** 95%
**Status:** 🟢 ON TRACK

**Next Action:** Fix lessons API title bug (15 min) → Go! 🚀

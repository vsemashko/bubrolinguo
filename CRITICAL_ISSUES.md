# Critical Issues Tracker
**Last Updated:** November 22, 2025
**Branch:** `claude/project-review-roadmap-01SgbQehtLpT93sQSu27ofKz`

---

## 🔴 Priority 1: BLOCKERS (Must Fix for Alpha)

### Issue #1: Settings Page Non-Functional
**Status:** 🔴 CRITICAL - Not Started
**Impact:** HIGH - Core feature completely broken
**Estimated Time:** 6 hours
**Assigned:** In Progress

**Problem:**
- Settings page UI is complete but none of the forms save data
- All 6 form handlers have TODO comments
- No backend API endpoints exist

**Location:**
- Frontend: `apps/web/app/(app)/settings/page.tsx` (lines 35, 45, 54, 60, 66, 72)
- Backend: Missing `apps/api/src/controllers/users.controller.ts`

**TODOs:**
- [ ] Line 35: Account settings save (TODO: Implement API call)
- [ ] Line 45: Password change (TODO: Implement API call)
- [ ] Line 54: Learning preferences (TODO: Implement API call)
- [ ] Line 60: Notification settings (TODO: Implement API call)
- [ ] Line 66: Privacy settings (TODO: Implement API call)
- [ ] Line 72: Account deletion (TODO: Implement API call)

**Solution:**
1. Create users controller with endpoints
2. Create user service methods
3. Connect frontend to APIs
4. Add proper error handling

**Acceptance Criteria:**
- [ ] User can update account info (name, email)
- [ ] User can change password
- [ ] User can update learning preferences
- [ ] User can update notification settings
- [ ] User can update privacy settings
- [ ] User can delete account (with confirmation)
- [ ] All changes persist to database
- [ ] Errors display properly

---

### Issue #2: Leaderboard Using Mock Data
**Status:** 🔴 HIGH - Not Started
**Impact:** HIGH - Shows fake data to users
**Estimated Time:** 2 hours
**Assigned:** Pending

**Problem:**
- Leaderboard page displays hardcoded mock data
- Not connected to real API
- Users see fake rankings

**Location:**
- Frontend: `apps/web/app/(app)/leaderboard/page.tsx:35`
- Backend: Missing leaderboard endpoint

**TODO:**
- Line 35: `// TODO: Replace with actual API call`

**Solution:**
1. Create leaderboard controller
2. Add endpoint: `GET /api/v1/leaderboard?period=weekly&scope=global`
3. Query users by XP with ranking
4. Connect frontend to real API

**Acceptance Criteria:**
- [ ] Leaderboard shows real user rankings
- [ ] Supports filters (daily, weekly, monthly, allTime)
- [ ] Supports scope (global, friends)
- [ ] Shows current user's rank
- [ ] Updates in real-time

---

### Issue #3: Profile Page Incomplete
**Status:** 🟡 MEDIUM - Not Started
**Impact:** MEDIUM - Can't load/save profile data
**Estimated Time:** 2 hours
**Assigned:** Pending

**Problem:**
- Profile page UI exists but doesn't load real data
- Can't save profile changes

**Location:**
- Frontend: `apps/web/app/profile/page.tsx` (lines 40, 50)
- Backend: Partial user endpoints

**TODOs:**
- Line 40: Load user profile data
- Line 50: Save user profile data

**Solution:**
1. Add user profile endpoints
2. Connect profile page to APIs
3. Add validation and error handling

**Acceptance Criteria:**
- [ ] Profile page loads user data
- [ ] User can edit profile fields
- [ ] Changes save to database
- [ ] Displays upload avatar (future)

---

### Issue #4: Test Coverage Too Low
**Status:** 🔴 CRITICAL - Not Started
**Impact:** HIGH - Can't deploy safely
**Estimated Time:** 8 hours
**Assigned:** Pending

**Problem:**
- Backend: Only 11 tests (5% coverage)
- Frontend: 70% passing (83/118 tests)
- No integration tests for API endpoints
- Major services completely untested

**Current Coverage:**
- `achievements.service.ts`: 7,252 lines - 0 tests
- `streak.service.ts`: 11,081 lines - 0 tests
- All 8 controllers: 2,484 lines - 0 tests

**Solution:**
Write integration tests for:
- Auth endpoints (10 tests)
- Lessons endpoints (8 tests)
- Vocabulary endpoints (8 tests)
- Achievements endpoints (6 tests)
- Users/Settings endpoints (8 tests)
- Progress endpoints (6 tests)

**Target:** 50+ tests minimum for alpha

**Acceptance Criteria:**
- [ ] 50+ API integration tests passing
- [ ] All critical endpoints tested
- [ ] Auth flow fully tested
- [ ] Frontend tests at 90%+ pass rate

---

### Issue #5: No Production Monitoring
**Status:** 🔴 CRITICAL - Not Started
**Impact:** HIGH - Will be blind in production
**Estimated Time:** 3 hours
**Assigned:** Pending

**Problem:**
- No error tracking configured
- ErrorBoundary has TODO for Sentry (line 50)
- No uptime monitoring
- No logging aggregation

**Location:**
- Frontend: `apps/web/components/ErrorBoundary.tsx:50`
- Backend: No Sentry integration

**TODO:**
- Line 50: `// TODO: Send to Sentry or error tracking service`

**Solution:**
1. Set up Sentry account
2. Install and configure Sentry (backend + frontend)
3. Update ErrorBoundary to send errors
4. Set up uptime monitoring (UptimeRobot)
5. Configure error notifications

**Acceptance Criteria:**
- [ ] Sentry tracking backend errors
- [ ] Sentry tracking frontend errors
- [ ] Error notifications configured
- [ ] Uptime monitoring active
- [ ] Test error reporting works

---

## 🟡 Priority 2: HIGH IMPACT (Should Fix Before Production)

### Issue #6: Exam Preparation Frontend Missing
**Status:** 🟡 MEDIUM - Not Started
**Impact:** MEDIUM - Major feature not accessible
**Estimated Time:** 8-12 hours

**Problem:**
- Backend 60% complete (7 tables, 4 exams, 80+ questions)
- No frontend UI to access exams
- Users can't practice exam preparation

**Solution:**
1. Create exam selection page
2. Build exam-taking flow
3. Add grading and results
4. Connect to backend

**Acceptance Criteria:**
- [ ] Users can select mock exams
- [ ] Users can take exams section by section
- [ ] Automatic grading for MC questions
- [ ] Results display with feedback

**Priority:** Defer to post-alpha (nice to have, not blocker)

---

### Issue #7: Level-Up Logic Not Implemented
**Status:** 🟡 MEDIUM - Not Started
**Impact:** MEDIUM - Users earn XP but no progression
**Estimated Time:** 3 hours

**Problem:**
- Users earn XP but don't level up
- No A1 → A2 → B1 → B2 progression
- No level-up celebrations

**Location:**
- `apps/api/src/controllers/lessons.controller.ts:230`

**TODO:**
- Line 230: `// TODO: Check if user leveled up and return level-up event`

**Solution:**
1. Define XP thresholds per level
2. Calculate level on XP change
3. Detect level-up events
4. Return in API response
5. Add frontend celebration

**Acceptance Criteria:**
- [ ] Users level up at XP thresholds
- [ ] Level-up animation displays
- [ ] Level persists to database
- [ ] Shows in user profile

**Priority:** Include in Week 1 if time permits

---

### Issue #8: Service Layer Incomplete
**Status:** 🟡 LOW - Not Started
**Impact:** MEDIUM - Code maintainability
**Estimated Time:** 12 hours

**Problem:**
- Only 2 service files (achievements, streak)
- 2,484 lines of business logic in controllers
- Should be in service layer

**Solution:**
1. Create service files for: lessons, vocabulary, users, progress
2. Extract logic from controllers
3. Update controllers to call services
4. Write unit tests for services

**Priority:** Defer to Week 2 (refactor, not blocker)

---

### Issue #9: Non-Standard Migration System
**Status:** 🟡 LOW - Not Started
**Impact:** LOW - Deployment risk
**Estimated Time:** 4 hours

**Problem:**
- Only 1 migration file exists
- Main schema in single `schema.sql` file
- Not following traditional migration pattern

**Solution:**
1. Split schema.sql into migrations
2. Create proper migration sequence
3. Test migration rollback

**Priority:** Defer to post-launch (low risk, working fine)

---

## 🟢 Priority 3: NICE TO HAVE (Defer if needed)

### Issue #10: Too Many Documentation Files
**Status:** 🟢 LOW - Not Started
**Impact:** LOW - Documentation clutter
**Estimated Time:** 2 hours

**Problem:**
- 15+ session summary files
- Some contradictions
- Hard to find info

**Solution:**
- Consolidate into CHANGELOG.md
- Archive old summaries
- Update README with current status

**Priority:** Defer to post-launch

---

### Issue #11: Achievement Progress Not Shown
**Status:** 🟢 LOW - Not Started
**Impact:** LOW - Enhancement only
**Estimated Time:** 1 hour

**Problem:**
- Locked achievements don't show progress
- Users don't know how close they are

**Location:**
- `apps/web/app/(app)/achievements/page.tsx:69`

**TODO:**
- Line 69: `// TODO: Calculate progress for locked achievements`

**Solution:**
- Calculate progress percentage
- Show progress bar on locked achievements

**Priority:** Quick win, include if time permits

---

## 📊 Issue Summary

| Priority | Count | Total Est. Time | Status |
|----------|-------|-----------------|--------|
| P1 (Blockers) | 5 | 21 hours | 🔴 Not Started |
| P2 (High Impact) | 4 | 31 hours | 🟡 Not Started |
| P3 (Nice to Have) | 2 | 3 hours | 🟢 Deferred |
| **Total** | **11** | **55 hours** | |

---

## 🎯 Resolution Plan

### Week 1 (Alpha Launch)
Focus on P1 issues only:
- Day 1: Issue #1 (Settings) - 6h
- Day 2: Issues #2, #3 (Leaderboard, Profile) - 4h
- Day 3: Issue #4 (Tests) - 8h
- Day 4: Issue #5 (Monitoring) - 3h
- Day 5: Issue #7 (Level-up, bonus) - 3h

**Total:** 24 hours = ~5 days

### Week 2-3 (Production Launch)
Address P2 issues:
- Issue #6 (Exam prep) - Optional
- Issue #7 (Level-up) - If not done Week 1
- Issue #8 (Service layer) - Refactor
- Issue #9 (Migrations) - Low priority

---

## 📝 Resolution Log

### November 22, 2025
- [ ] Issue #1: Settings page - Not Started
- [ ] Issue #2: Leaderboard - Not Started
- [ ] Issue #3: Profile - Not Started
- [ ] Issue #4: Tests - Not Started
- [ ] Issue #5: Monitoring - Not Started

Updates will be logged here as issues are resolved.

---

**Next Update:** November 23, 2025
**Reviewed By:** Development Team
**Status:** 🚀 **READY TO EXECUTE**

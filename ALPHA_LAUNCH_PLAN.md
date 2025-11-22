# Bubrolinguo - Alpha Launch Plan
**Created:** November 22, 2025
**Target Alpha Launch:** November 27, 2025 (5 days)
**Target Production Launch:** December 13, 2025 (3 weeks)
**Current Status:** 97% MVP Complete

---

## 🎯 Executive Summary

Bubrolinguo is **97% complete** with excellent architecture, performance, and recent achievement system implementation. The main gaps are:
- Settings page API integration (6 TODOs)
- Leaderboard using mock data
- Profile page incomplete
- Test coverage too low (backend ~5%, frontend 70%)
- No production monitoring

**Recommended Approach:** Hybrid fast-track to alpha in 5 days, then production-ready in 3 weeks total.

---

## 🚨 Critical Issues Blocking Alpha Launch

### Priority 1: BLOCKERS (Must fix for alpha)

1. **Settings Page Non-Functional** 🔴
   - **Impact:** HIGH - Core feature completely broken
   - **Location:** `apps/web/app/(app)/settings/page.tsx` (lines 35, 45, 54, 60, 66, 72)
   - **Issues:** 6 TODOs - all API integrations missing
   - **Estimated Time:** 6 hours
   - **Status:** ❌ Not Started

2. **Leaderboard Using Mock Data** 🔴
   - **Impact:** HIGH - Shows fake data to users
   - **Location:** `apps/web/app/(app)/leaderboard/page.tsx:35`
   - **Estimated Time:** 2 hours
   - **Status:** ❌ Not Started

3. **Profile Page Incomplete** 🟡
   - **Impact:** MEDIUM - Can't load/save profile data
   - **Location:** `apps/web/app/profile/page.tsx` (lines 40, 50)
   - **Estimated Time:** 2 hours
   - **Status:** ❌ Not Started

4. **Minimal Test Coverage** 🔴
   - **Impact:** HIGH - Can't deploy safely
   - **Current:** Backend 5%, Frontend 70%
   - **Target:** 50+ API integration tests minimum
   - **Estimated Time:** 8 hours
   - **Status:** ❌ Not Started

5. **No Production Monitoring** 🔴
   - **Impact:** HIGH - Will be blind in production
   - **Missing:** Sentry error tracking
   - **Location:** `apps/web/components/ErrorBoundary.tsx:50`
   - **Estimated Time:** 3 hours
   - **Status:** ❌ Not Started

---

## 📅 Week 1: Critical Path to Alpha (5 Days)

### Day 1 (Today): Settings Page Implementation
**Goal:** Complete settings page backend + frontend integration

#### Backend Tasks (3-4 hours)
- [ ] Create `apps/api/src/controllers/users.controller.ts`
- [ ] Add endpoint: `PUT /api/v1/users/:id` (update account settings)
- [ ] Add endpoint: `PUT /api/v1/users/:id/password` (change password)
- [ ] Add endpoint: `PUT /api/v1/users/:id/preferences` (learning preferences)
- [ ] Add endpoint: `DELETE /api/v1/users/:id` (delete account)
- [ ] Create `apps/api/src/routes/users.routes.ts`
- [ ] Add input validation (Zod schemas)
- [ ] Add password change logic (verify old password, hash new)

#### Frontend Tasks (2-3 hours)
- [ ] Create `apps/web/services/user.service.ts` (if doesn't exist)
- [ ] Add service methods: `updateAccount()`, `changePassword()`, `updatePreferences()`, `deleteAccount()`
- [ ] Connect all 6 settings form handlers to real APIs
- [ ] Add proper error handling
- [ ] Test all settings save/load flows

**Deliverable:** ✅ Fully functional settings page

---

### Day 2: Leaderboard & Profile Integration
**Goal:** Connect leaderboard and profile to real APIs

#### Leaderboard Tasks (2 hours)
- [ ] Create `apps/api/src/controllers/leaderboard.controller.ts`
- [ ] Add endpoint: `GET /api/v1/leaderboard?period={daily|weekly|monthly|allTime}&scope={global|friends}`
- [ ] Query database for top users by XP
- [ ] Return ranked list with user stats
- [ ] Update `apps/web/app/(app)/leaderboard/page.tsx` to call real API
- [ ] Remove mock data (line 35)

#### Profile Page Tasks (2 hours)
- [ ] Update user service with profile methods
- [ ] Add endpoint: `GET /api/v1/users/:id/profile`
- [ ] Add endpoint: `PUT /api/v1/users/:id/profile`
- [ ] Connect profile page to APIs (lines 40, 50)
- [ ] Test profile load/save flows

**Deliverable:** ✅ Real leaderboard + functional profile page

---

### Day 3: Critical API Integration Tests
**Goal:** Add 50+ backend integration tests for confidence

#### Test Coverage (8 hours)
- [ ] **Auth Tests** (10 tests, 2 hours)
  - Register user, login, token refresh, logout
  - Invalid credentials, duplicate email
  - Token expiration, invalid tokens

- [ ] **Lessons Tests** (8 tests, 2 hours)
  - Get all lessons, get lesson by ID
  - Record lesson progress, complete lesson
  - Invalid lesson ID, unauthorized access

- [ ] **Vocabulary Tests** (8 tests, 2 hours)
  - Get vocabulary by level, review queue
  - Submit review, update mastery
  - Spaced repetition logic

- [ ] **Achievements Tests** (6 tests, 1 hour)
  - Get user achievements, check achievements
  - Award achievement, prevent duplicates

- [ ] **Users/Settings Tests** (8 tests, 1 hour)
  - Update account, change password
  - Update preferences, delete account

**Target:** 50+ tests, 80%+ pass rate

**Deliverable:** ✅ Comprehensive API test suite

---

### Day 4: Production Monitoring Setup
**Goal:** Set up error tracking and monitoring

#### Sentry Setup (3 hours)
- [ ] Create Sentry account (free tier)
- [ ] Install backend dependencies: `@sentry/node`
- [ ] Configure Sentry in `apps/api/src/app.ts`
- [ ] Test backend error reporting
- [ ] Install frontend dependencies: `@sentry/nextjs`
- [ ] Configure Sentry in `apps/web/next.config.js`
- [ ] Update ErrorBoundary to send to Sentry (line 50)
- [ ] Test frontend error reporting
- [ ] Set up error notifications (email/Slack)

#### Uptime Monitoring (30 min)
- [ ] Set up UptimeRobot for API health checks
- [ ] Set up alerts for downtime

**Deliverable:** ✅ Complete error tracking and monitoring

---

### Day 5: Frontend Tests + Polish
**Goal:** Fix failing tests and implement level-up logic

#### Frontend Test Fixes (4 hours)
- [ ] Fix Button component tests (React act warnings)
- [ ] Fix utils function tests (timing/fake timers)
- [ ] Fix remaining useApi edge cases
- [ ] Target: 90%+ test pass rate (110/118 tests)

#### Level-Up Logic (3 hours)
- [ ] Implement level calculation in `apps/api/src/controllers/lessons.controller.ts:230`
- [ ] Add level-up detection when XP increases
- [ ] Return level-up event in lesson completion response
- [ ] Add level-up celebration in frontend
- [ ] Test level progression (A1 → A2 → B1 → B2)

#### Alpha Deployment (1 hour)
- [ ] Deploy API to staging (Railway/Render)
- [ ] Deploy web to staging (Vercel)
- [ ] Run smoke tests
- [ ] Invite 10-20 alpha testers

**Deliverable:** ✅ **ALPHA LAUNCH!** 🚀

---

## 📅 Week 2: Production Readiness (5 Days)

### Day 6-7: Service Layer Refactor
**Goal:** Extract business logic from controllers to services

#### Service Extraction (12 hours)
- [ ] Create `apps/api/src/services/lessons.service.ts`
- [ ] Create `apps/api/src/services/vocabulary.service.ts`
- [ ] Create `apps/api/src/services/users.service.ts`
- [ ] Create `apps/api/src/services/progress.service.ts`
- [ ] Move logic from controllers to services
- [ ] Update controllers to call services
- [ ] Write unit tests for services (30+ tests)

**Deliverable:** ✅ Clean architecture with tested services

---

### Day 8: Production Deployment Prep
**Goal:** Prepare production environment

#### Production Setup (6 hours)
- [ ] Review production checklist
- [ ] Set up production database (PostgreSQL)
- [ ] Configure production environment variables
- [ ] Set up automated backups (daily)
- [ ] Configure CDN for assets
- [ ] Test deployment pipeline
- [ ] Create deployment runbook

**Deliverable:** ✅ Production environment ready

---

### Day 9: Security Audit
**Goal:** Security review and hardening

#### Security Tasks (4 hours)
- [ ] Review all authentication flows
- [ ] Check CORS configuration for production
- [ ] Audit error messages for info leaks
- [ ] Review rate limiting settings
- [ ] Test account lockout after failed logins
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Add security headers review
- [ ] Test SQL injection prevention

**Deliverable:** ✅ Security audit complete

---

### Day 10: Performance Optimization
**Goal:** Optimize for production scale

#### Performance Tasks (6 hours)
- [ ] Analyze bundle size with webpack-bundle-analyzer
- [ ] Implement code splitting for routes
- [ ] Add lazy loading for components
- [ ] Optimize images (convert to WebP)
- [ ] Run Lighthouse audit (target >90)
- [ ] Add Redis caching for frequent queries (optional)
- [ ] Profile database queries
- [ ] Add response compression (gzip)

**Deliverable:** ✅ Optimized performance

---

## 📅 Week 3: Production Launch (5 Days)

### Day 11-12: E2E Testing
**Goal:** Comprehensive end-to-end testing

#### E2E Tests (10 hours)
- [ ] Set up Playwright or Cypress
- [ ] Write E2E test: Registration flow
- [ ] Write E2E test: Login flow
- [ ] Write E2E test: Lesson completion
- [ ] Write E2E test: Vocabulary review
- [ ] Write E2E test: Achievement unlock
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Mobile responsiveness testing (iOS, Android)

**Deliverable:** ✅ E2E test suite

---

### Day 13: Beta User Testing
**Goal:** Collect user feedback

#### Beta Testing (6 hours)
- [ ] Recruit 10-20 beta testers
- [ ] Prepare beta testing guide
- [ ] Deploy to staging
- [ ] Monitor usage and collect feedback
- [ ] Conduct user interviews (3-5 users)
- [ ] Analyze feedback
- [ ] Fix critical bugs discovered

**Deliverable:** ✅ User-validated application

---

### Day 14: Production Deployment
**Goal:** Deploy to production

#### Deployment Tasks (4 hours)
- [ ] Final production checklist review
- [ ] Deploy API to production (Railway/Render)
- [ ] Deploy web app to production (Vercel)
- [ ] Run database migrations
- [ ] Seed production data (15 lessons, 425 words, 53 achievements)
- [ ] Verify all environment variables
- [ ] Smoke test all critical flows
- [ ] Monitor error tracking

**Deliverable:** ✅ Live in production

---

### Day 15: Production Launch & Monitoring
**Goal:** Launch and monitor

#### Launch Day (4 hours + monitoring)
- [ ] Announce production launch
- [ ] Monitor error tracking for 1 hour
- [ ] Test user registration and login
- [ ] Complete one full lesson as a user
- [ ] Monitor server performance
- [ ] Check all integrations working
- [ ] Celebrate! 🎉

**Deliverable:** ✅ **PRODUCTION LAUNCH COMPLETE!** 🚀

---

## 📊 Success Metrics

### Alpha Launch (Week 1)
- [ ] All critical TODOs resolved (settings, leaderboard, profile)
- [ ] 50+ API integration tests passing
- [ ] Sentry error tracking configured
- [ ] 10-20 alpha testers recruited
- [ ] 0 critical bugs preventing usage

### Production Launch (Week 3)
- [ ] 80%+ test coverage (backend + frontend)
- [ ] Lighthouse score >90
- [ ] All production checklist items complete
- [ ] E2E tests passing
- [ ] Security audit complete
- [ ] 100+ registered users (goal)

---

## 🎯 Post-Launch Roadmap (Month 2-3)

### Phase 1: Complete MVP Features
1. **Exam Preparation Frontend** (8-12 hours)
   - Build exam selection UI
   - Implement exam-taking flow
   - Add grading and results display
   - Connect to existing backend (60% complete)

2. **Audio Integration** (15-20 hours)
   - Set up Google Cloud TTS API
   - Generate audio for 425 vocabulary words
   - Implement audio playback in lessons
   - Add pronunciation exercises

3. **Content Expansion** (ongoing)
   - Add 15 more B1 lessons (reach 30 total)
   - Add 200 more B2 vocabulary words
   - Create C1 preview content

### Phase 2: Enhanced Features
4. **Social Features** (10-15 hours)
   - Friends system
   - Social leaderboard (friends only)
   - Achievement sharing

5. **Mobile App** (80-100 hours)
   - React Native project setup
   - Port existing UI to mobile
   - Add push notifications
   - Offline mode support
   - iOS App Store submission

### Phase 3: Optimization & Scale
6. **Performance** (10 hours)
   - Implement Redis caching
   - CDN for static assets
   - Database query optimization
   - Bundle size reduction

7. **Advanced Analytics** (8 hours)
   - Track learning patterns
   - Personalized recommendations
   - Adaptive difficulty

---

## 💎 Quick Wins (Optional)

Low-hanging fruit that add value quickly:

1. **Achievement Progress Bars** (1 hour)
   - Show progress toward locked achievements
   - Location: `apps/web/app/(app)/achievements/page.tsx:69`

2. **Documentation Consolidation** (2 hours)
   - Merge 15 session summaries into CHANGELOG.md
   - Remove duplicate/outdated docs

3. **Error Message Audit** (2 hours)
   - Review all error messages
   - Ensure no sensitive data leaks
   - Make messages user-friendly

---

## 🔥 Current Status Tracking

### Completed Features ✅
- [x] Authentication system (JWT, refresh tokens)
- [x] Lesson system (15 lessons, progress tracking)
- [x] Vocabulary system (425 words, spaced repetition)
- [x] Achievement system (53 achievements, popups)
- [x] Streak tracking (daily activity, calendar UI)
- [x] Progress dashboard (real-time stats)
- [x] Database schema (15+ tables, indexed)
- [x] API performance (<50ms response times)

### In Progress 🔄
- [ ] Settings page (UI done, API integration pending)
- [ ] Leaderboard (UI done, using mock data)
- [ ] Profile page (basic UI, API pending)
- [ ] Test coverage (11 backend tests, 83 frontend tests passing)

### Not Started ❌
- [ ] Exam preparation frontend (backend 60% done)
- [ ] Production monitoring (Sentry)
- [ ] Level-up logic
- [ ] Audio integration
- [ ] Mobile app
- [ ] E2E tests

---

## 📝 Notes & Decisions

### Key Decisions Made
1. **Hybrid approach:** Alpha in 5 days, production in 3 weeks
2. **Focus on critical path:** Settings, leaderboard, profile, tests, monitoring
3. **Defer nice-to-haves:** Exam prep frontend, audio, mobile app
4. **Test targets:** 50+ API tests for alpha, 80%+ coverage for production
5. **Monitoring:** Sentry for errors, UptimeRobot for uptime

### Risks & Mitigations
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Settings API takes longer | Medium | High | Timebox to 6h, simplify if needed |
| Test writing takes too long | Medium | Medium | Focus on critical paths only |
| Alpha bugs block users | Low | High | Thorough smoke testing before launch |
| Production deployment issues | Low | High | Test on staging first, have rollback plan |

---

## 🏆 Definition of Done

### Alpha Launch Ready
- [x] Settings page fully functional
- [x] Leaderboard shows real data
- [x] Profile page works
- [x] 50+ API integration tests passing
- [x] Sentry error tracking enabled
- [x] Deployed to staging
- [x] Smoke tests passing
- [x] 10+ alpha testers invited

### Production Launch Ready
- [x] All alpha requirements met
- [x] 80%+ test coverage
- [x] E2E tests passing
- [x] Security audit complete
- [x] Performance optimized (Lighthouse >90)
- [x] Production checklist complete
- [x] Monitoring and alerts configured
- [x] Deployment runbook documented
- [x] Beta user feedback addressed

---

**Last Updated:** November 22, 2025
**Next Review:** November 23, 2025 (after Day 1)
**Owner:** Development Team
**Status:** 🚀 **EXECUTION PHASE - LET'S GO!**

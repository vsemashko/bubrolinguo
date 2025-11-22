# Refined Roadmap & Implementation Plan
**Date:** November 22, 2025
**Status:** Phase 2 & 4 Partially Complete - Moving to Phase 5
**Branch:** `claude/implement-roadmap-items-01GoT6E485rLjGCKmZkvQNU6`

---

## 🎯 Executive Summary

### Current State Analysis

**What's Actually Complete:**
- ✅ **Phase 1:** Backend infrastructure (100%)
- ✅ **Phase 2:** UI Components built (100%)
  - Loading skeletons ✅
  - Streak tracking UI ✅
  - Achievement popups ✅
  - Dashboard enhancements ✅
- ✅ **Phase 4:** Database & auth infrastructure (100%)
  - PostgreSQL initialized
  - Authentication working with bcrypt + JWT
  - 999 vocabulary words loaded
  - 53 achievements loaded

**Critical Gap - Data Loading:**
- ⚠️ **Only 3 lessons in database** (need 30)
- ⚠️ **999 words loaded** (roadmap says 1,700 needed)
- ⚠️ **UI components not connected to real backend logic**

**Bottom Line:** We have all the code and UI components, but need to:
1. Load remaining 27 lessons
2. Connect frontend to backend logic
3. Implement backend gamification logic (streak tracking, achievements)
4. Complete settings page
5. Test end-to-end

---

## 📊 Detailed Gap Analysis

### What We Have (Assets Ready)

**Lesson Content Available:**
```
✅ lessons.sql (15 lessons: A1-A2)
✅ lessons-a2-b1-extended.sql (15 lessons: A2-B1)
✅ lessons-b1.sql (B1 additional content)
✅ lessons-b2.sql (B2 content)
Total available: 30+ lessons ready to load
```

**Vocabulary Content Available:**
```
✅ vocabulary.sql (425 A1-A2 words)
✅ vocabulary-b1-b2.sql (900 B1-B2 words)
✅ vocabulary-specialized.sql
✅ vocabulary-c1-preview.sql
Total available: 1,325+ words ready to load
```

**UI Components Built:**
```
✅ StreakFireIcon.tsx
✅ StreakStats.tsx
✅ StreakProtection.tsx
✅ AchievementPopup.tsx
✅ SkeletonLessonCard.tsx
✅ SkeletonDashboard.tsx
✅ Dashboard with enhanced streak section
```

**Backend Controllers & Routes:**
```
✅ auth.controller.ts (full implementation)
✅ lessons.controller.ts
✅ vocabulary.controller.ts
✅ progress.controller.ts
✅ users.controller.ts
✅ All routes configured
```

### What's Missing (Implementation Gaps)

**Backend Logic Gaps:**
1. ❌ **Streak tracking backend** - Frontend UI exists, but no backend logic to:
   - Calculate daily streaks
   - Track last activity date
   - Handle streak freezes
   - Award streak achievements

2. ❌ **Achievement unlocking logic** - Popup UI exists, but no backend to:
   - Detect achievement conditions
   - Award achievements
   - Track user_achievements table
   - Trigger achievement popups

3. ❌ **Leaderboard backend** - Page exists but needs:
   - Leaderboard data aggregation
   - Ranking calculation
   - Friend filtering
   - Weekly/monthly/all-time views

4. ❌ **Settings page functionality** - UI skeleton exists but needs:
   - User preference updates
   - Interface language toggle
   - Notification settings
   - Account management

**Data Loading Gaps:**
5. ❌ **Load lessons 16-30** (only 3 lessons currently in DB)
6. ❌ **Load remaining vocabulary** (need ~326 more words for 1,325 total)

**Integration Gaps:**
7. ❌ **Connect streak UI to backend** - Components built but not integrated
8. ❌ **Connect achievement popups to events** - Popup exists but not triggered
9. ❌ **Spaced repetition backend** - Algorithm implementation needed

---

## 🚀 Refined Implementation Plan

### Phase 5: Complete Backend Logic & Integration (Current Phase)

**Timeline:** 3-4 days
**Goal:** Connect UI to backend, implement gamification logic, complete data loading

#### Day 1: Data Loading & Verification ✅ (PRIORITY)

**Morning: Load All Content**
- [x] Start PostgreSQL & Redis
- [ ] Load lessons 16-30 using `npm run db:add-lessons`
- [ ] Load all vocabulary files
- [ ] Verify counts:
  - [ ] 30 lessons total
  - [ ] 1,325+ vocabulary words
  - [ ] 53 achievements
- [ ] Test lesson API endpoints
- [ ] Test vocabulary API endpoints

**Afternoon: Database Verification**
- [ ] Query all lessons and verify structure
- [ ] Check vocabulary with translations
- [ ] Verify achievements loaded
- [ ] Test user registration/login flow
- [ ] Create 2-3 test user accounts

#### Day 2: Streak Tracking Implementation

**Backend Implementation:**
- [ ] Create `streak.service.ts`:
  ```typescript
  - calculateStreak(userId): Promise<number>
  - updateLastActiveDate(userId): Promise<void>
  - checkStreakFreeze(userId): Promise<boolean>
  - awardStreakAchievements(userId, streakCount): Promise<void>
  ```

- [ ] Create `streak.controller.ts`:
  ```typescript
  - GET /api/v1/users/:id/streak
  - POST /api/v1/users/:id/activity (update last active)
  - POST /api/v1/users/:id/streak/freeze
  - GET /api/v1/users/:id/streak/stats
  ```

- [ ] Update `users` table tracking:
  - `last_active_date`
  - `streak_count`
  - `longest_streak`
  - `streak_freeze_available`

**Frontend Integration:**
- [ ] Connect `StreakStats.tsx` to real API
- [ ] Connect `StreakProtection.tsx` to freeze endpoint
- [ ] Update Dashboard to fetch real streak data
- [ ] Add activity tracker (auto-update on lesson completion)

#### Day 3: Achievement System Implementation

**Backend Implementation:**
- [ ] Create `achievements.service.ts`:
  ```typescript
  - checkAndAwardAchievements(userId, event): Promise<Achievement[]>
  - getUserAchievements(userId): Promise<Achievement[]>
  - unlockAchievement(userId, achievementId): Promise<void>
  ```

- [ ] Create `achievements.controller.ts`:
  ```typescript
  - GET /api/v1/achievements
  - GET /api/v1/users/:id/achievements
  - POST /api/v1/users/:id/achievements/:achievementId/unlock
  ```

- [ ] Implement achievement triggers:
  - Lesson completion → check lesson achievement
  - XP milestone → check XP achievement
  - Streak milestone → check streak achievement
  - Vocabulary mastery → check vocab achievement

**Frontend Integration:**
- [ ] Create achievement detection service
- [ ] Connect `AchievementPopup.tsx` to unlock events
- [ ] Add achievement toast notifications
- [ ] Update achievements page with real data

#### Day 4: Leaderboard & Settings

**Leaderboard Backend:**
- [ ] Create `leaderboard.service.ts`:
  ```typescript
  - getGlobalLeaderboard(timeframe): Promise<LeaderboardEntry[]>
  - getFriendsLeaderboard(userId): Promise<LeaderboardEntry[]>
  - getUserRank(userId): Promise<number>
  ```

- [ ] Create `leaderboard.controller.ts`:
  ```typescript
  - GET /api/v1/leaderboard?timeframe=weekly|monthly|all
  - GET /api/v1/leaderboard/friends
  - GET /api/v1/users/:id/rank
  ```

**Settings Page:**
- [ ] Create `settings.controller.ts`:
  ```typescript
  - PATCH /api/v1/users/:id/settings
  - PATCH /api/v1/users/:id/preferences
  - PATCH /api/v1/users/:id/notifications
  ```

- [ ] Implement settings frontend:
  - [ ] Profile settings (display name, avatar)
  - [ ] Interface language toggle
  - [ ] Learning preferences
  - [ ] Notification preferences
  - [ ] Account management (password change, delete account)

#### Day 5: Spaced Repetition & Testing

**Spaced Repetition Implementation:**
- [ ] Implement SM-2 algorithm in `vocabulary.service.ts`
- [ ] Create review queue management
- [ ] Add endpoints:
  ```typescript
  - GET /api/v1/vocabulary/review/due
  - POST /api/v1/vocabulary/review/:wordId
  - GET /api/v1/vocabulary/review/stats
  ```

- [ ] Connect vocabulary review page to backend

**End-to-End Testing:**
- [ ] Test complete user journey:
  1. Register → Login
  2. View lessons → Complete lesson
  3. Earn XP → Level up
  4. Update streak → View streak stats
  5. Unlock achievement → See popup
  6. Review vocabulary → Check spaced repetition
  7. View leaderboard → Check rankings
  8. Update settings → Verify changes

- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile responsive testing
- [ ] Performance testing (load times, API response times)

---

## 📋 Implementation Checklist

### Phase 5 Deliverables

**Backend Services (6 new services):**
- [ ] `streak.service.ts` - Streak calculation and management
- [ ] `achievements.service.ts` - Achievement detection and awarding
- [ ] `leaderboard.service.ts` - Rankings and leaderboard data
- [ ] `settings.service.ts` - User preference management
- [ ] `spaced-repetition.service.ts` - SM-2 algorithm implementation
- [ ] `activity.service.ts` - User activity tracking

**Backend Controllers (5 new controllers):**
- [ ] `streak.controller.ts` - 4 endpoints
- [ ] `achievements.controller.ts` - 3 endpoints
- [ ] `leaderboard.controller.ts` - 3 endpoints
- [ ] `settings.controller.ts` - 3 endpoints
- [ ] Activity tracking in existing controllers

**Frontend Integration (8 integrations):**
- [ ] Streak UI → Backend API
- [ ] Achievement popup → Backend events
- [ ] Leaderboard page → Backend API
- [ ] Settings page → Backend API
- [ ] Vocabulary review → Spaced repetition backend
- [ ] Dashboard stats → Real-time data
- [ ] Activity tracking → Auto-updates
- [ ] Toast notifications → Event-driven

**Data Loading:**
- [ ] 30 lessons in database (currently 3)
- [ ] 1,325+ vocabulary words (currently 999)
- [ ] All achievements verified
- [ ] Test users created

**Testing:**
- [ ] All endpoints tested with curl/Postman
- [ ] All pages tested in browser
- [ ] End-to-end user flows verified
- [ ] Mobile responsiveness checked
- [ ] Performance benchmarks met

---

## 🎯 Success Criteria

### Phase 5 Complete When:
- [ ] 30 lessons available in app
- [ ] 1,325+ vocabulary words available
- [ ] Streak tracking fully functional (UI + backend)
- [ ] Achievements unlock automatically
- [ ] Leaderboard shows real rankings
- [ ] Settings page functional
- [ ] Spaced repetition working
- [ ] All major user flows tested
- [ ] Zero critical bugs
- [ ] Performance acceptable (<2s page load)

### Ready for Phase 6 (Alpha Launch) When:
- [ ] All Phase 5 criteria met
- [ ] Documentation updated
- [ ] Deployment scripts ready
- [ ] Monitoring configured
- [ ] Alpha tester accounts created
- [ ] Feedback collection system ready

---

## 📈 Progress Tracking

### Overall MVP Progress
- **Before Phase 5:** 75% (UI built, auth working, partial data)
- **After Day 1 (data loading):** 80%
- **After Day 2 (streak system):** 85%
- **After Day 3 (achievements):** 90%
- **After Day 4 (leaderboard + settings):** 95%
- **After Day 5 (testing + polish):** 100% MVP READY 🎉

### Estimated Timeline
- **Day 1-5:** Phase 5 implementation (5 days)
- **Day 6-10:** Alpha testing with 10-20 users (5 days)
- **Day 11-15:** Bug fixes and polish (5 days)
- **Day 16-17:** Beta preparation (2 days)
- **Day 18:** Public Beta Launch 🚀

**Total to Beta:** ~18 days (3 weeks)

---

## 🔧 Technical Implementation Notes

### Streak System Architecture
```typescript
// Cron job runs daily at midnight (00:00 UTC)
async function checkAndUpdateStreaks() {
  const users = await getActiveUsers()

  for (const user of users) {
    const lastActive = user.last_active_date
    const today = new Date()
    const daysSinceActive = differenceInDays(today, lastActive)

    if (daysSinceActive === 0) {
      // Active today, maintain streak
      continue
    } else if (daysSinceActive === 1) {
      // Streak continues (they were active yesterday)
      continue
    } else if (daysSinceActive === 2 && user.streak_freeze_available > 0) {
      // Auto-use streak freeze
      await useStreakFreeze(user.id)
    } else {
      // Streak broken
      await resetStreak(user.id)
      await notifyStreakBroken(user.id)
    }
  }
}
```

### Achievement Detection Pattern
```typescript
// After any user action (lesson complete, vocab review, etc.)
async function onUserAction(userId: string, action: UserAction) {
  // Update user stats
  await updateUserStats(userId, action)

  // Check for new achievements
  const newAchievements = await checkAchievements(userId, action)

  // Award and notify
  for (const achievement of newAchievements) {
    await awardAchievement(userId, achievement.id)
    await notifyAchievement(userId, achievement)
  }
}
```

### SM-2 Spaced Repetition
```typescript
function calculateNextReview(quality: number, easeFactor: number, interval: number) {
  // quality: 0-5 (how well user knew the word)
  // easeFactor: difficulty multiplier (default 2.5)
  // interval: days since last review

  const newEF = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))

  let newInterval: number
  if (quality < 3) {
    newInterval = 1 // Review tomorrow
  } else {
    newInterval = interval === 0 ? 1 : Math.round(interval * newEF)
  }

  return { easeFactor: newEF, interval: newInterval }
}
```

---

## 🚀 Next Steps (Immediate)

### To Start Phase 5 Implementation:

1. **First, load all data:**
   ```bash
   # Start services
   service postgresql start
   redis-server --daemonize yes

   # Load lessons
   cd apps/api
   npm run db:add-lessons

   # Load vocabulary
   psql -U postgres -d bubrolinguo -f src/db/seeds/vocabulary.sql
   psql -U postgres -d bubrolinguo -f src/db/seeds/vocabulary-b1-b2.sql

   # Verify
   psql -U postgres -d bubrolinguo -c "SELECT COUNT(*) FROM lessons;"
   psql -U postgres -d bubrolinguo -c "SELECT COUNT(*) FROM vocabulary;"
   ```

2. **Then implement backend services in order:**
   - Day 1: Data loading ✅
   - Day 2: Streak system
   - Day 3: Achievement system
   - Day 4: Leaderboard + Settings
   - Day 5: Spaced repetition + Testing

3. **Commit and push after each day**

4. **Test continuously, not just at the end**

---

## 📞 Questions to Clarify

Before starting implementation, confirm:
1. **Data priority:** Focus on 30 lessons first, or also load all 1,325 words?
2. **Streak system:** Should streak freeze be a premium feature or available to all?
3. **Leaderboard:** Global only, or also by country/language?
4. **Settings:** Which settings are highest priority?
5. **Testing:** Manual testing sufficient, or need automated E2E tests?

---

**Status:** ✅ Ready to Implement Phase 5
**Next Action:** Start Day 1 - Data Loading & Verification
**Target Completion:** November 27, 2025 (5 days)
**MVP Launch:** December 10, 2025 (~3 weeks)

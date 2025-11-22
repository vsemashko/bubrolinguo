# Lesson Expansion: 15 → 30 Lessons

## Overview

This update adds 15 new lessons (lessons 16-30) to expand the lesson library from 15 to 30 lessons, meeting the MVP content target.

## New Content

### Lessons 16-30 (A2-B1 Level)

**Unit 6: Daily Life (A2)**
- Lesson 16: Daily Routine
- Lesson 17: House and Home
- Lesson 18: Describing People

**Unit 7: Past and Future (A2-B1)**
- Lesson 19: Past Tense Basics
- Lesson 20: Future Plans
- Lesson 21: Telling Stories

**Unit 8: Opinions and Ideas (B1)**
- Lesson 22: Expressing Opinions
- Lesson 23: Likes and Dislikes
- Lesson 24: Comparing Things

**Unit 9: Culture and Society (B1)**
- Lesson 25: Polish Holidays
- Lesson 26: Entertainment and Media
- Lesson 27: Sports and Fitness

**Unit 10: Advanced Communication (B1)**
- Lesson 28: Formal vs Informal Speech
- Lesson 29: Problem Solving
- Lesson 30: Giving Advice

## How to Add New Lessons

### Method 1: Using the Update Script (Recommended)

```bash
cd apps/api
npm run db:add-lessons
```

This script will:
- Check current lesson count
- Add lessons 16-30 if not present
- Verify the update
- Skip if lessons already exist

### Method 2: Manual SQL Execution

If the database is running:

```bash
psql -U postgres -d bubrolinguo -f src/db/seeds/lessons-a2-b1-extended.sql
```

### Method 3: Full Database Reset

To reset and seed all data including new lessons:

```bash
cd apps/api
npm run db:reset
```

**Note:** This will delete all existing data!

## Verification

After adding lessons, verify the update:

```bash
# Check lesson count
psql -U postgres -d bubrolinguo -c "SELECT COUNT(*) FROM lessons;"

# View lesson range
psql -U postgres -d bubrolinguo -c "SELECT MIN(lesson_number), MAX(lesson_number) FROM lessons;"

# List all lessons
psql -U postgres -d bubrolinguo -c "SELECT lesson_number, level, title_en FROM lessons ORDER BY lesson_number;"
```

Or use the API:

```bash
curl http://localhost:3001/api/v1/lessons | jq '.data.total'
curl http://localhost:3001/api/v1/lessons | jq '.data.lessons[] | {number: .lesson_number, title: .title_en, level: .level}'
```

## Files

- **lessons-a2-b1-extended.sql** - SQL seed file with lessons 16-30
- **add-lessons-16-30.ts** - TypeScript script to safely add new lessons
- **package.json** - Updated with `db:add-lessons` command

## Roadmap Progress

- ✅ Lessons 1-15: Complete (A1-A2)
- ✅ Lessons 16-30: Ready to deploy (A2-B1)
- 🎯 **Total:** 30 lessons (MVP target achieved!)

## Next Steps

After deploying these lessons:
1. Test lesson playback in the web app
2. Verify exercises work correctly
3. Update lesson thumbnails and imagery (optional)
4. Continue with Phase 2 roadmap items

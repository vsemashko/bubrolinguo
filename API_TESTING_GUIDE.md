# API Testing Guide

Complete guide for testing all Bubrolinguo API endpoints.

## Prerequisites

1. **Database Setup**
```bash
# Start PostgreSQL (if using Docker)
docker-compose up -d

# OR install PostgreSQL locally
# macOS: brew install postgresql@15
# Ubuntu: sudo apt install postgresql-15

# Initialize database
cd apps/api
npm run db:init    # Run migrations
npm run db:seed    # Seed data
```

2. **Start API Server**
```bash
cd apps/api
npm run dev
```

Server should be running on `http://localhost:3001`

---

## Test User Setup

First, create a test user:

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@bubrolinguo.com",
    "password": "Test123!@#",
    "username": "testuser",
    "native_language": "ru"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "test@bubrolinguo.com",
      "username": "testuser",
      "native_language": "ru",
      "created_at": "2025-11-21T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Save the token** - you'll need it for authenticated requests:
```bash
export TOKEN="your_token_here"
```

---

## 1. Authentication Endpoints

### Register
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePass123!",
    "username": "newuser"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@bubrolinguo.com",
    "password": "Test123!@#"
  }'
```

### Refresh Token
```bash
curl -X POST http://localhost:3001/api/v1/auth/refresh \
  -H "Authorization: Bearer $TOKEN"
```

---

## 2. Lessons Endpoints

### Get All Lessons
```bash
# All lessons
curl http://localhost:3001/api/v1/lessons \
  -H "Authorization: Bearer $TOKEN"

# Filter by level
curl "http://localhost:3001/api/v1/lessons?level=A1" \
  -H "Authorization: Bearer $TOKEN"

# Filter by status
curl "http://localhost:3001/api/v1/lessons?status=not_started" \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "lessons": [
      {
        "id": 1,
        "lessonNumber": 1,
        "level": "A1",
        "titleEn": "Polish Alphabet and Pronunciation",
        "titleRu": "Польский алфавит и произношение",
        "descriptionEn": "Learn the Polish alphabet...",
        "xpReward": 20,
        "estimatedDuration": 15,
        "exerciseCount": 6,
        "isLocked": false
      }
    ],
    "total": 30
  }
}
```

### Get Lesson by ID
```bash
curl http://localhost:3001/api/v1/lessons/1 \
  -H "Authorization: Bearer $TOKEN"
```

### Submit Lesson Result
```bash
curl -X POST http://localhost:3001/api/v1/lessons/1/submit \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "score": 85,
    "xp_earned": 20,
    "mistakes_count": 2,
    "time_spent": 900,
    "exercise_results": [
      {"exercise_id": 1, "correct": true, "time_spent": 120},
      {"exercise_id": 2, "correct": true, "time_spent": 150}
    ]
  }'
```

### Get Next Lesson
```bash
curl http://localhost:3001/api/v1/lessons/next \
  -H "Authorization: Bearer $TOKEN"
```

---

## 3. Vocabulary Endpoints

### Get Vocabulary Words
```bash
# All vocabulary
curl http://localhost:3001/api/v1/vocabulary \
  -H "Authorization: Bearer $TOKEN"

# Filter by level
curl "http://localhost:3001/api/v1/vocabulary?level=A1&limit=50" \
  -H "Authorization: Bearer $TOKEN"

# Search
curl "http://localhost:3001/api/v1/vocabulary?search=cześć" \
  -H "Authorization: Bearer $TOKEN"

# Filter by part of speech
curl "http://localhost:3001/api/v1/vocabulary?part_of_speech=verb&level=B1" \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "vocabulary": [
      {
        "id": 1,
        "polish_word": "cześć",
        "translation_en": "hi, hello",
        "translation_ru": "привет",
        "part_of_speech": "interjection",
        "level": "A1",
        "pronunciation_ipa": "t͡ʂɛɕt͡ɕ",
        "example_sentence_pl": "Cześć! Jak się masz?",
        "example_sentence_en": "Hi! How are you?",
        "example_sentence_ru": "Привет! Как дела?"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 34,
      "total_count": 1700
    }
  }
}
```

### Get Vocabulary by ID
```bash
curl http://localhost:3001/api/v1/vocabulary/1 \
  -H "Authorization: Bearer $TOKEN"
```

### Start Vocabulary Practice
```bash
curl -X POST http://localhost:3001/api/v1/vocabulary/practice/start \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "level": "A1",
    "count": 20,
    "practice_type": "flashcard"
  }'
```

### Submit Vocabulary Answer
```bash
curl -X POST http://localhost:3001/api/v1/vocabulary/practice/answer \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "abc123",
    "word_id": 1,
    "quality": 5,
    "time_spent_seconds": 8
  }'
```

**Quality scale:**
- 0: Complete blackout
- 1: Incorrect, but recognized
- 2: Incorrect, but easy to recall
- 3: Correct, but difficult
- 4: Correct, with hesitation
- 5: Perfect recall

### Get Due Vocabulary
```bash
curl http://localhost:3001/api/v1/vocabulary/due \
  -H "Authorization: Bearer $TOKEN"
```

---

## 4. Exam Preparation Endpoints

### Get All Mock Exams
```bash
# All exams
curl http://localhost:3001/api/v1/exams \
  -H "Authorization: Bearer $TOKEN"

# Filter by level
curl "http://localhost:3001/api/v1/exams?level=A1" \
  -H "Authorization: Bearer $TOKEN"

# Filter by exam type
curl "http://localhost:3001/api/v1/exams?exam_type=full" \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "exams": [
      {
        "id": 1,
        "title_en": "A1 Polish Language Certification Mock Exam",
        "title_ru": "Пробный экзамен A1 на сертификат польского языка",
        "level": "A1",
        "exam_type": "full",
        "total_time_minutes": 90,
        "passing_score_percentage": 60,
        "sections": [
          {
            "section_type": "reading",
            "title_en": "Reading Comprehension",
            "time_limit_minutes": 25,
            "max_points": 30,
            "question_count": 10
          }
        ]
      }
    ],
    "total": 4
  }
}
```

### Get Exam by ID
```bash
curl http://localhost:3001/api/v1/exams/1 \
  -H "Authorization: Bearer $TOKEN"
```

### Start Exam Attempt
```bash
curl -X POST http://localhost:3001/api/v1/exams/1/start \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "attempt_id": 1,
    "exam_id": 1,
    "status": "in_progress",
    "started_at": "2025-11-21T10:00:00Z",
    "expires_at": "2025-11-21T11:30:00Z",
    "current_section": {
      "id": 1,
      "section_type": "reading",
      "title_en": "Reading Comprehension",
      "time_limit_minutes": 25,
      "questions": [...]
    }
  }
}
```

### Submit Section Answers
```bash
curl -X POST http://localhost:3001/api/v1/exams/attempts/1/sections/1/submit \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "answers": [
      {
        "question_id": 101,
        "answer_data": {"selectedOptionId": "a"},
        "time_spent_seconds": 120
      },
      {
        "question_id": 102,
        "answer_data": {"answers": ["jest"]},
        "time_spent_seconds": 45
      }
    ]
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "section_completed": true,
    "auto_graded_results": {
      "correct_count": 8,
      "incorrect_count": 2,
      "points_earned": 24,
      "points_possible": 30
    },
    "manual_grading_required": false,
    "next_section": {
      "id": 2,
      "section_type": "listening",
      "title_en": "Listening Comprehension"
    }
  }
}
```

### Complete Exam
```bash
curl -X POST http://localhost:3001/api/v1/exams/attempts/1/complete \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "attempt_id": 1,
    "status": "completed",
    "completed_at": "2025-11-21T11:25:00Z",
    "total_points_earned": 72,
    "total_points_possible": 100,
    "percentage_score": 72,
    "passed": true,
    "section_scores": {
      "reading": {"earned": 24, "possible": 30, "percentage": 80},
      "listening": {"earned": 16, "possible": 20, "percentage": 80},
      "writing": {"earned": 18, "possible": 25, "percentage": 72},
      "speaking": {"earned": 14, "possible": 25, "percentage": 56}
    }
  }
}
```

### Get Exam Results
```bash
curl http://localhost:3001/api/v1/exams/attempts/1/results \
  -H "Authorization: Bearer $TOKEN"
```

### Get Study Resources
```bash
# All resources
curl http://localhost:3001/api/v1/exams/study-resources \
  -H "Authorization: Bearer $TOKEN"

# Filter by level and section
curl "http://localhost:3001/api/v1/exams/study-resources?level=A1&section_type=speaking" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 5. Progress Endpoints

### Get User Dashboard
```bash
curl http://localhost:3001/api/v1/users/me/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "username": "testuser",
      "current_level": "A2",
      "xp_points": 1250,
      "streak_days": 12
    },
    "learning_stats": {
      "total_lessons_completed": 18,
      "vocabulary_mastered": 425,
      "total_study_time_minutes": 1820,
      "average_score": 82
    },
    "recent_activity": [...],
    "upcoming_reviews": {
      "vocabulary_due_today": 25
    }
  }
}
```

### Get User Statistics
```bash
curl http://localhost:3001/api/v1/progress/stats \
  -H "Authorization: Bearer $TOKEN"
```

### Get Learning Streak
```bash
curl http://localhost:3001/api/v1/progress/streak \
  -H "Authorization: Bearer $TOKEN"
```

---

## 6. Complete Exam Flow Test

Test the complete exam flow from start to finish:

```bash
#!/bin/bash

# 1. Register and login
echo "1. Creating test user..."
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "examtest@example.com",
    "password": "Test123!",
    "username": "examtester"
  }')

TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.data.token')
echo "✓ Token: ${TOKEN:0:20}..."

# 2. Get available exams
echo -e "\n2. Getting available exams..."
curl -s http://localhost:3001/api/v1/exams?level=A1 \
  -H "Authorization: Bearer $TOKEN" | jq '.data.exams[0] | {id, title_en, level}'

# 3. Start exam attempt
echo -e "\n3. Starting exam attempt..."
ATTEMPT_RESPONSE=$(curl -s -X POST http://localhost:3001/api/v1/exams/1/start \
  -H "Authorization: Bearer $TOKEN")

ATTEMPT_ID=$(echo $ATTEMPT_RESPONSE | jq -r '.data.attempt_id')
SECTION_ID=$(echo $ATTEMPT_RESPONSE | jq -r '.data.current_section.id')
echo "✓ Attempt ID: $ATTEMPT_ID"
echo "✓ First Section ID: $SECTION_ID"

# 4. Submit section answers
echo -e "\n4. Submitting reading section answers..."
curl -s -X POST http://localhost:3001/api/v1/exams/attempts/$ATTEMPT_ID/sections/$SECTION_ID/submit \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "answers": [
      {"question_id": 101, "answer_data": {"selectedOptionId": "b"}, "time_spent_seconds": 60},
      {"question_id": 102, "answer_data": {"selectedOptionId": "a"}, "time_spent_seconds": 45}
    ]
  }' | jq '.data.auto_graded_results'

# 5. Complete exam
echo -e "\n5. Completing exam..."
curl -s -X POST http://localhost:3001/api/v1/exams/attempts/$ATTEMPT_ID/complete \
  -H "Authorization: Bearer $TOKEN" | jq '.data | {percentage_score, passed, section_scores}'

# 6. Get results
echo -e "\n6. Getting detailed results..."
curl -s http://localhost:3001/api/v1/exams/attempts/$ATTEMPT_ID/results \
  -H "Authorization: Bearer $TOKEN" | jq '.data | {attempt_id, percentage_score, passed}'

echo -e "\n✓ Complete exam flow test finished!"
```

---

## 7. Error Testing

Test error handling:

### 401 Unauthorized
```bash
curl http://localhost:3001/api/v1/lessons \
  -H "Authorization: Bearer invalid_token"
```

**Expected:**
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

### 404 Not Found
```bash
curl http://localhost:3001/api/v1/lessons/99999 \
  -H "Authorization: Bearer $TOKEN"
```

**Expected:**
```json
{
  "success": false,
  "error": {
    "code": "LESSON_NOT_FOUND",
    "message": "Lesson not found"
  }
}
```

### 400 Bad Request
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "password": "short"
  }'
```

---

## 8. Performance Testing

Test with multiple concurrent requests:

```bash
#!/bin/bash

# Install Apache Bench if needed: apt-get install apache2-utils

# Test lessons endpoint
ab -n 100 -c 10 \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/v1/lessons

# Test vocabulary endpoint
ab -n 100 -c 10 \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/v1/vocabulary?level=A1

echo "Performance test complete!"
```

---

## 9. Data Validation

Verify seeded data integrity:

```bash
#!/bin/bash

echo "Checking database content..."

# Check lessons count
LESSONS=$(curl -s http://localhost:3001/api/v1/lessons -H "Authorization: Bearer $TOKEN" | jq '.data.total')
echo "Lessons: $LESSONS (expected: 30)"

# Check vocabulary by level
A1_VOCAB=$(curl -s "http://localhost:3001/api/v1/vocabulary?level=A1&limit=1000" -H "Authorization: Bearer $TOKEN" | jq '.data.pagination.total_count')
A2_VOCAB=$(curl -s "http://localhost:3001/api/v1/vocabulary?level=A2&limit=1000" -H "Authorization: Bearer $TOKEN" | jq '.data.pagination.total_count')
B1_VOCAB=$(curl -s "http://localhost:3001/api/v1/vocabulary?level=B1&limit=1000" -H "Authorization: Bearer $TOKEN" | jq '.data.pagination.total_count')
B2_VOCAB=$(curl -s "http://localhost:3001/api/v1/vocabulary?level=B2&limit=1000" -H "Authorization: Bearer $TOKEN" | jq '.data.pagination.total_count')
C1_VOCAB=$(curl -s "http://localhost:3001/api/v1/vocabulary?level=C1&limit=1000" -H "Authorization: Bearer $TOKEN" | jq '.data.pagination.total_count')

echo "A1 Vocabulary: $A1_VOCAB"
echo "A2 Vocabulary: $A2_VOCAB"
echo "B1 Vocabulary: $B1_VOCAB"
echo "B2 Vocabulary: $B2_VOCAB"
echo "C1 Vocabulary: $C1_VOCAB"
TOTAL=$((A1_VOCAB + A2_VOCAB + B1_VOCAB + B2_VOCAB + C1_VOCAB))
echo "Total Vocabulary: $TOTAL (expected: 1700)"

# Check exam questions
EXAMS=$(curl -s http://localhost:3001/api/v1/exams -H "Authorization: Bearer $TOKEN" | jq '.data.total')
echo "Mock Exams: $EXAMS (expected: 4)"

echo -e "\n✓ Data validation complete!"
```

---

## 10. Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432

# Check database exists
psql -h localhost -U postgres -c "\l" | grep bubrolinguo

# Re-initialize if needed
npm run db:init
```

### API Server Issues
```bash
# Check if server is running
curl http://localhost:3001/health

# Check logs
cd apps/api
npm run dev  # Watch for errors
```

### Token Expiration
```bash
# Refresh your token
curl -X POST http://localhost:3001/api/v1/auth/refresh \
  -H "Authorization: Bearer $OLD_TOKEN"
```

---

## Summary Checklist

- [ ] Database initialized and seeded
- [ ] API server running
- [ ] Test user created
- [ ] All auth endpoints tested
- [ ] Lessons endpoints tested
- [ ] Vocabulary endpoints tested
- [ ] Exam flow tested end-to-end
- [ ] Progress endpoints tested
- [ ] Error handling verified
- [ ] Data integrity validated

---

**Ready for frontend integration once all tests pass!** 🚀

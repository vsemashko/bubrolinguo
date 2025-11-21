# Bubrolinguo API Documentation

Comprehensive REST API specification for the Bubrolinguo Polish language learning platform.

## Table of Contents

1. [Authentication](#authentication)
2. [Lessons](#lessons)
3. [Vocabulary](#vocabulary)
4. [Exercises](#exercises)
5. [Exam Preparation](#exam-preparation)
6. [User Progress](#user-progress)
7. [Achievements](#achievements)
8. [Study Resources](#study-resources)

---

## Base URL

```
Development: http://localhost:3000/api/v1
Production: https://api.bubrolinguo.com/v1
```

## Authentication

All endpoints require authentication via JWT tokens (except registration and login).

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "username": "learner123",
  "native_language": "ru"
}
```

**Response (201):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "learner123",
    "native_language": "ru",
    "created_at": "2025-11-21T10:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "learner123",
    "current_level": "A2",
    "xp_points": 450,
    "streak_days": 7
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Refresh Token
```http
POST /auth/refresh
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## Lessons

### Get All Lessons
```http
GET /lessons?level={level}&status={status}
```

**Query Parameters:**
- `level` (optional): Filter by CEFR level (A1, A2, B1, B2, C1, C2)
- `status` (optional): Filter by completion status (completed, in_progress, not_started)
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Results per page (default: 10)

**Response (200):**
```json
{
  "lessons": [
    {
      "id": 1,
      "title_en": "Polish Alphabet and Pronunciation",
      "title_ru": "Польский алфавит и произношение",
      "description_en": "Learn the Polish alphabet...",
      "description_ru": "Изучите польский алфавит...",
      "level": "A1",
      "lesson_number": 1,
      "estimated_minutes": 15,
      "xp_reward": 20,
      "is_published": true,
      "user_progress": {
        "status": "completed",
        "score": 85,
        "completed_at": "2025-11-15T14:30:00Z"
      }
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 3,
    "total_count": 30,
    "per_page": 10
  }
}
```

### Get Lesson by ID
```http
GET /lessons/:id
```

**Response (200):**
```json
{
  "id": 1,
  "title_en": "Polish Alphabet and Pronunciation",
  "title_ru": "Польский алфавит и произношение",
  "description_en": "Learn the Polish alphabet and master pronunciation...",
  "description_ru": "Изучите польский алфавит и освойте произношение...",
  "level": "A1",
  "lesson_number": 1,
  "estimated_minutes": 15,
  "xp_reward": 20,
  "prerequisites": [],
  "exercises": {
    "total_count": 6,
    "exercises": [
      {
        "id": 101,
        "type": "multiple_choice",
        "question": "How do you pronounce 'ą'?",
        "options": ["on", "an", "om", "am"],
        "correct_answer": 0
      }
    ]
  },
  "vocabulary_introduced": [
    {
      "id": 1,
      "polish_word": "cześć",
      "translation_en": "hi, hello",
      "translation_ru": "привет",
      "pronunciation_ipa": "t͡ʂɛɕt͡ɕ"
    }
  ],
  "user_progress": {
    "status": "in_progress",
    "current_exercise": 3,
    "score": 66,
    "attempts": 2
  }
}
```

### Start Lesson
```http
POST /lessons/:id/start
```

**Response (200):**
```json
{
  "progress_id": 123,
  "lesson_id": 1,
  "status": "in_progress",
  "started_at": "2025-11-21T10:00:00Z",
  "current_exercise": 1
}
```

### Submit Lesson Exercise
```http
POST /lessons/:lessonId/exercises/:exerciseId/submit
```

**Request Body:**
```json
{
  "answer": "a",
  "time_spent_seconds": 45
}
```

**Response (200):**
```json
{
  "correct": true,
  "explanation": "Great! 'cześć' is the informal way to say hello in Polish.",
  "points_earned": 2,
  "progress": {
    "current_exercise": 2,
    "total_exercises": 6,
    "score": 33
  }
}
```

### Complete Lesson
```http
POST /lessons/:id/complete
```

**Request Body:**
```json
{
  "final_score": 85,
  "time_spent_minutes": 18
}
```

**Response (200):**
```json
{
  "lesson_completed": true,
  "xp_earned": 20,
  "new_achievements": [
    {
      "id": 5,
      "title_en": "First Lesson Complete!",
      "badge_icon": "🎓"
    }
  ],
  "next_lesson": {
    "id": 2,
    "title_en": "Basic Greetings and Introductions"
  }
}
```

---

## Vocabulary

### Get Vocabulary Words
```http
GET /vocabulary?level={level}&search={query}&part_of_speech={pos}
```

**Query Parameters:**
- `level` (optional): Filter by CEFR level
- `search` (optional): Search in Polish/English/Russian
- `part_of_speech` (optional): noun, verb, adjective, adverb, etc.
- `page` (optional): Page number
- `limit` (optional): Results per page (default: 20)

**Response (200):**
```json
{
  "vocabulary": [
    {
      "id": 1,
      "polish_word": "cześć",
      "translation_en": "hi, hello",
      "translation_ru": "привет",
      "part_of_speech": "interjection",
      "gender": null,
      "level": "A1",
      "frequency_rank": 1,
      "pronunciation_ipa": "t͡ʂɛɕt͡ɕ",
      "example_sentence_pl": "Cześć! Jak się masz?",
      "example_sentence_en": "Hi! How are you?",
      "example_sentence_ru": "Привет! Как дела?",
      "user_progress": {
        "learning_status": "learning",
        "repetition_count": 3,
        "next_review_date": "2025-11-22T10:00:00Z",
        "ease_factor": 2.5
      }
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 85,
    "total_count": 1700
  }
}
```

### Get Vocabulary by ID
```http
GET /vocabulary/:id
```

**Response (200):**
```json
{
  "id": 426,
  "polish_word": "robić",
  "translation_en": "to do/make (imperfective)",
  "translation_ru": "делать (несов.)",
  "part_of_speech": "verb",
  "gender": null,
  "level": "B1",
  "frequency_rank": 426,
  "pronunciation_ipa": "rɔbʲit͡ɕ",
  "example_sentence_pl": "Co robisz w weekend?",
  "example_sentence_en": "What are you doing this weekend?",
  "example_sentence_ru": "Что ты делаешь на выходных?",
  "aspect_pair": {
    "id": 427,
    "polish_word": "zrobić",
    "aspect": "perfective"
  },
  "related_words": [
    {
      "id": 500,
      "polish_word": "praca",
      "relation": "related"
    }
  ],
  "user_progress": {
    "learning_status": "mastered",
    "repetition_count": 12,
    "last_reviewed": "2025-11-20T15:00:00Z",
    "next_review_date": "2025-12-05T10:00:00Z",
    "ease_factor": 2.8
  }
}
```

### Start Vocabulary Practice
```http
POST /vocabulary/practice/start
```

**Request Body:**
```json
{
  "level": "A2",
  "count": 20,
  "practice_type": "flashcard"
}
```

**Response (200):**
```json
{
  "session_id": "abc123",
  "words": [
    {
      "id": 50,
      "polish_word": "dom",
      "translation_en": "house, home"
    }
  ],
  "total_words": 20
}
```

### Submit Vocabulary Answer
```http
POST /vocabulary/practice/answer
```

**Request Body:**
```json
{
  "session_id": "abc123",
  "word_id": 50,
  "quality": 4,
  "time_spent_seconds": 8
}
```

**Quality scale (SM-2 algorithm):**
- 0: Complete blackout
- 1: Incorrect, but recognized
- 2: Incorrect, but easy to recall
- 3: Correct, but difficult
- 4: Correct, with hesitation
- 5: Perfect recall

**Response (200):**
```json
{
  "correct": true,
  "next_review_date": "2025-11-24T10:00:00Z",
  "new_ease_factor": 2.6,
  "interval_days": 3,
  "remaining_words": 19
}
```

### Get Due Vocabulary
```http
GET /vocabulary/due
```

**Response (200):**
```json
{
  "due_count": 15,
  "due_words": [
    {
      "id": 25,
      "polish_word": "książka",
      "last_reviewed": "2025-11-18T10:00:00Z",
      "ease_factor": 2.3
    }
  ]
}
```

---

## Exercises

### Get Exercise Types
```http
GET /exercises/types
```

**Response (200):**
```json
{
  "types": [
    {
      "type": "multiple_choice",
      "display_name": "Multiple Choice",
      "description": "Choose the correct answer from options"
    },
    {
      "type": "fill_blank",
      "display_name": "Fill in the Blank",
      "description": "Complete sentences with correct words"
    },
    {
      "type": "translation",
      "display_name": "Translation",
      "description": "Translate sentences between languages"
    },
    {
      "type": "listening",
      "display_name": "Listening Comprehension",
      "description": "Listen and answer questions"
    },
    {
      "type": "speaking",
      "display_name": "Speaking Practice",
      "description": "Record yourself speaking Polish"
    },
    {
      "type": "reading",
      "display_name": "Reading Comprehension",
      "description": "Read and answer questions"
    }
  ]
}
```

### Generate Practice Exercises
```http
POST /exercises/generate
```

**Request Body:**
```json
{
  "level": "A2",
  "type": "multiple_choice",
  "count": 10,
  "topic": "verbs"
}
```

**Response (200):**
```json
{
  "session_id": "ex789",
  "exercises": [
    {
      "id": 1001,
      "type": "multiple_choice",
      "question_pl": "Wczoraj _____ do kina.",
      "question_en": "Yesterday I _____ to the cinema.",
      "options": [
        {"id": "a", "text": "idę"},
        {"id": "b", "text": "pójdę"},
        {"id": "c", "text": "poszedłem"},
        {"id": "d", "text": "chodzę"}
      ],
      "difficulty": "medium"
    }
  ]
}
```

### Submit Exercise Answer
```http
POST /exercises/:id/submit
```

**Request Body:**
```json
{
  "answer": "c",
  "time_spent_seconds": 25
}
```

**Response (200):**
```json
{
  "correct": true,
  "explanation_en": "Correct! 'Poszedłem' is the past tense perfective form.",
  "explanation_ru": "Правильно! 'Poszedłem' - это прошедшее время совершенного вида.",
  "points_earned": 3,
  "xp_earned": 5
}
```

---

## Exam Preparation

### Get Available Mock Exams
```http
GET /exams
```

**Query Parameters:**
- `level` (optional): Filter by CEFR level
- `exam_type` (optional): full or practice

**Response (200):**
```json
{
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
        },
        {
          "section_type": "listening",
          "title_en": "Listening Comprehension",
          "time_limit_minutes": 20,
          "max_points": 20,
          "question_count": 7
        },
        {
          "section_type": "writing",
          "title_en": "Writing",
          "time_limit_minutes": 25,
          "max_points": 25,
          "question_count": 3
        },
        {
          "section_type": "speaking",
          "title_en": "Speaking",
          "time_limit_minutes": 20,
          "max_points": 25,
          "question_count": 5
        }
      ],
      "user_attempts": [
        {
          "attempt_id": 10,
          "status": "completed",
          "percentage_score": 78,
          "completed_at": "2025-11-15T16:00:00Z"
        }
      ]
    }
  ]
}
```

### Get Exam Details
```http
GET /exams/:id
```

**Response (200):**
```json
{
  "id": 1,
  "title_en": "A1 Polish Language Certification Mock Exam",
  "description_en": "Full-length simulation of official A1 exam...",
  "level": "A1",
  "total_time_minutes": 90,
  "passing_score_percentage": 60,
  "instructions_en": "This exam consists of four sections...",
  "instructions_ru": "Этот экзамен состоит из четырёх разделов...",
  "sections": [
    {
      "id": 1,
      "section_type": "reading",
      "section_number": 1,
      "title_en": "Reading Comprehension",
      "instructions_en": "Read the texts and answer the questions...",
      "time_limit_minutes": 25,
      "max_points": 30,
      "questions": [
        {
          "id": 101,
          "question_number": 1,
          "question_type": "multiple_choice",
          "points": 3
        }
      ]
    }
  ]
}
```

### Start Exam Attempt
```http
POST /exams/:id/start
```

**Response (200):**
```json
{
  "attempt_id": 25,
  "exam_id": 1,
  "status": "in_progress",
  "started_at": "2025-11-21T10:00:00Z",
  "expires_at": "2025-11-21T11:30:00Z",
  "current_section": {
    "id": 1,
    "section_type": "reading",
    "time_limit_minutes": 25,
    "questions": [...]
  }
}
```

### Submit Section Answers
```http
POST /exams/attempts/:attemptId/sections/:sectionId/submit
```

**Request Body:**
```json
{
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
}
```

**Response (200):**
```json
{
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
    "section_type": "listening"
  }
}
```

### Complete Exam
```http
POST /exams/attempts/:attemptId/complete
```

**Response (200):**
```json
{
  "attempt_id": 25,
  "status": "completed",
  "completed_at": "2025-11-21T11:25:00Z",
  "time_spent_minutes": 85,
  "total_points_earned": 72,
  "total_points_possible": 100,
  "percentage_score": 72,
  "passed": true,
  "section_scores": {
    "reading": {"earned": 24, "possible": 30, "percentage": 80},
    "listening": {"earned": 16, "possible": 20, "percentage": 80},
    "writing": {"earned": 18, "possible": 25, "percentage": 72},
    "speaking": {"earned": 14, "possible": 25, "percentage": 56}
  },
  "strengths": ["reading", "listening"],
  "weaknesses": ["speaking"],
  "recommendations": "Focus on speaking practice. Try daily conversation exercises."
}
```

### Get Exam Results
```http
GET /exams/attempts/:attemptId/results
```

**Response (200):**
```json
{
  "attempt_id": 25,
  "exam": {
    "id": 1,
    "title_en": "A1 Polish Language Certification Mock Exam",
    "level": "A1"
  },
  "status": "completed",
  "completed_at": "2025-11-21T11:25:00Z",
  "percentage_score": 72,
  "passed": true,
  "detailed_results": {
    "sections": [
      {
        "section_type": "reading",
        "questions": [
          {
            "question_id": 101,
            "user_answer": {"selectedOptionId": "a"},
            "is_correct": true,
            "points_earned": 3,
            "feedback_en": "Excellent work!"
          }
        ]
      }
    ]
  },
  "analytics": {
    "strengths": ["reading", "listening"],
    "weaknesses": ["speaking"],
    "question_type_performance": {
      "multiple_choice": 85,
      "fill_blank": 70,
      "essay": 60
    }
  }
}
```

### Get Study Resources
```http
GET /exams/study-resources?level={level}&section={section}
```

**Response (200):**
```json
{
  "resources": [
    {
      "id": 1,
      "level": "A1",
      "section_type": "speaking",
      "resource_type": "strategy",
      "title_en": "How to Prepare for the Speaking Section",
      "content_en": "1. Practice daily conversations...",
      "examples": [
        {
          "situation": "Introducing yourself",
          "sample_response": "Nazywam się Anna. Mam 25 lat..."
        }
      ]
    }
  ]
}
```

---

## User Progress

### Get User Dashboard
```http
GET /users/me/dashboard
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "username": "learner123",
    "current_level": "A2",
    "xp_points": 1250,
    "streak_days": 12,
    "joined_date": "2025-10-01T00:00:00Z"
  },
  "learning_stats": {
    "total_lessons_completed": 18,
    "total_lessons_available": 30,
    "vocabulary_mastered": 425,
    "vocabulary_learning": 150,
    "total_study_time_minutes": 1820,
    "average_score": 82,
    "level_progress": {
      "A1": "completed",
      "A2": "in_progress",
      "B1": "locked"
    }
  },
  "recent_activity": [
    {
      "type": "lesson_completed",
      "lesson_id": 12,
      "lesson_title": "Instrumental Case",
      "score": 85,
      "timestamp": "2025-11-20T15:30:00Z"
    },
    {
      "type": "vocabulary_practiced",
      "words_reviewed": 20,
      "timestamp": "2025-11-20T10:00:00Z"
    }
  ],
  "upcoming_reviews": {
    "vocabulary_due_today": 25,
    "next_lesson": {
      "id": 13,
      "title_en": "Comparatives and Superlatives"
    }
  },
  "achievements": [
    {
      "id": 1,
      "title_en": "First Steps",
      "badge_icon": "🎯",
      "earned_at": "2025-10-05T12:00:00Z"
    }
  ]
}
```

### Get User Statistics
```http
GET /users/me/stats
```

**Response (200):**
```json
{
  "overall": {
    "total_xp": 1250,
    "current_level": "A2",
    "lessons_completed": 18,
    "vocabulary_known": 575,
    "study_streak": 12,
    "total_study_hours": 30.5
  },
  "by_level": {
    "A1": {
      "lessons_completed": 15,
      "avg_score": 85,
      "time_spent_minutes": 450,
      "status": "completed"
    },
    "A2": {
      "lessons_completed": 3,
      "avg_score": 78,
      "time_spent_minutes": 180,
      "status": "in_progress"
    }
  },
  "weekly_activity": [
    {"date": "2025-11-15", "xp_earned": 80, "minutes_studied": 45},
    {"date": "2025-11-16", "xp_earned": 120, "minutes_studied": 60}
  ],
  "vocabulary_progress": {
    "total_words": 1700,
    "mastered": 425,
    "learning": 150,
    "new": 1125,
    "review_accuracy": 84
  }
}
```

### Update User Progress
```http
PATCH /users/me/progress
```

**Request Body:**
```json
{
  "current_level": "B1",
  "daily_goal_minutes": 30
}
```

**Response (200):**
```json
{
  "updated": true,
  "current_level": "B1",
  "daily_goal_minutes": 30
}
```

### Get Learning Streak
```http
GET /users/me/streak
```

**Response (200):**
```json
{
  "current_streak": 12,
  "longest_streak": 45,
  "last_activity_date": "2025-11-21",
  "streak_history": [
    {"date": "2025-11-21", "activity_completed": true},
    {"date": "2025-11-20", "activity_completed": true}
  ],
  "milestone_rewards": [
    {"streak_days": 7, "xp_reward": 50, "unlocked": true},
    {"streak_days": 30, "xp_reward": 200, "unlocked": false}
  ]
}
```

---

## Achievements

### Get All Achievements
```http
GET /achievements
```

**Response (200):**
```json
{
  "achievements": [
    {
      "id": 1,
      "title_en": "First Steps",
      "title_ru": "Первые шаги",
      "description_en": "Complete your first lesson",
      "description_ru": "Завершите первый урок",
      "badge_icon": "🎯",
      "category": "lessons",
      "xp_reward": 10,
      "requirement": "Complete 1 lesson",
      "earned": true,
      "earned_at": "2025-10-05T12:00:00Z"
    },
    {
      "id": 5,
      "title_en": "Vocabulary Master",
      "title_ru": "Мастер словарного запаса",
      "description_en": "Master 500 vocabulary words",
      "description_ru": "Освойте 500 словарных слов",
      "badge_icon": "📚",
      "category": "vocabulary",
      "xp_reward": 100,
      "requirement": "Master 500 words",
      "earned": false,
      "progress": {
        "current": 425,
        "required": 500,
        "percentage": 85
      }
    }
  ],
  "summary": {
    "total_achievements": 50,
    "earned": 12,
    "in_progress": 8,
    "locked": 30
  }
}
```

### Get User Achievements
```http
GET /users/me/achievements
```

**Response (200):**
```json
{
  "earned_achievements": [
    {
      "id": 1,
      "title_en": "First Steps",
      "earned_at": "2025-10-05T12:00:00Z"
    }
  ],
  "recent_unlocks": [
    {
      "id": 10,
      "title_en": "Week Warrior",
      "earned_at": "2025-11-20T08:00:00Z"
    }
  ],
  "next_milestones": [
    {
      "id": 5,
      "title_en": "Vocabulary Master",
      "progress_percentage": 85
    }
  ]
}
```

---

## Study Resources

### Get Grammar Reference
```http
GET /resources/grammar?level={level}&topic={topic}
```

**Response (200):**
```json
{
  "sections": [
    {
      "level": "A1",
      "topic": "cases",
      "title_en": "Introduction to Polish Cases",
      "content_en": "Polish has 7 cases...",
      "examples": [
        {
          "polish": "To jest książka.",
          "english": "This is a book.",
          "explanation": "Nominative case - subject"
        }
      ]
    }
  ]
}
```

### Search Resources
```http
GET /resources/search?q={query}
```

**Response (200):**
```json
{
  "results": [
    {
      "type": "grammar_topic",
      "title": "Accusative Case",
      "content_preview": "The accusative case is used for direct objects...",
      "url": "/resources/grammar/accusative"
    },
    {
      "type": "lesson",
      "title": "Using Accusative in Practice",
      "lesson_id": 8
    }
  ]
}
```

---

## Error Responses

All endpoints return consistent error responses:

### 400 Bad Request
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### 401 Unauthorized
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

### 403 Forbidden
```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}
```

### 404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

---

## Rate Limiting

- **Anonymous requests**: 100 requests per hour
- **Authenticated requests**: 1000 requests per hour
- **Study session requests**: 5000 requests per hour

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1637512800
```

---

## Pagination

All list endpoints support pagination with these parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

Response includes pagination metadata:
```json
{
  "pagination": {
    "current_page": 1,
    "total_pages": 10,
    "total_count": 200,
    "per_page": 20,
    "has_next": true,
    "has_previous": false
  }
}
```

---

## Versioning

The API uses URL versioning. Current version: `v1`

When breaking changes are introduced, a new version will be released (e.g., `v2`).

---

## Changelog

### Version 1.0.0 (2025-11-21)
- Initial API documentation
- Lessons, vocabulary, exercises endpoints
- Mock exam preparation system
- User progress tracking
- Achievement system
- Study resources

---

## Support

For API support, contact: api-support@bubrolinguo.com

Documentation updates: https://docs.bubrolinguo.com/api

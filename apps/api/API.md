# Bubrolinguo API Documentation

**Version:** 0.1.0
**Base URL:** `http://localhost:3001` (development) or your deployed API URL

---

## Table of Contents

1. [Authentication](#authentication)
2. [Response Format](#response-format)
3. [Error Handling](#error-handling)
4. [Rate Limiting](#rate-limiting)
5. [Endpoints](#endpoints)
   - [Health Check](#health-check)
   - [Authentication](#authentication-endpoints)
   - [Users](#users)
   - [Lessons](#lessons)
   - [Vocabulary](#vocabulary)
   - [Progress](#progress)

---

## Authentication

The API uses JWT (JSON Web Token) authentication.

### Getting a Token

Register or login to receive an authentication token:

```bash
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Using the Token

Include the token in the `Authorization` header:

```
Authorization: Bearer <your_token_here>
```

### Token Expiration

- **Access Token:** Expires in 1 hour
- **Refresh Token:** Expires in 7 days

Use the refresh token endpoint to get a new access token.

---

## Response Format

All API responses follow this structure:

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Optional success message"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

### Common Error Codes

- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_ERROR` - Authentication failed
- `NOT_FOUND` - Resource not found
- `ALREADY_EXISTS` - Resource already exists
- `INTERNAL_ERROR` - Server error

---

## Rate Limiting

- **Window:** 15 minutes
- **Max Requests:** 100 requests per window per IP

When rate limited, you'll receive a `429` status code.

---

## Endpoints

### Health Check

#### `GET /`

Check if the API is running.

**Authentication:** Not required

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Bubrolinguo API is running",
    "version": "0.1.0",
    "timestamp": "2025-11-21T10:00:00.000Z"
  }
}
```

---

### Authentication Endpoints

#### `POST /api/v1/auth/register`

Register a new user.

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "displayName": "John Doe",
  "interfaceLanguage": "en"
}
```

**Validation:**
- `email`: Valid email format, unique
- `password`: Min 8 characters, must include uppercase, lowercase, and number
- `displayName`: 2-50 characters
- `interfaceLanguage`: `"en"` or `"ru"`

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "displayName": "John Doe",
      "interfaceLanguage": "en",
      "createdAt": "2025-11-21T10:00:00.000Z"
    },
    "token": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

#### `POST /api/v1/auth/login`

Login with existing credentials.

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "displayName": "John Doe",
      "interfaceLanguage": "en"
    },
    "token": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

#### `POST /api/v1/auth/refresh`

Refresh access token using refresh token.

**Authentication:** Not required

**Request Body:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

#### `POST /api/v1/auth/logout`

Logout (invalidate refresh token).

**Authentication:** Required

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Users

#### `GET /api/v1/users/me`

Get current user profile.

**Authentication:** Required

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "displayName": "John Doe",
      "interfaceLanguage": "en",
      "streak": 5,
      "totalXp": 250,
      "lessonsCompleted": 3,
      "createdAt": "2025-11-21T10:00:00.000Z"
    }
  }
}
```

#### `PUT /api/v1/users/me`

Update current user profile.

**Authentication:** Required

**Request Body:**
```json
{
  "displayName": "Jane Doe",
  "interfaceLanguage": "ru"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "displayName": "Jane Doe",
      "interfaceLanguage": "ru",
      "updatedAt": "2025-11-21T11:00:00.000Z"
    }
  }
}
```

---

### Lessons

#### `GET /api/v1/lessons`

Get all lessons. Includes progress if authenticated.

**Authentication:** Optional

**Query Parameters:**
- `level` (optional): Filter by CEFR level (`A1`, `A2`, `B1`, etc.)
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "lessons": [
      {
        "id": "uuid",
        "lessonNumber": 1,
        "title": {
          "en": "Introduction to Polish",
          "ru": "Введение в польский"
        },
        "description": {
          "en": "Learn basic Polish greetings",
          "ru": "Изучите базовые польские приветствия"
        },
        "level": "A1",
        "estimatedMinutes": 15,
        "xpReward": 20,
        "isPublished": true,
        "progress": {
          "completed": false,
          "score": 0,
          "completedAt": null
        }
      }
    ],
    "total": 15,
    "limit": 50,
    "offset": 0
  }
}
```

#### `GET /api/v1/lessons/:id`

Get a specific lesson with exercises.

**Authentication:** Optional (progress included if authenticated)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "lesson": {
      "id": "uuid",
      "lessonNumber": 1,
      "title": {
        "en": "Introduction to Polish",
        "ru": "Введение в польский"
      },
      "description": {
        "en": "Learn basic Polish greetings",
        "ru": "Изучите базовые польские приветствия"
      },
      "level": "A1",
      "estimatedMinutes": 15,
      "xpReward": 20,
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple_choice",
          "question": {
            "en": "How do you say 'Hello' in Polish?",
            "ru": "Как сказать 'Привет' по-польски?"
          },
          "options": [
            {
              "id": "a",
              "text": "Cześć",
              "isCorrect": true
            },
            {
              "id": "b",
              "text": "Do widzenia",
              "isCorrect": false
            }
          ],
          "explanation": {
            "en": "Cześć is an informal greeting",
            "ru": "Cześć - неформальное приветствие"
          }
        }
      ],
      "progress": {
        "completed": false,
        "score": 0
      }
    }
  }
}
```

#### `POST /api/v1/lessons/:id/complete`

Mark a lesson as completed and record score.

**Authentication:** Required

**Request Body:**
```json
{
  "score": 85,
  "timeSpent": 900
}
```

**Validation:**
- `score`: 0-100
- `timeSpent`: Seconds (integer)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "progress": {
      "lessonId": "uuid",
      "completed": true,
      "score": 85,
      "timeSpent": 900,
      "xpEarned": 20,
      "completedAt": "2025-11-21T12:00:00.000Z"
    },
    "achievements": [
      {
        "id": "uuid",
        "name": "First Lesson",
        "description": "Complete your first lesson"
      }
    ]
  }
}
```

---

### Vocabulary

#### `GET /api/v1/vocabulary`

Get vocabulary words with optional filtering.

**Authentication:** Optional (progress included if authenticated)

**Query Parameters:**
- `level` (optional): Filter by CEFR level
- `partOfSpeech` (optional): `noun`, `verb`, `adjective`, etc.
- `search` (optional): Search in Polish or English
- `limit` (optional): Default 50
- `offset` (optional): Default 0

**Response (200):**
```json
{
  "success": true,
  "data": {
    "vocabulary": [
      {
        "id": "uuid",
        "polishWord": "cześć",
        "translation": {
          "en": "hello/hi",
          "ru": "привет"
        },
        "partOfSpeech": "interjection",
        "level": "A1",
        "pronunciationIpa": "t͡ʂɛɕt͡ɕ",
        "exampleSentence": {
          "pl": "Cześć! Jak się masz?",
          "en": "Hi! How are you?",
          "ru": "Привет! Как дела?"
        },
        "progress": {
          "mastery": 0.75,
          "nextReview": "2025-11-22T10:00:00.000Z"
        }
      }
    ],
    "total": 425
  }
}
```

#### `GET /api/v1/vocabulary/review`

Get vocabulary items due for review (spaced repetition).

**Authentication:** Required

**Query Parameters:**
- `limit` (optional): Default 20

**Response (200):**
```json
{
  "success": true,
  "data": {
    "reviewQueue": [
      {
        "id": "uuid",
        "polishWord": "cześć",
        "translation": {
          "en": "hello/hi",
          "ru": "привет"
        },
        "pronunciationIpa": "t͡ʂɛɕt͡ɕ",
        "dueDate": "2025-11-21T10:00:00.000Z",
        "reviewCount": 3
      }
    ],
    "total": 15
  }
}
```

#### `POST /api/v1/vocabulary/:id/review`

Submit vocabulary review result (spaced repetition).

**Authentication:** Required

**Request Body:**
```json
{
  "correct": true,
  "timeSpent": 5
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "vocabulary": {
      "id": "uuid",
      "nextReview": "2025-11-23T10:00:00.000Z",
      "mastery": 0.8,
      "reviewCount": 4
    }
  }
}
```

#### `GET /api/v1/vocabulary/stats`

Get vocabulary statistics for current user.

**Authentication:** Required

**Response (200):**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalWords": 425,
      "learnedWords": 120,
      "masteredWords": 45,
      "reviewDueToday": 15,
      "newWordsToday": 10,
      "streak": 7
    }
  }
}
```

---

### Progress

#### `GET /api/v1/progress/dashboard`

Get comprehensive dashboard data for current user.

**Authentication:** Required

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "displayName": "John Doe",
      "streak": 5,
      "totalXp": 250,
      "level": 3
    },
    "stats": {
      "lessonsCompleted": 3,
      "totalLessons": 15,
      "vocabularyLearned": 120,
      "totalVocabulary": 425,
      "achievementsUnlocked": 5,
      "totalAchievements": 58
    },
    "recentActivity": [
      {
        "type": "lesson_completed",
        "lessonId": "uuid",
        "timestamp": "2025-11-21T10:00:00.000Z",
        "xpEarned": 20
      }
    ],
    "upcomingReviews": 15
  }
}
```

#### `GET /api/v1/progress/achievements`

Get all achievements with user progress.

**Authentication:** Required

**Response (200):**
```json
{
  "success": true,
  "data": {
    "achievements": [
      {
        "id": "uuid",
        "name": "First Lesson",
        "description": "Complete your first lesson",
        "icon": "🎓",
        "category": "lessons",
        "xpReward": 10,
        "unlocked": true,
        "unlockedAt": "2025-11-21T10:00:00.000Z"
      }
    ],
    "unlockedCount": 5,
    "totalCount": 58
  }
}
```

#### `GET /api/v1/progress/leaderboard`

Get leaderboard rankings.

**Authentication:** Optional

**Query Parameters:**
- `timeframe` (optional): `weekly`, `monthly`, `alltime` (default: `alltime`)
- `limit` (optional): Default 10

**Response (200):**
```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "userId": "uuid",
        "displayName": "John Doe",
        "totalXp": 1250,
        "level": 12,
        "streak": 45
      }
    ],
    "userRank": {
      "rank": 15,
      "totalXp": 250
    }
  }
}
```

---

## Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:3001/

# Register
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234!",
    "displayName": "Test User",
    "interfaceLanguage": "en"
  }'

# Get lessons (authenticated)
curl http://localhost:3001/api/v1/lessons \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using the Test Script

Run the comprehensive API test suite:

```bash
cd apps/api
npm run test:api
```

This will test all endpoints automatically.

---

## Development

### Running Locally

```bash
# Start API server
cd apps/api
npm run dev

# The API will be available at http://localhost:3001
```

### Environment Variables

See `.env.example` for required environment variables.

---

## Support

For API issues or questions:
- Check logs for error details
- Review this documentation
- Run `npm run db:check` to verify database
- Run `npm run test:api` to test endpoints

---

**Last Updated:** 2025-11-21
**API Version:** 0.1.0

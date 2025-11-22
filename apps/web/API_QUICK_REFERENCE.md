# API Quick Reference

Quick reference guide for Bubrolinguo API endpoints.

## Base URL

- **Development:** `http://localhost:3001`
- **Production:** `https://api.bubrolinguo.com` (TBD)

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

### Auth Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login user | No |
| POST | `/api/v1/auth/refresh` | Refresh access token | No |
| POST | `/api/v1/auth/logout` | Logout user | Yes |
| POST | `/api/v1/auth/verify-email` | Verify email address | No |
| POST | `/api/v1/auth/forgot-password` | Request password reset | No |
| POST | `/api/v1/auth/reset-password` | Reset password | No |

## API Endpoints

### Lessons

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/lessons` | Get all lessons |
| GET | `/api/v1/lessons/:id` | Get lesson by ID |
| POST | `/api/v1/lessons/:id/complete` | Submit lesson completion |
| GET | `/api/v1/lessons/:id/progress` | Get lesson progress |
| GET | `/api/v1/lessons/stats` | Get lesson statistics |

### Vocabulary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/vocabulary` | Get all vocabulary words |
| GET | `/api/v1/vocabulary/:id` | Get vocabulary word by ID |
| GET | `/api/v1/vocabulary/review` | Get words due for review |
| POST | `/api/v1/vocabulary/:id/review` | Submit review result |
| GET | `/api/v1/vocabulary/stats` | Get vocabulary statistics |

### Progress & Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/progress/dashboard` | Get dashboard data |
| GET | `/api/v1/progress/achievements` | Get all achievements |
| GET | `/api/v1/progress/leaderboard` | Get leaderboard |
| GET | `/api/v1/progress/streak` | Get streak information |

### User

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users/me` | Get current user profile |
| PUT | `/api/v1/users/me` | Update user profile |
| PUT | `/api/v1/users/me/settings` | Update user settings |
| GET | `/api/v1/users/me/stats` | Get user statistics |
| DELETE | `/api/v1/users/me` | Delete user account |

### Exam Preparation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/exams` | Get all exams |
| GET | `/api/v1/exams/:level` | Get exams by level |
| GET | `/api/v1/exams/:id` | Get exam by ID |
| POST | `/api/v1/exams/:id/start` | Start exam attempt |
| POST | `/api/v1/exams/:id/submit` | Submit exam answers |
| GET | `/api/v1/exams/attempts` | Get exam attempts |
| GET | `/api/v1/exams/resources` | Get study resources |

## Request Examples

### Register User

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "displayName": "John Doe",
    "interfaceLanguage": "en"
  }'
```

### Login

```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }'
```

### Get Lessons (Authenticated)

```bash
curl -X GET http://localhost:3001/api/v1/lessons \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Submit Lesson Completion

```bash
curl -X POST http://localhost:3001/api/v1/lessons/lesson-1-greetings/complete \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "score": 85,
    "timeSpent": 180
  }'
```

### Get Vocabulary Review Queue

```bash
curl -X GET http://localhost:3001/api/v1/vocabulary/review?limit=10 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Submit Vocabulary Review

```bash
curl -X POST http://localhost:3001/api/v1/vocabulary/vocab-1/review \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "correct": true,
    "timeSpent": 5
  }'
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {} // Optional additional details
  }
}
```

## Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `UNAUTHORIZED` | 401 | Missing or invalid authentication token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## Rate Limiting

- **Default:** 100 requests per 15 minutes
- **Authentication:** 5 attempts per 15 minutes
- **Headers:**
  - `X-RateLimit-Limit`: Maximum requests
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time until reset (Unix timestamp)

## Pagination

For endpoints that return lists, use query parameters:

```
?limit=20&offset=0
```

- `limit`: Number of items per page (default: 20, max: 100)
- `offset`: Number of items to skip (default: 0)

Response includes:

```json
{
  "data": [...],
  "total": 150,
  "limit": 20,
  "offset": 0
}
```

## Filtering

Lessons endpoint supports filtering:

```
GET /api/v1/lessons?level=A1&status=completed
```

Vocabulary endpoint supports filtering:

```
GET /api/v1/vocabulary?level=A1&partOfSpeech=noun&search=hello
```

## WebSocket Events

Coming soon - real-time features for:
- Live leaderboard updates
- Achievement notifications
- Study session reminders

## Full Documentation

For complete API documentation including all parameters, response schemas, and examples, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## Development Tools

- **API Testing:** Use Postman or Insomnia
- **API Client:** Generated TypeScript SDK available
- **GraphQL Playground:** Coming in Phase 4

---

**Need Help?** Check the full API documentation or contact the development team.

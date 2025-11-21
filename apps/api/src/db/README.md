# Bubrolinguo Database

This directory contains all database-related files for the Bubrolinguo API.

## 📁 Structure

```
db/
├── README.md          # This file
├── schema.sql         # Complete database schema (PostgreSQL)
├── connection.ts      # Database connection pool and query utilities
├── migrate.ts         # Migration runner script
└── seed.ts           # Seed data script
```

## 🚀 Quick Start

### Prerequisites

1. **PostgreSQL 14+** installed and running
2. Create a database:
   ```bash
   createdb bubrolinguo
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=bubrolinguo
   DB_USER=postgres
   DB_PASSWORD=your-password
   ```

### Run Migrations

```bash
# From apps/api directory
npm run db:migrate
```

This will create all tables, indexes, and functions defined in `schema.sql`.

### Seed Database

```bash
npm run db:seed
```

This will populate the database with:
- 6 characters (Bubr, Zofia, Ania, Jakub, Kasia, Piotr)
- 10 achievements
- 10 sample vocabulary words
- 1 sample lesson

### Reset Database

⚠️ **Warning: This will delete all data!**

```bash
npm run db:migrate:reset
```

## 📊 Database Schema

### Core Tables

#### `users`
Stores user accounts and progress.

**Key Fields:**
- `id` (UUID) - Primary key
- `email` - Unique email address
- `password_hash` - Bcrypt hashed password
- `display_name` - User's display name
- `interface_language` - 'en' or 'ru'
- `current_level` - A1, A2, B1, B2, or C1
- `total_xp` - Total experience points
- `streak_count` - Current streak in days
- `subscription_tier` - 'free', 'premium', or 'premium_plus'

#### `lessons`
Structured Polish lessons.

**Key Fields:**
- `id` (UUID) - Primary key
- `lesson_number` - Unique lesson number (1, 2, 3...)
- `level` - A1, A2, B1, B2, or C1
- `unit_number` - Unit grouping
- `title_en/title_ru` - Lesson titles
- `exercises` (JSONB) - Array of exercise objects
- `xp_reward` - XP earned for completion

#### `vocabulary`
10,000 Polish words with translations and learning aids.

**Key Fields:**
- `id` (UUID) - Primary key
- `polish_word` - Polish word
- `translation_en/translation_ru` - Translations
- `part_of_speech` - noun, verb, adjective, etc.
- `level` - CEFR level
- `frequency_rank` - 1-10000 based on corpus
- `pronunciation_ipa` - IPA pronunciation
- `example_sentence_pl/en/ru` - Example sentences
- `audio_url` - TTS audio URL
- `image_url` - Visual aid image

#### `user_progress`
Tracks user completion of lessons.

**Key Fields:**
- `user_id` + `lesson_id` - Foreign keys
- `status` - 'not_started', 'in_progress', 'completed'
- `score` - 0-100 performance score
- `xp_earned` - XP earned
- `mistakes_count` - Number of mistakes
- `exercise_results` (JSONB) - Detailed results per exercise

#### `user_vocabulary`
Spaced repetition tracking (SM-2 algorithm).

**Key Fields:**
- `user_id` + `vocabulary_id` - Foreign keys
- `proficiency_level` - 0-5 learning stage
- `easiness_factor` - SM-2 EF value (default 2.5)
- `interval_days` - Days until next review
- `next_review_date` - When word should be reviewed
- `times_reviewed` - Total review count
- `status` - 'new', 'learning', 'mastered', 'relearning'

### Supporting Tables

- `achievements` - Achievement definitions
- `user_achievements` - Unlocked achievements per user
- `characters` - Learning characters (Bubr, Zofia, etc.)
- `user_characters` - Unlocked characters per user
- `daily_activity` - Daily metrics for streak tracking
- `ai_conversations` - AI conversation practice sessions
- `refresh_tokens` - JWT refresh token storage

## 🔧 Connection Utilities

The `connection.ts` file provides several utilities:

### Basic Query

```typescript
import { query } from './db/connection';

const result = await query<User>(
  'SELECT * FROM users WHERE email = $1',
  ['user@example.com']
);
```

### Transactions

```typescript
import { transaction } from './db/connection';

await transaction(async (client) => {
  await client.query('UPDATE users SET xp = xp + $1 WHERE id = $2', [10, userId]);
  await client.query('INSERT INTO daily_activity ...');
  // Both queries succeed or both rollback
});
```

### Helper Functions

```typescript
import { exists, buildWhereClause, buildPaginationClause } from './db/connection';

// Check if record exists
const userExists = await exists('users', { email: 'test@example.com' });

// Build WHERE clause
const { whereClause, values } = buildWhereClause({ level: 'A1', is_published: true });
// Returns: "WHERE level = $1 AND is_published = $2"

// Build pagination
const { limitClause } = buildPaginationClause({ page: 2, limit: 20 });
// Returns: "LIMIT 20 OFFSET 20"
```

## 🧪 Testing Connection

```typescript
import { testConnection } from './db/connection';

const isConnected = await testConnection();
console.log(isConnected ? '✓ Connected' : '✗ Connection failed');
```

## 📈 Indexes

The schema includes indexes for optimal query performance:

- User lookups by email
- Lesson filtering by level
- Vocabulary search by word, level, frequency
- Spaced repetition review queue
- Streak and XP leaderboards
- User progress tracking

## 🔐 Security Features

- Password hashing with bcrypt
- JWT refresh token management
- SQL injection prevention via parameterized queries
- Automatic `updated_at` timestamp triggers
- Foreign key constraints with CASCADE deletes

## 🔄 Spaced Repetition (SM-2 Algorithm)

The `user_vocabulary` table implements the SM-2 algorithm for optimal vocabulary retention:

1. **New word**: `proficiency_level = 0`, review immediately
2. **Quality rating**: User rates recall (0-5)
3. **Update easiness factor**: Based on quality (1.3-2.5)
4. **Calculate interval**: Days until next review
5. **Schedule review**: `next_review_date = today + interval`

### Quality Ratings
- 5: Perfect recall
- 4: Correct with hesitation
- 3: Correct with difficulty
- 2: Incorrect but remembered
- 1: Incorrect, vague memory
- 0: Complete blackout

## 📊 Performance Tips

1. **Use indexes**: All common query patterns are indexed
2. **Batch operations**: Use transactions for multiple related queries
3. **Connection pooling**: Pool automatically manages connections (default: 20)
4. **Query optimization**: Use `EXPLAIN ANALYZE` for slow queries
5. **Caching**: Consider Redis for frequently accessed data

## 🚨 Troubleshooting

### Connection refused
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: Ensure PostgreSQL is running: `pg_ctl status` or `brew services list`

### Authentication failed
```
Error: password authentication failed for user "postgres"
```
**Solution**: Check `DB_USER` and `DB_PASSWORD` in `.env`

### Database does not exist
```
Error: database "bubrolinguo" does not exist
```
**Solution**: Create it: `createdb bubrolinguo`

### Migration fails
**Solution**: Reset and try again: `npm run db:migrate:reset`

## 📚 Further Reading

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [SM-2 Algorithm](https://www.supermemo.com/en/archives1990-2015/english/ol/sm2)
- [node-postgres (pg) Guide](https://node-postgres.com/)

---

**Last Updated:** 2025-11-21
**Schema Version:** 1.0.0

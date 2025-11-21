-- Bubrolinguo Database Schema
-- PostgreSQL 14+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- USERS TABLE
-- ============================================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  interface_language VARCHAR(2) NOT NULL DEFAULT 'en' CHECK (interface_language IN ('en', 'ru')),

  -- Progress tracking
  current_level VARCHAR(10) DEFAULT 'A1',
  total_xp INTEGER DEFAULT 0,
  streak_count INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,

  -- Subscription
  subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'premium_plus')),
  subscription_expires_at TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,

  -- Settings
  daily_goal INTEGER DEFAULT 50, -- XP goal
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_streak ON users(streak_count DESC);
CREATE INDEX idx_users_xp ON users(total_xp DESC);

-- ============================================================================
-- LESSONS TABLE
-- ============================================================================
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_number INTEGER UNIQUE NOT NULL,
  level VARCHAR(10) NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1')),
  unit_number INTEGER NOT NULL,
  order_in_unit INTEGER NOT NULL,

  -- Content
  title_en VARCHAR(200) NOT NULL,
  title_ru VARCHAR(200) NOT NULL,
  description_en TEXT,
  description_ru TEXT,

  -- Learning objectives
  target_words TEXT[], -- Array of vocabulary IDs
  grammar_topics TEXT[],

  -- Exercise data (stored as JSONB for flexibility)
  exercises JSONB NOT NULL, -- Array of exercise objects

  -- Metadata
  estimated_duration INTEGER, -- in minutes
  difficulty_rating DECIMAL(2,1), -- 1.0 to 5.0
  xp_reward INTEGER DEFAULT 10,

  -- Status
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lessons_level ON lessons(level);
CREATE INDEX idx_lessons_published ON lessons(is_published);
CREATE INDEX idx_lessons_number ON lessons(lesson_number);

-- ============================================================================
-- VOCABULARY TABLE
-- ============================================================================
CREATE TABLE vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Polish word
  polish_word VARCHAR(200) NOT NULL,
  polish_word_normalized VARCHAR(200), -- lowercase, no diacritics for search

  -- Translations
  translation_en VARCHAR(500) NOT NULL,
  translation_ru VARCHAR(500) NOT NULL,

  -- Linguistic data
  part_of_speech VARCHAR(50) NOT NULL, -- noun, verb, adjective, etc.
  gender VARCHAR(20), -- masculine, feminine, neuter (for nouns)
  aspect VARCHAR(20), -- perfective, imperfective (for verbs)

  -- Level and frequency
  level VARCHAR(10) NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1')),
  frequency_rank INTEGER, -- 1-10000 based on corpus frequency

  -- Learning aids
  pronunciation_ipa VARCHAR(200),
  example_sentence_pl TEXT,
  example_sentence_en TEXT,
  example_sentence_ru TEXT,
  mnemonic_en TEXT,
  mnemonic_ru TEXT,

  -- Media
  image_url VARCHAR(500),
  audio_url VARCHAR(500),
  audio_slow_url VARCHAR(500),

  -- Related words
  related_words UUID[], -- Array of vocabulary IDs

  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_vocabulary_level ON vocabulary(level);
CREATE INDEX idx_vocabulary_frequency ON vocabulary(frequency_rank);
CREATE INDEX idx_vocabulary_pos ON vocabulary(part_of_speech);
CREATE INDEX idx_vocabulary_word ON vocabulary(polish_word);
CREATE INDEX idx_vocabulary_normalized ON vocabulary(polish_word_normalized);

-- ============================================================================
-- USER_PROGRESS TABLE (Lesson completion tracking)
-- ============================================================================
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,

  -- Progress status
  status VARCHAR(20) DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),

  -- Performance metrics
  score INTEGER, -- 0-100
  xp_earned INTEGER DEFAULT 0,
  mistakes_count INTEGER DEFAULT 0,
  time_spent_seconds INTEGER,

  -- Attempt tracking
  attempt_number INTEGER DEFAULT 1,
  first_attempted_at TIMESTAMP,
  last_attempted_at TIMESTAMP,
  completed_at TIMESTAMP,

  -- Detailed results
  exercise_results JSONB, -- Array of {exercise_id, correct, answer, time_spent}

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(user_id, lesson_id, attempt_number)
);

CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_lesson ON user_progress(lesson_id);
CREATE INDEX idx_user_progress_status ON user_progress(user_id, status);

-- ============================================================================
-- USER_VOCABULARY TABLE (Spaced repetition tracking)
-- ============================================================================
CREATE TABLE user_vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vocabulary_id UUID NOT NULL REFERENCES vocabulary(id) ON DELETE CASCADE,

  -- Spaced repetition (SM-2 algorithm)
  proficiency_level INTEGER DEFAULT 0, -- 0 = new, 1-5 = learning stages
  easiness_factor DECIMAL(3,2) DEFAULT 2.5, -- SM-2 EF value
  interval_days INTEGER DEFAULT 0,
  next_review_date DATE DEFAULT CURRENT_DATE,

  -- Learning metrics
  times_reviewed INTEGER DEFAULT 0,
  times_correct INTEGER DEFAULT 0,
  times_incorrect INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,

  -- Status
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'learning', 'mastered', 'relearning')),

  -- History
  first_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_reviewed_at TIMESTAMP,
  mastered_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(user_id, vocabulary_id)
);

CREATE INDEX idx_user_vocab_user ON user_vocabulary(user_id);
CREATE INDEX idx_user_vocab_review ON user_vocabulary(user_id, next_review_date);
CREATE INDEX idx_user_vocab_status ON user_vocabulary(user_id, status);

-- ============================================================================
-- ACHIEVEMENTS TABLE
-- ============================================================================
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Achievement details
  code VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'first_lesson', 'streak_7'
  title_en VARCHAR(200) NOT NULL,
  title_ru VARCHAR(200) NOT NULL,
  description_en TEXT,
  description_ru TEXT,

  -- Visual
  icon_url VARCHAR(500),
  badge_color VARCHAR(7), -- Hex color

  -- Requirements
  requirement_type VARCHAR(50), -- lessons_completed, streak_days, words_mastered, etc.
  requirement_value INTEGER,

  -- Rewards
  xp_reward INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_achievements_code ON achievements(code);

-- ============================================================================
-- USER_ACHIEVEMENTS TABLE
-- ============================================================================
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,

  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);

-- ============================================================================
-- DAILY_ACTIVITY TABLE (For streak tracking and analytics)
-- ============================================================================
CREATE TABLE daily_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_date DATE NOT NULL,

  -- Metrics
  xp_earned INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  words_reviewed INTEGER DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(user_id, activity_date)
);

CREATE INDEX idx_daily_activity_user_date ON daily_activity(user_id, activity_date DESC);

-- ============================================================================
-- AI_CONVERSATIONS TABLE (For AI practice feature)
-- ============================================================================
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Conversation details
  scenario VARCHAR(100), -- cafe, shopping, directions, etc.
  difficulty_level VARCHAR(10),

  -- Conversation data
  messages JSONB, -- Array of {role: 'user'|'assistant', content, timestamp}

  -- Metrics
  turns_count INTEGER DEFAULT 0,
  duration_seconds INTEGER,
  corrections_count INTEGER DEFAULT 0,

  -- Status
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),

  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE INDEX idx_ai_conversations_user ON ai_conversations(user_id);
CREATE INDEX idx_ai_conversations_status ON ai_conversations(user_id, status);

-- ============================================================================
-- CHARACTERS TABLE
-- ============================================================================
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Character details
  name VARCHAR(100) NOT NULL,
  nickname VARCHAR(100),
  description_en TEXT,
  description_ru TEXT,
  personality_en TEXT,
  personality_ru TEXT,

  -- Visual
  avatar_url VARCHAR(500),
  emoji VARCHAR(10),

  -- Voice
  voice_actor VARCHAR(200),
  voice_samples JSONB, -- Array of {text, audio_url}

  -- Unlocking
  unlock_requirement VARCHAR(100), -- 'default', 'reach_a2', 'premium', etc.
  unlock_xp INTEGER DEFAULT 0,

  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_characters_active ON characters(is_active);

-- ============================================================================
-- USER_CHARACTERS TABLE (Character unlocks and preferences)
-- ============================================================================
CREATE TABLE user_characters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,

  is_unlocked BOOLEAN DEFAULT false,
  is_favorite BOOLEAN DEFAULT false,
  unlocked_at TIMESTAMP,

  UNIQUE(user_id, character_id)
);

CREATE INDEX idx_user_characters_user ON user_characters(user_id);

-- ============================================================================
-- REFRESH_TOKENS TABLE (For JWT refresh tokens)
-- ============================================================================
CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  token VARCHAR(500) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,

  -- Security
  is_revoked BOOLEAN DEFAULT false,
  revoked_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vocabulary_updated_at BEFORE UPDATE ON vocabulary
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_vocabulary_updated_at BEFORE UPDATE ON user_vocabulary
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Migration 009: Create Exam Preparation Tables
-- This migration adds comprehensive exam preparation functionality

-- Mock Exams Table - Templates for official Polish language certification exams
CREATE TABLE IF NOT EXISTS mock_exams (
  id SERIAL PRIMARY KEY,
  title_en VARCHAR(255) NOT NULL,
  title_ru VARCHAR(255) NOT NULL,
  description_en TEXT,
  description_ru TEXT,
  level VARCHAR(5) NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  exam_type VARCHAR(50) NOT NULL DEFAULT 'full', -- 'full' or 'practice'
  total_time_minutes INTEGER NOT NULL, -- Total exam duration
  passing_score_percentage INTEGER NOT NULL DEFAULT 60,
  instructions_en TEXT,
  instructions_ru TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_mock_exams_level ON mock_exams(level);
CREATE INDEX idx_mock_exams_published ON mock_exams(is_published);

-- Mock Exam Sections - Reading, Listening, Writing, Speaking
CREATE TABLE IF NOT EXISTS mock_exam_sections (
  id SERIAL PRIMARY KEY,
  mock_exam_id INTEGER REFERENCES mock_exams(id) ON DELETE CASCADE,
  section_type VARCHAR(50) NOT NULL CHECK (section_type IN ('reading', 'listening', 'writing', 'speaking')),
  section_number INTEGER NOT NULL, -- Order of sections (1, 2, 3, 4)
  title_en VARCHAR(255) NOT NULL,
  title_ru VARCHAR(255) NOT NULL,
  instructions_en TEXT,
  instructions_ru TEXT,
  time_limit_minutes INTEGER NOT NULL,
  max_points INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_exam_sections_exam ON mock_exam_sections(mock_exam_id);
CREATE INDEX idx_exam_sections_type ON mock_exam_sections(section_type);

-- Exam Questions - Question bank for all sections
CREATE TABLE IF NOT EXISTS exam_questions (
  id SERIAL PRIMARY KEY,
  section_id INTEGER REFERENCES mock_exam_sections(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  question_type VARCHAR(50) NOT NULL CHECK (question_type IN (
    'multiple_choice', 'true_false', 'fill_blank', 'matching',
    'short_answer', 'essay', 'listening_comprehension', 'speaking_prompt'
  )),

  -- Question content (JSONB for flexibility)
  question_data JSONB NOT NULL,
  -- Format depends on question_type:
  -- multiple_choice: {prompt: {en, ru}, options: [{id, text, isCorrect}], explanation: {en, ru}}
  -- fill_blank: {sentence: string, correctAnswers: [string], hint: {en, ru}}
  -- essay: {prompt: {en, ru}, minWords: number, maxWords: number, rubric: {...}}
  -- speaking_prompt: {prompt: {en, ru}, preparationTime: number, speakingTime: number}

  points INTEGER NOT NULL DEFAULT 1,
  difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),

  -- For automated grading
  correct_answers JSONB, -- Array of acceptable answers
  grading_criteria JSONB, -- Rubric for essay/speaking questions

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_exam_questions_section ON exam_questions(section_id);
CREATE INDEX idx_exam_questions_type ON exam_questions(question_type);
CREATE INDEX idx_exam_questions_difficulty ON exam_questions(difficulty);

-- User Exam Attempts - Track user progress on mock exams
CREATE TABLE IF NOT EXISTS user_exam_attempts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  mock_exam_id INTEGER REFERENCES mock_exams(id) ON DELETE CASCADE,

  -- Status tracking
  status VARCHAR(50) NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned', 'grading')),

  -- Timing
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  time_spent_minutes INTEGER,

  -- Scoring
  total_points_earned DECIMAL(10, 2),
  total_points_possible INTEGER,
  percentage_score DECIMAL(5, 2),
  passed BOOLEAN,

  -- Section breakdown (JSONB for detailed analytics)
  section_scores JSONB,
  -- Format: {reading: {earned: 25, possible: 30, percentage: 83.33}, listening: {...}, ...}

  -- Performance analytics
  strengths JSONB, -- Array of strong areas
  weaknesses JSONB, -- Array of weak areas
  recommendations TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_attempts_user ON user_exam_attempts(user_id);
CREATE INDEX idx_user_attempts_exam ON user_exam_attempts(mock_exam_id);
CREATE INDEX idx_user_attempts_status ON user_exam_attempts(status);
CREATE INDEX idx_user_attempts_completed ON user_exam_attempts(completed_at);

-- User Exam Answers - Individual answers for each question
CREATE TABLE IF NOT EXISTS user_exam_answers (
  id SERIAL PRIMARY KEY,
  attempt_id INTEGER REFERENCES user_exam_attempts(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES exam_questions(id) ON DELETE CASCADE,

  -- User's answer
  answer_data JSONB NOT NULL,
  -- Format depends on question type:
  -- multiple_choice: {selectedOptionId: string}
  -- fill_blank: {answers: [string]}
  -- essay: {text: string, wordCount: number}
  -- speaking: {audioUrl: string, transcription: string}

  -- Grading
  is_correct BOOLEAN,
  points_earned DECIMAL(5, 2),
  points_possible INTEGER,

  -- Feedback
  feedback_en TEXT,
  feedback_ru TEXT,
  graded_by VARCHAR(50), -- 'automatic' or 'manual' or 'ai'

  -- Timing for individual question
  time_spent_seconds INTEGER,
  answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_answers_attempt ON user_exam_answers(attempt_id);
CREATE INDEX idx_user_answers_question ON user_exam_answers(question_id);
CREATE INDEX idx_user_answers_correct ON user_exam_answers(is_correct);

-- Exam Study Resources - Tips, strategies, and reference materials
CREATE TABLE IF NOT EXISTS exam_study_resources (
  id SERIAL PRIMARY KEY,
  level VARCHAR(5) NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  section_type VARCHAR(50) CHECK (section_type IN ('reading', 'listening', 'writing', 'speaking', 'general')),
  resource_type VARCHAR(50) NOT NULL CHECK (resource_type IN ('strategy', 'tip', 'common_mistake', 'time_management', 'stress_management')),

  title_en VARCHAR(255) NOT NULL,
  title_ru VARCHAR(255) NOT NULL,
  content_en TEXT NOT NULL,
  content_ru TEXT NOT NULL,

  -- Optional examples
  examples JSONB,

  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_study_resources_level ON exam_study_resources(level);
CREATE INDEX idx_study_resources_section ON exam_study_resources(section_type);
CREATE INDEX idx_study_resources_type ON exam_study_resources(resource_type);

-- User Study Progress - Track what resources user has reviewed
CREATE TABLE IF NOT EXISTS user_study_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES exam_study_resources(id) ON DELETE CASCADE,

  reviewed BOOLEAN DEFAULT false,
  marked_helpful BOOLEAN DEFAULT false,
  notes TEXT,

  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_study_progress_user ON user_study_progress(user_id);
CREATE INDEX idx_study_progress_resource ON user_study_progress(resource_id);

-- Add comments for documentation
COMMENT ON TABLE mock_exams IS 'Templates for Polish language certification mock exams (A1-C2)';
COMMENT ON TABLE mock_exam_sections IS 'Individual sections within each exam (reading, listening, writing, speaking)';
COMMENT ON TABLE exam_questions IS 'Question bank for all exam sections with flexible JSONB structure';
COMMENT ON TABLE user_exam_attempts IS 'Tracks user attempts at mock exams with comprehensive scoring and analytics';
COMMENT ON TABLE user_exam_answers IS 'Individual question answers with detailed feedback and grading';
COMMENT ON TABLE exam_study_resources IS 'Study materials, strategies, and tips for exam preparation';
COMMENT ON TABLE user_study_progress IS 'Tracks which study resources users have reviewed';

-- Sample trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_exam_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_mock_exams_updated_at
  BEFORE UPDATE ON mock_exams
  FOR EACH ROW
  EXECUTE FUNCTION update_exam_updated_at();

CREATE TRIGGER update_exam_questions_updated_at
  BEFORE UPDATE ON exam_questions
  FOR EACH ROW
  EXECUTE FUNCTION update_exam_updated_at();

CREATE TRIGGER update_user_exam_attempts_updated_at
  BEFORE UPDATE ON user_exam_attempts
  FOR EACH ROW
  EXECUTE FUNCTION update_exam_updated_at();

CREATE TRIGGER update_exam_study_resources_updated_at
  BEFORE UPDATE ON exam_study_resources
  FOR EACH ROW
  EXECUTE FUNCTION update_exam_updated_at();

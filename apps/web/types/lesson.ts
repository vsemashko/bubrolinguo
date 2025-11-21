// Lesson and Exercise Type Definitions

export type ExerciseType =
  | 'multiple_choice'
  | 'translation'
  | 'fill_blank'
  | 'listening'
  | 'speaking'
  | 'matching';

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface MultipleChoiceExercise {
  id: string;
  type: 'multiple_choice';
  question_en: string;
  question_ru: string;
  options: string[];
  correct_answer: string;
  explanation_en?: string;
  explanation_ru?: string;
  audio_url?: string;
}

export interface TranslationExercise {
  id: string;
  type: 'translation';
  prompt_en: string;
  prompt_ru: string;
  correct_answer: string;
  accept_typos?: boolean;
  hint_en?: string;
  hint_ru?: string;
}

export interface FillBlankExercise {
  id: string;
  type: 'fill_blank';
  sentence: string; // Sentence with ___ as blank
  sentence_en: string;
  sentence_ru: string;
  correct_answer: string;
  options?: string[]; // Optional multiple choice for blank
  hint_en?: string;
  hint_ru?: string;
}

export interface ListeningExercise {
  id: string;
  type: 'listening';
  audio_url: string;
  question_en: string;
  question_ru: string;
  options?: string[];
  correct_answer: string;
  transcript?: string;
}

export interface SpeakingExercise {
  id: string;
  type: 'speaking';
  prompt_en: string;
  prompt_ru: string;
  target_phrase: string;
  audio_url?: string; // Reference audio
  min_similarity?: number; // 0-1, minimum similarity score to pass
}

export interface MatchingExercise {
  id: string;
  type: 'matching';
  instruction_en: string;
  instruction_ru: string;
  pairs: Array<{
    polish: string;
    translation: string;
  }>;
}

export type Exercise =
  | MultipleChoiceExercise
  | TranslationExercise
  | FillBlankExercise
  | ListeningExercise
  | SpeakingExercise
  | MatchingExercise;

export interface Lesson {
  id: string;
  lesson_number: number;
  level: CEFRLevel;
  unit_number: number;
  order_in_unit: number;
  title_en: string;
  title_ru: string;
  description_en: string;
  description_ru: string;
  exercises: Exercise[];
  target_words?: string[];
  grammar_topics?: string[];
  xp_reward: number;
  estimated_duration?: number; // in minutes
}

export interface ExerciseResult {
  exercise_id: string;
  correct: boolean;
  user_answer: string;
  correct_answer: string;
  time_spent: number; // in seconds
}

export interface LessonResult {
  lesson_id: string;
  score: number; // 0-100
  xp_earned: number;
  mistakes_count: number;
  time_spent: number; // in seconds
  exercise_results: ExerciseResult[];
  completed_at: string; // ISO timestamp
}

export interface UserProgress {
  lesson_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score?: number;
  attempt_number: number;
  last_attempted_at?: string;
  completed_at?: string;
}

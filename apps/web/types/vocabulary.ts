// Vocabulary Type Definitions

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'interjection';

export type VocabularyStatus = 'new' | 'learning' | 'mastered' | 'relearning';

export interface Vocabulary {
  id: string;
  polishWord: string;
  translationEn: string;
  translationRu: string;
  partOfSpeech: PartOfSpeech;
  gender?: 'masculine' | 'feminine' | 'neuter';
  level: CEFRLevel;
  frequencyRank?: number;
  pronunciationIpa?: string;
  exampleSentencePl?: string;
  exampleSentenceEn?: string;
  exampleSentenceRu?: string;
  mnemonicEn?: string;
  mnemonicRu?: string;
  imageUrl?: string;
  audioUrl?: string;
  audioSlowUrl?: string;
}

export interface UserVocabulary {
  id: string;
  vocabularyId: string;
  proficiencyLevel: number; // 0-5
  easinessFactor: number; // SM-2 algorithm (default 2.5)
  intervalDays: number;
  nextReviewDate: string; // ISO date
  timesReviewed: number;
  timesCorrect: number;
  timesIncorrect: number;
  currentStreak: number;
  status: VocabularyStatus;
  firstSeenAt: string;
  lastReviewedAt?: string;
  masteredAt?: string;
}

export interface VocabularyWithUserProgress extends Vocabulary {
  userProgress?: UserVocabulary;
}

export interface ReviewSession {
  id: string;
  userId: string;
  startedAt: string;
  completedAt?: string;
  totalWords: number;
  reviewedWords: number;
  correctCount: number;
  incorrectCount: number;
}

export interface ReviewResult {
  vocabularyId: string;
  quality: number; // 0-5 quality rating for SM-2
  timeSpent: number; // seconds
  correct: boolean;
}

export interface VocabularyFilters {
  level?: CEFRLevel;
  status?: VocabularyStatus;
  partOfSpeech?: PartOfSpeech;
  searchQuery?: string;
}

export interface VocabularyStats {
  totalWords: number;
  newWords: number;
  learningWords: number;
  masteredWords: number;
  wordsReviewDueToday: number;
  currentStreak: number;
  longestStreak: number;
}

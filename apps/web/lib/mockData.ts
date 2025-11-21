/**
 * Mock Data Generator for Frontend Development
 *
 * This file provides realistic mock data for all API entities.
 * Use this when developing frontend features without a live API connection.
 *
 * Usage:
 *   import { mockLessons, mockVocabulary, mockUser } from '@/lib/mockData';
 *
 * To enable mock mode, set NEXT_PUBLIC_USE_MOCK_DATA=true in .env.local
 */

export interface User {
  id: string;
  email: string;
  displayName: string;
  interfaceLanguage: 'en' | 'ru';
  currentLevel: string;
  totalXp: number;
  streak: number;
  createdAt: string;
}

export interface Lesson {
  id: string;
  lessonNumber: number;
  level: string;
  titleEn: string;
  titleRu: string;
  descriptionEn: string;
  descriptionRu: string;
  xpReward: number;
  estimatedMinutes: number;
  isPublished: boolean;
  exercises?: Exercise[];
}

export interface Exercise {
  id: string;
  lessonId: string;
  exerciseNumber: number;
  exerciseType: 'translation' | 'multiple_choice' | 'fill_blank' | 'listening' | 'speaking' | 'matching';
  content: any;
  points: number;
}

export interface VocabularyWord {
  id: string;
  polish: string;
  english: string;
  russian: string;
  level: string;
  partOfSpeech: string;
  ipa?: string;
  gender?: string;
  plural?: string;
  exampleSentencePolish?: string;
  exampleSentenceEnglish?: string;
  exampleSentenceRussian?: string;
}

export interface UserVocabulary extends VocabularyWord {
  repetitions: number;
  easinessFactor: number;
  interval: number;
  nextReviewDate: string;
  lastReviewedAt?: string;
  isLearned: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  xpReward: number;
  unlockedAt?: string;
}

export interface MockExam {
  id: string;
  level: string;
  titleEn: string;
  titleRu: string;
  descriptionEn: string;
  descriptionRu: string;
  duration: number;
  passingScore: number;
  totalPoints: number;
  sections: ExamSection[];
}

export interface ExamSection {
  id: string;
  examId: string;
  sectionType: 'reading' | 'listening' | 'writing' | 'speaking';
  sectionNumber: number;
  titleEn: string;
  titleRu: string;
  instructionsEn: string;
  instructionsRu: string;
  timeLimit: number;
  questions: ExamQuestion[];
}

export interface ExamQuestion {
  id: string;
  sectionId: string;
  questionNumber: number;
  questionType: 'multiple_choice' | 'fill_blank' | 'essay' | 'speaking';
  questionData: any;
  points: number;
  difficulty: string;
}

export interface UserProgress {
  totalXp: number;
  currentLevel: string;
  lessonsCompleted: number;
  vocabularyLearned: number;
  currentStreak: number;
  longestStreak: number;
  studyTimeMinutes: number;
}

// Mock User
export const mockUser: User = {
  id: 'mock-user-1',
  email: 'demo@bubrolinguo.com',
  displayName: 'Demo User',
  interfaceLanguage: 'en',
  currentLevel: 'A2',
  totalXp: 1250,
  streak: 7,
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
};

// Mock Lessons (30 lessons across A1-B2)
export const mockLessons: Lesson[] = [
  // A1 Lessons
  {
    id: 'lesson-1',
    lessonNumber: 1,
    level: 'A1',
    titleEn: 'Greetings and Introductions',
    titleRu: 'Приветствия и знакомство',
    descriptionEn: 'Learn basic Polish greetings and how to introduce yourself',
    descriptionRu: 'Изучите базовые польские приветствия и как представиться',
    xpReward: 50,
    estimatedMinutes: 15,
    isPublished: true,
  },
  {
    id: 'lesson-2',
    lessonNumber: 2,
    level: 'A1',
    titleEn: 'Numbers and Basic Counting',
    titleRu: 'Числа и базовый счёт',
    descriptionEn: 'Master Polish numbers from 0 to 100',
    descriptionRu: 'Освойте польские числа от 0 до 100',
    xpReward: 50,
    estimatedMinutes: 15,
    isPublished: true,
  },
  {
    id: 'lesson-3',
    lessonNumber: 3,
    level: 'A1',
    titleEn: 'Family Members',
    titleRu: 'Члены семьи',
    descriptionEn: 'Learn vocabulary for family relationships',
    descriptionRu: 'Изучите словарь для семейных отношений',
    xpReward: 50,
    estimatedMinutes: 20,
    isPublished: true,
  },
  {
    id: 'lesson-4',
    lessonNumber: 4,
    level: 'A1',
    titleEn: 'Colors and Basic Adjectives',
    titleRu: 'Цвета и базовые прилагательные',
    descriptionEn: 'Express yourself with colors and simple descriptions',
    descriptionRu: 'Выражайте себя с помощью цветов и простых описаний',
    xpReward: 50,
    estimatedMinutes: 15,
    isPublished: true,
  },
  {
    id: 'lesson-5',
    lessonNumber: 5,
    level: 'A1',
    titleEn: 'Days of the Week',
    titleRu: 'Дни недели',
    descriptionEn: 'Learn the days of the week and basic time expressions',
    descriptionRu: 'Изучите дни недели и базовые временные выражения',
    xpReward: 50,
    estimatedMinutes: 15,
    isPublished: true,
  },
  // A2 Lessons
  {
    id: 'lesson-11',
    lessonNumber: 11,
    level: 'A2',
    titleEn: 'Past Tense Introduction',
    titleRu: 'Введение в прошедшее время',
    descriptionEn: 'Learn to talk about past events',
    descriptionRu: 'Научитесь говорить о прошлых событиях',
    xpReward: 75,
    estimatedMinutes: 25,
    isPublished: true,
  },
  {
    id: 'lesson-12',
    lessonNumber: 12,
    level: 'A2',
    titleEn: 'Describing People',
    titleRu: 'Описание людей',
    descriptionEn: 'Vocabulary and grammar for describing physical appearance and personality',
    descriptionRu: 'Словарь и грамматика для описания внешности и личности',
    xpReward: 75,
    estimatedMinutes: 25,
    isPublished: true,
  },
  // B1 Lessons
  {
    id: 'lesson-21',
    lessonNumber: 21,
    level: 'B1',
    titleEn: 'Expressing Opinions',
    titleRu: 'Выражение мнений',
    descriptionEn: 'Learn to express and justify your opinions',
    descriptionRu: 'Научитесь выражать и обосновывать свои мнения',
    xpReward: 100,
    estimatedMinutes: 30,
    isPublished: true,
  },
  {
    id: 'lesson-22',
    lessonNumber: 22,
    level: 'B1',
    titleEn: 'Conditional Mood',
    titleRu: 'Условное наклонение',
    descriptionEn: 'Master hypothetical situations and conditions',
    descriptionRu: 'Освойте гипотетические ситуации и условия',
    xpReward: 100,
    estimatedMinutes: 35,
    isPublished: true,
  },
  // B2 Lessons
  {
    id: 'lesson-26',
    lessonNumber: 26,
    level: 'B2',
    titleEn: 'Advanced Verb Aspects',
    titleRu: 'Продвинутые глагольные виды',
    descriptionEn: 'Deep dive into perfective and imperfective aspects',
    descriptionRu: 'Глубокое изучение совершенного и несовершенного видов',
    xpReward: 150,
    estimatedMinutes: 40,
    isPublished: true,
  },
  {
    id: 'lesson-27',
    lessonNumber: 27,
    level: 'B2',
    titleEn: 'Formal Business Communication',
    titleRu: 'Формальное деловое общение',
    descriptionEn: 'Professional Polish for business contexts',
    descriptionRu: 'Профессиональный польский для деловых контекстов',
    xpReward: 150,
    estimatedMinutes: 40,
    isPublished: true,
  },
];

// Mock Vocabulary (50 sample words)
export const mockVocabulary: VocabularyWord[] = [
  {
    id: 'vocab-1',
    polish: 'cześć',
    english: 'hi, hello',
    russian: 'привет',
    level: 'A1',
    partOfSpeech: 'interjection',
    ipa: 't͡ʂɛɕt͡ɕ',
    exampleSentencePolish: 'Cześć! Jak się masz?',
    exampleSentenceEnglish: 'Hi! How are you?',
    exampleSentenceRussian: 'Привет! Как дела?',
  },
  {
    id: 'vocab-2',
    polish: 'dziękuję',
    english: 'thank you',
    russian: 'спасибо',
    level: 'A1',
    partOfSpeech: 'verb',
    ipa: 'd͡ʑɛŋˈkujɛ',
    exampleSentencePolish: 'Dziękuję bardzo za pomoc.',
    exampleSentenceEnglish: 'Thank you very much for your help.',
    exampleSentenceRussian: 'Большое спасибо за помощь.',
  },
  {
    id: 'vocab-3',
    polish: 'proszę',
    english: 'please, you\'re welcome',
    russian: 'пожалуйста',
    level: 'A1',
    partOfSpeech: 'verb',
    ipa: 'ˈprɔʂɛ',
    exampleSentencePolish: 'Proszę, weź to.',
    exampleSentenceEnglish: 'Please, take this.',
    exampleSentenceRussian: 'Пожалуйста, возьми это.',
  },
  {
    id: 'vocab-4',
    polish: 'dom',
    english: 'house, home',
    russian: 'дом',
    level: 'A1',
    partOfSpeech: 'noun',
    gender: 'masculine',
    plural: 'domy',
    ipa: 'dɔm',
    exampleSentencePolish: 'To jest mój dom.',
    exampleSentenceEnglish: 'This is my house.',
    exampleSentenceRussian: 'Это мой дом.',
  },
  {
    id: 'vocab-5',
    polish: 'woda',
    english: 'water',
    russian: 'вода',
    level: 'A1',
    partOfSpeech: 'noun',
    gender: 'feminine',
    ipa: 'ˈvɔda',
    exampleSentencePolish: 'Poproszę szklankę wody.',
    exampleSentenceEnglish: 'I would like a glass of water, please.',
    exampleSentenceRussian: 'Стакан воды, пожалуйста.',
  },
  {
    id: 'vocab-6',
    polish: 'książka',
    english: 'book',
    russian: 'книга',
    level: 'A1',
    partOfSpeech: 'noun',
    gender: 'feminine',
    plural: 'książki',
    ipa: 't͡ʂɔŋʂka',
    exampleSentencePolish: 'Czytam interesującą książkę.',
    exampleSentenceEnglish: 'I\'m reading an interesting book.',
    exampleSentenceRussian: 'Я читаю интересную книгу.',
  },
  {
    id: 'vocab-7',
    polish: 'nauczyciel',
    english: 'teacher',
    russian: 'учитель',
    level: 'A1',
    partOfSpeech: 'noun',
    gender: 'masculine',
    plural: 'nauczyciele',
    ipa: 'naut͡ʂɨˈt͡ɕɛl',
    exampleSentencePolish: 'Mój nauczyciel jest bardzo pomocny.',
    exampleSentenceEnglish: 'My teacher is very helpful.',
    exampleSentenceRussian: 'Мой учитель очень полезный.',
  },
  {
    id: 'vocab-8',
    polish: 'przyszłość',
    english: 'future',
    russian: 'будущее',
    level: 'B1',
    partOfSpeech: 'noun',
    gender: 'feminine',
    ipa: 'ˈpʂɨʂwɔɕt͡ɕ',
    exampleSentencePolish: 'Myślę o przyszłości.',
    exampleSentenceEnglish: 'I\'m thinking about the future.',
    exampleSentenceRussian: 'Я думаю о будущем.',
  },
  {
    id: 'vocab-9',
    polish: 'wykształcenie',
    english: 'education',
    russian: 'образование',
    level: 'B1',
    partOfSpeech: 'noun',
    gender: 'neuter',
    ipa: 'vɨkʂtawˈt͡ɕɛɲɛ',
    exampleSentencePolish: 'Wykształcenie jest ważne.',
    exampleSentenceEnglish: 'Education is important.',
    exampleSentenceRussian: 'Образование важно.',
  },
  {
    id: 'vocab-10',
    polish: 'osiągnięcie',
    english: 'achievement',
    russian: 'достижение',
    level: 'B2',
    partOfSpeech: 'noun',
    gender: 'neuter',
    plural: 'osiągnięcia',
    ipa: 'ɔɕɔŋˈŋɲɛɲt͡ɕɛ',
    exampleSentencePolish: 'To było wielkie osiągnięcie.',
    exampleSentenceEnglish: 'It was a great achievement.',
    exampleSentenceRussian: 'Это было великое достижение.',
  },
];

// Mock User Vocabulary (with spaced repetition data)
export const mockUserVocabulary: UserVocabulary[] = mockVocabulary.slice(0, 7).map((word, index) => ({
  ...word,
  repetitions: index + 1,
  easinessFactor: 2.5 - index * 0.1,
  interval: Math.pow(2, index),
  nextReviewDate: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toISOString(),
  lastReviewedAt: new Date(Date.now() - (7 - index) * 24 * 60 * 60 * 1000).toISOString(),
  isLearned: index >= 3,
}));

// Mock Achievements
export const mockAchievements: Achievement[] = [
  {
    id: 'achievement-1',
    name: 'First Steps',
    description: 'Complete your first lesson',
    category: 'lessons',
    icon: '🎯',
    xpReward: 10,
    unlockedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'achievement-2',
    name: 'Word Wizard',
    description: 'Learn 50 vocabulary words',
    category: 'vocabulary',
    icon: '📚',
    xpReward: 25,
    unlockedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'achievement-3',
    name: 'Streak Starter',
    description: 'Maintain a 7-day learning streak',
    category: 'streak',
    icon: '🔥',
    xpReward: 50,
    unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'achievement-4',
    name: 'Grammar Master',
    description: 'Complete all A1 grammar lessons',
    category: 'lessons',
    icon: '✍️',
    xpReward: 100,
  },
  {
    id: 'achievement-5',
    name: 'Exam Ready',
    description: 'Pass an A1 mock exam',
    category: 'exams',
    icon: '🎓',
    xpReward: 150,
  },
];

// Mock Exam
export const mockExam: MockExam = {
  id: 'exam-a1',
  level: 'A1',
  titleEn: 'A1 Polish Proficiency Exam',
  titleRu: 'Экзамен на уровень A1 польского языка',
  descriptionEn: 'Complete mock exam testing all A1 skills',
  descriptionRu: 'Полный пробный экзамен, проверяющий все навыки уровня A1',
  duration: 90,
  passingScore: 60,
  totalPoints: 100,
  sections: [
    {
      id: 'section-1',
      examId: 'exam-a1',
      sectionType: 'reading',
      sectionNumber: 1,
      titleEn: 'Reading Comprehension',
      titleRu: 'Понимание прочитанного',
      instructionsEn: 'Read the passages and answer the questions',
      instructionsRu: 'Прочитайте отрывки и ответьте на вопросы',
      timeLimit: 20,
      questions: [
        {
          id: 'q1',
          sectionId: 'section-1',
          questionNumber: 1,
          questionType: 'multiple_choice',
          questionData: {
            prompt: {
              en: 'Read: "Cześć! Mam na imię Anna." What is the person\'s name?',
              ru: 'Прочитайте: "Cześć! Mam na imię Anna." Как зовут человека?',
            },
            options: [
              { id: 'a', text: 'Anna', isCorrect: true },
              { id: 'b', text: 'Maria', isCorrect: false },
              { id: 'c', text: 'Ewa', isCorrect: false },
              { id: 'd', text: 'Katarzyna', isCorrect: false },
            ],
          },
          points: 2,
          difficulty: 'easy',
        },
      ],
    },
    {
      id: 'section-2',
      examId: 'exam-a1',
      sectionType: 'listening',
      sectionNumber: 2,
      titleEn: 'Listening Comprehension',
      titleRu: 'Понимание на слух',
      instructionsEn: 'Listen to the audio and answer the questions',
      instructionsRu: 'Прослушайте аудио и ответьте на вопросы',
      timeLimit: 15,
      questions: [],
    },
    {
      id: 'section-3',
      examId: 'exam-a1',
      sectionType: 'writing',
      sectionNumber: 3,
      titleEn: 'Writing',
      titleRu: 'Письмо',
      instructionsEn: 'Complete the writing tasks',
      instructionsRu: 'Выполните письменные задания',
      timeLimit: 30,
      questions: [],
    },
    {
      id: 'section-4',
      examId: 'exam-a1',
      sectionType: 'speaking',
      sectionNumber: 4,
      titleEn: 'Speaking',
      titleRu: 'Говорение',
      instructionsEn: 'Respond to the speaking prompts',
      instructionsRu: 'Ответьте на устные вопросы',
      timeLimit: 25,
      questions: [],
    },
  ],
};

// Mock User Progress
export const mockUserProgress: UserProgress = {
  totalXp: 1250,
  currentLevel: 'A2',
  lessonsCompleted: 12,
  vocabularyLearned: 87,
  currentStreak: 7,
  longestStreak: 14,
  studyTimeMinutes: 340,
};

// Helper function to get mock data based on environment
export const useMockData = (): boolean => {
  return process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
};

// Mock API delay to simulate network latency
export const mockDelay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Mock API response wrapper
export const mockApiResponse = <T>(data: T, success: boolean = true): { success: boolean; data: T } => {
  return {
    success,
    data,
  };
};

// Generate mock data functions
export const generateMockLessons = (count: number, level: string): Lesson[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `lesson-${level.toLowerCase()}-${i + 1}`,
    lessonNumber: i + 1,
    level,
    titleEn: `${level} Lesson ${i + 1}`,
    titleRu: `Урок ${level} ${i + 1}`,
    descriptionEn: `Description for ${level} lesson ${i + 1}`,
    descriptionRu: `Описание урока ${level} ${i + 1}`,
    xpReward: 50 + i * 5,
    estimatedMinutes: 15 + i * 2,
    isPublished: true,
  }));
};

export const generateMockVocabulary = (count: number, level: string): VocabularyWord[] => {
  const polishWords = [
    'słowo', 'książka', 'dom', 'szkoła', 'przyjaciel', 'rodzina', 'praca', 'miasto',
    'kraj', 'język', 'nauka', 'życie', 'czas', 'dzień', 'noc', 'rano', 'wieczór',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `vocab-${level.toLowerCase()}-${i + 1}`,
    polish: polishWords[i % polishWords.length] + i,
    english: `word${i}`,
    russian: `слово${i}`,
    level,
    partOfSpeech: ['noun', 'verb', 'adjective', 'adverb'][i % 4],
    ipa: 'mock-ipa',
  }));
};

export default {
  mockUser,
  mockLessons,
  mockVocabulary,
  mockUserVocabulary,
  mockAchievements,
  mockExam,
  mockUserProgress,
  useMockData,
  mockDelay,
  mockApiResponse,
  generateMockLessons,
  generateMockVocabulary,
};

// User Progress and Statistics Type Definitions

import { CEFRLevel } from './lesson';

export interface UserStats {
  totalXp: number;
  currentLevel: CEFRLevel;
  streakCount: number;
  longestStreak: number;
  lessonsCompleted: number;
  totalLessons: number;
  wordsLearned: number;
  totalWords: number;
  averageAccuracy: number;
  totalTimeSpent: number; // in seconds
  lastActivityDate: string;
}

export interface DailyActivity {
  date: string; // ISO date
  xpEarned: number;
  lessonsCompleted: number;
  wordsReviewed: number;
  timeSpent: number; // in seconds
}

export interface LevelProgress {
  level: CEFRLevel;
  lessonsCompleted: number;
  totalLessons: number;
  progress: number; // 0-100
  unlocked: boolean;
}

export interface Achievement {
  id: string;
  code: string;
  titleEn: string;
  titleRu: string;
  descriptionEn: string;
  descriptionRu: string;
  iconUrl?: string;
  badgeColor: string;
  requirementType: string;
  requirementValue: number;
  xpReward: number;
  unlockedAt?: string;
  progress?: number; // 0-100
}

export interface RecentActivity {
  id: string;
  type: 'lesson_completed' | 'vocabulary_reviewed' | 'achievement_unlocked' | 'level_up';
  timestamp: string;
  metadata: {
    lessonTitle?: string;
    lessonId?: string;
    wordsReviewed?: number;
    achievementTitle?: string;
    newLevel?: CEFRLevel;
    xpEarned?: number;
    score?: number;
  };
}

export interface DashboardData {
  user: {
    id: string;
    displayName: string;
    email: string;
    avatarUrl?: string;
    interfaceLanguage: 'en' | 'ru';
  };
  stats: UserStats;
  levelProgress: LevelProgress[];
  recentActivities: RecentActivity[];
  dailyActivities: DailyActivity[]; // Last 30 days
  achievements: Achievement[];
  upcomingReviews: {
    vocabularyDueToday: number;
    vocabularyDueTomorrow: number;
  };
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  totalXp: number;
  streakCount: number;
  level: CEFRLevel;
}

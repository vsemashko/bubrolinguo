'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  StatsCard,
  StreakCalendar,
  LevelProgressCard,
  RecentActivity,
  AchievementsDisplay,
} from '@/components/dashboard';
import { Button, Avatar, Badge } from '@/components/ui';
import { DashboardData } from '@/types/progress';
import { isAuthenticated } from '@/lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<'en' | 'ru'>('en');

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    // TODO: Fetch dashboard data from API
    // For now, using mock data
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Mock data for demonstration
    const mockData: DashboardData = {
      user: {
        id: '1',
        displayName: 'Anna Kowalska',
        email: 'anna@example.com',
        interfaceLanguage: 'en',
      },
      stats: {
        totalXp: 1250,
        currentLevel: 'A2',
        streakCount: 7,
        longestStreak: 14,
        lessonsCompleted: 15,
        totalLessons: 250,
        wordsLearned: 342,
        totalWords: 10000,
        averageAccuracy: 87,
        totalTimeSpent: 18000, // 5 hours
        lastActivityDate: new Date().toISOString(),
      },
      levelProgress: [
        {
          level: 'A1',
          lessonsCompleted: 15,
          totalLessons: 20,
          progress: 75,
          unlocked: true,
        },
        {
          level: 'A2',
          lessonsCompleted: 0,
          totalLessons: 30,
          progress: 0,
          unlocked: true,
        },
        {
          level: 'B1',
          lessonsCompleted: 0,
          totalLessons: 50,
          progress: 0,
          unlocked: false,
        },
        {
          level: 'B2',
          lessonsCompleted: 0,
          totalLessons: 75,
          progress: 0,
          unlocked: false,
        },
        {
          level: 'C1',
          lessonsCompleted: 0,
          totalLessons: 75,
          progress: 0,
          unlocked: false,
        },
      ],
      recentActivities: [
        {
          id: '1',
          type: 'lesson_completed',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          metadata: {
            lessonTitle: 'Greetings and Basic Phrases',
            lessonId: '1',
            xpEarned: 10,
            score: 95,
          },
        },
        {
          id: '2',
          type: 'vocabulary_reviewed',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          metadata: {
            wordsReviewed: 18,
            xpEarned: 5,
          },
        },
        {
          id: '3',
          type: 'achievement_unlocked',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          metadata: {
            achievementTitle: '7-Day Streak',
            xpEarned: 50,
          },
        },
      ],
      dailyActivities: generateMockDailyActivities(),
      achievements: [
        {
          id: '1',
          code: 'first_lesson',
          titleEn: 'First Steps',
          titleRu: 'Первые шаги',
          descriptionEn: 'Complete your first lesson',
          descriptionRu: 'Завершите первый урок',
          badgeColor: '#4CAF50',
          requirementType: 'lessons_completed',
          requirementValue: 1,
          xpReward: 10,
          unlockedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
        },
        {
          id: '2',
          code: 'streak_7',
          titleEn: '7-Day Streak',
          titleRu: '7-дневная серия',
          descriptionEn: 'Practice for 7 days in a row',
          descriptionRu: 'Занимайтесь 7 дней подряд',
          badgeColor: '#FF9800',
          requirementType: 'streak_days',
          requirementValue: 7,
          xpReward: 50,
          unlockedAt: new Date(Date.now() - 10800000).toISOString(),
        },
        {
          id: '3',
          code: 'words_100',
          titleEn: 'Word Collector',
          titleRu: 'Коллекционер слов',
          descriptionEn: 'Master 100 vocabulary words',
          descriptionRu: 'Освойте 100 словарных слов',
          badgeColor: '#2196F3',
          requirementType: 'words_mastered',
          requirementValue: 100,
          xpReward: 100,
          progress: 34,
        },
        {
          id: '4',
          code: 'reach_a2',
          titleEn: 'A2 Achiever',
          titleRu: 'Достигший A2',
          descriptionEn: 'Reach A2 level',
          descriptionRu: 'Достигните уровня A2',
          badgeColor: '#8BC34A',
          requirementType: 'level_reached',
          requirementValue: 0,
          xpReward: 300,
          progress: 75,
        },
      ],
      upcomingReviews: {
        vocabularyDueToday: 18,
        vocabularyDueTomorrow: 12,
      },
    };

    setDashboardData(mockData);
    setLanguage(mockData.user.interfaceLanguage);
    setIsLoading(false);
  };

  const generateMockDailyActivities = () => {
    const activities = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const xp = i < 7 ? Math.floor(Math.random() * 50) + 10 : i < 14 ? Math.floor(Math.random() * 30) : 0;
      activities.push({
        date: date.toISOString(),
        xpEarned: xp,
        lessonsCompleted: xp > 0 ? Math.floor(xp / 10) : 0,
        wordsReviewed: xp > 0 ? Math.floor(Math.random() * 20) : 0,
        timeSpent: xp > 0 ? Math.floor(Math.random() * 1800) + 600 : 0,
      });
    }
    return activities;
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    return language === 'en' ? `${hours}h` : `${hours}ч`;
  };

  if (isLoading || !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🦫</div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const { user, stats, levelProgress, recentActivities, dailyActivities, achievements, upcomingReviews } =
    dashboardData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl">🦫</span>
              <span className="text-xl font-bold text-brand-primary">
                Bubrolinguo
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-brand-primary font-semibold"
              >
                {language === 'en' ? 'Dashboard' : 'Панель'}
              </Link>
              <Link
                href="/lessons"
                className="text-gray-600 hover:text-gray-900"
              >
                {language === 'en' ? 'Lessons' : 'Уроки'}
              </Link>
              <Link
                href="/vocabulary"
                className="text-gray-600 hover:text-gray-900"
              >
                {language === 'en' ? 'Vocabulary' : 'Словарь'}
              </Link>
              <Link
                href="/achievements"
                className="text-gray-600 hover:text-gray-900"
              >
                {language === 'en' ? 'Achievements' : 'Достижения'}
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="md">
                  {stats.totalXp} XP
                </Badge>
                <Badge variant="warning" size="md">
                  🔥 {stats.streakCount}
                </Badge>
              </div>
              <Avatar
                src={user.avatarUrl}
                alt={user.displayName}
                fallback={user.displayName}
                size="md"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'en' ? 'Welcome back' : 'С возвращением'},{' '}
            {user.displayName.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600">
            {language === 'en'
              ? "Let's continue your Polish learning journey"
              : 'Продолжим изучение польского языка'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link href="/lessons/next">
            <Button className="w-full" size="lg">
              {language === 'en' ? 'Continue Learning' : 'Продолжить обучение'}
            </Button>
          </Link>
          <Link href="/vocabulary/review">
            <Button variant="secondary" className="w-full" size="lg">
              {language === 'en' ? 'Review Vocabulary' : 'Повторить слова'}{' '}
              {upcomingReviews.vocabularyDueToday > 0 && `(${upcomingReviews.vocabularyDueToday})`}
            </Button>
          </Link>
          <Link href="/practice">
            <Button variant="outline" className="w-full" size="lg">
              {language === 'en' ? 'Practice' : 'Практика'}
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title={language === 'en' ? 'Total XP' : 'Всего XP'}
            value={stats.totalXp.toLocaleString()}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            }
            color="primary"
          />
          <StatsCard
            title={language === 'en' ? 'Current Streak' : 'Текущая серия'}
            value={`${stats.streakCount} ${language === 'en' ? 'days' : 'дн'}`}
            subtitle={`${language === 'en' ? 'Longest' : 'Лучшая'}: ${stats.longestStreak}`}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
              </svg>
            }
            color="warning"
          />
          <StatsCard
            title={language === 'en' ? 'Lessons Completed' : 'Завершено уроков'}
            value={`${stats.lessonsCompleted}/${stats.totalLessons}`}
            subtitle={`${Math.round((stats.lessonsCompleted / stats.totalLessons) * 100)}%`}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            color="success"
          />
          <StatsCard
            title={language === 'en' ? 'Words Learned' : 'Выучено слов'}
            value={stats.wordsLearned}
            subtitle={`${language === 'en' ? 'of' : 'из'} ${stats.totalWords.toLocaleString()}`}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            }
            color="secondary"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Streak Calendar */}
            <StreakCalendar
              dailyActivities={dailyActivities}
              language={language}
            />

            {/* Recent Activity */}
            <RecentActivity
              activities={recentActivities}
              language={language}
            />

            {/* Achievements */}
            <AchievementsDisplay
              achievements={achievements}
              language={language}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Level Progress */}
            <LevelProgressCard
              levels={levelProgress}
              currentLevel={stats.currentLevel}
              language={language}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

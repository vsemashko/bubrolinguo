'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LessonCard, LessonCardData } from '@/components/lessons/LessonCard';
import { Button, Badge, Avatar } from '@/components/ui';
import { CEFRLevel } from '@/types/lesson';
import { isAuthenticated } from '@/lib/auth';

export default function LessonsPage() {
  const router = useRouter();
  const [lessons, setLessons] = useState<LessonCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<
    'all' | 'not_started' | 'in_progress' | 'completed'
  >('all');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    loadLessons();
  }, []);

  const loadLessons = async () => {
    // Mock data for demonstration
    const mockLessons: LessonCardData[] = [
      {
        id: '1',
        lessonNumber: 1,
        level: 'A1',
        titleEn: 'Greetings and Basic Phrases',
        titleRu: 'Приветствия и основные фразы',
        descriptionEn: 'Learn how to greet people and use basic courtesy phrases in Polish.',
        descriptionRu: 'Научитесь приветствовать людей и использовать основные вежливые фразы на польском.',
        xpReward: 10,
        estimatedDuration: 15,
        exerciseCount: 8,
        userProgress: {
          status: 'completed',
          score: 95,
          completedAt: new Date(Date.now() - 86400000).toISOString(),
        },
        isLocked: false,
      },
      {
        id: '2',
        lessonNumber: 2,
        level: 'A1',
        titleEn: 'Numbers and Counting',
        titleRu: 'Числа и счет',
        descriptionEn: 'Master Polish numbers from 0 to 100 and learn basic counting.',
        descriptionRu: 'Освойте польские числа от 0 до 100 и научитесь базовому счету.',
        xpReward: 10,
        estimatedDuration: 20,
        exerciseCount: 10,
        userProgress: {
          status: 'in_progress',
        },
        isLocked: false,
      },
      {
        id: '3',
        lessonNumber: 3,
        level: 'A1',
        titleEn: 'Family and Relationships',
        titleRu: 'Семья и отношения',
        descriptionEn: 'Learn vocabulary for family members and basic relationships.',
        descriptionRu: 'Изучите словарь для членов семьи и основных отношений.',
        xpReward: 10,
        estimatedDuration: 18,
        exerciseCount: 12,
        isLocked: false,
      },
      {
        id: '4',
        lessonNumber: 4,
        level: 'A1',
        titleEn: 'Colors and Shapes',
        titleRu: 'Цвета и формы',
        descriptionEn: 'Describe objects using colors and basic shapes.',
        descriptionRu: 'Описывайте объекты, используя цвета и основные формы.',
        xpReward: 10,
        estimatedDuration: 15,
        exerciseCount: 9,
        isLocked: false,
      },
      {
        id: '5',
        lessonNumber: 5,
        level: 'A1',
        titleEn: 'Days and Months',
        titleRu: 'Дни и месяцы',
        descriptionEn: 'Learn the days of the week and months of the year.',
        descriptionRu: 'Изучите дни недели и месяцы года.',
        xpReward: 10,
        estimatedDuration: 16,
        exerciseCount: 11,
        isLocked: false,
      },
      {
        id: '6',
        lessonNumber: 6,
        level: 'A1',
        titleEn: 'Food and Drinks',
        titleRu: 'Еда и напитки',
        descriptionEn: 'Essential vocabulary for ordering food and drinks.',
        descriptionRu: 'Необходимый словарь для заказа еды и напитков.',
        xpReward: 15,
        estimatedDuration: 20,
        exerciseCount: 14,
        isLocked: true,
      },
      {
        id: '7',
        lessonNumber: 7,
        level: 'A1',
        titleEn: 'At the Store',
        titleRu: 'В магазине',
        descriptionEn: 'Learn how to shop and ask for prices in Polish.',
        descriptionRu: 'Научитесь делать покупки и спрашивать цены на польском.',
        xpReward: 15,
        estimatedDuration: 22,
        exerciseCount: 13,
        isLocked: true,
      },
      {
        id: '20',
        lessonNumber: 20,
        level: 'A2',
        titleEn: 'Past Tense Verbs',
        titleRu: 'Глаголы в прошедшем времени',
        descriptionEn: 'Master regular past tense verb conjugations.',
        descriptionRu: 'Освойте спряжение правильных глаголов в прошедшем времени.',
        xpReward: 20,
        estimatedDuration: 25,
        exerciseCount: 15,
        isLocked: true,
      },
      {
        id: '50',
        lessonNumber: 50,
        level: 'B1',
        titleEn: 'Expressing Opinions',
        titleRu: 'Выражение мнений',
        descriptionEn: 'Learn to express and defend your opinions in Polish.',
        descriptionRu: 'Научитесь выражать и отстаивать свои мнения на польском.',
        xpReward: 30,
        estimatedDuration: 30,
        exerciseCount: 18,
        isLocked: true,
      },
    ];

    setLessons(mockLessons);
    setIsLoading(false);
  };

  const levels: (CEFRLevel | 'all')[] = ['all', 'A1', 'A2', 'B1', 'B2', 'C1'];

  const filteredLessons = lessons.filter((lesson) => {
    const levelMatch = selectedLevel === 'all' || lesson.level === selectedLevel;
    const statusMatch =
      selectedStatus === 'all' ||
      (lesson.userProgress?.status || 'not_started') === selectedStatus;
    return levelMatch && statusMatch;
  });

  const stats = {
    total: lessons.length,
    completed: lessons.filter((l) => l.userProgress?.status === 'completed').length,
    inProgress: lessons.filter((l) => l.userProgress?.status === 'in_progress').length,
    locked: lessons.filter((l) => l.isLocked).length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🦫</div>
          <p className="text-gray-600">Loading lessons...</p>
        </div>
      </div>
    );
  }

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
                className="text-gray-600 hover:text-gray-900"
              >
                {language === 'en' ? 'Dashboard' : 'Панель'}
              </Link>
              <Link
                href="/lessons"
                className="text-brand-primary font-semibold"
              >
                {language === 'en' ? 'Lessons' : 'Уроки'}
              </Link>
              <Link
                href="/vocabulary"
                className="text-gray-600 hover:text-gray-900"
              >
                {language === 'en' ? 'Vocabulary' : 'Словарь'}
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Avatar fallback="U" size="md" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'en' ? 'All Lessons' : 'Все уроки'}
          </h1>
          <p className="text-gray-600">
            {language === 'en'
              ? 'Choose a lesson to continue your Polish learning journey'
              : 'Выберите урок, чтобы продолжить изучение польского'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Total Lessons' : 'Всего уроков'}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Completed' : 'Завершено'}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-brand-primary">
              {stats.inProgress}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'In Progress' : 'В процессе'}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-gray-400">
              {stats.locked}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Locked' : 'Заблокировано'}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Level Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === 'en' ? 'Filter by Level' : 'Фильтр по уровню'}
              </label>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedLevel === level
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-gray-300 hover:border-brand-primary'
                    }`}
                  >
                    {level === 'all'
                      ? language === 'en'
                        ? 'All Levels'
                        : 'Все уровни'
                      : level}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === 'en' ? 'Filter by Status' : 'Фильтр по статусу'}
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedStatus('all')}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedStatus === 'all'
                      ? 'border-brand-primary bg-brand-primary text-white'
                      : 'border-gray-300 hover:border-brand-primary'
                  }`}
                >
                  {language === 'en' ? 'All' : 'Все'}
                </button>
                <button
                  onClick={() => setSelectedStatus('not_started')}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedStatus === 'not_started'
                      ? 'border-brand-primary bg-brand-primary text-white'
                      : 'border-gray-300 hover:border-brand-primary'
                  }`}
                >
                  {language === 'en' ? 'Not Started' : 'Не начато'}
                </button>
                <button
                  onClick={() => setSelectedStatus('in_progress')}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedStatus === 'in_progress'
                      ? 'border-brand-primary bg-brand-primary text-white'
                      : 'border-gray-300 hover:border-brand-primary'
                  }`}
                >
                  {language === 'en' ? 'In Progress' : 'В процессе'}
                </button>
                <button
                  onClick={() => setSelectedStatus('completed')}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedStatus === 'completed'
                      ? 'border-brand-primary bg-brand-primary text-white'
                      : 'border-gray-300 hover:border-brand-primary'
                  }`}
                >
                  {language === 'en' ? 'Completed' : 'Завершено'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {language === 'en' ? 'Showing' : 'Показано'} {filteredLessons.length}{' '}
            {language === 'en' ? 'of' : 'из'} {lessons.length}{' '}
            {language === 'en' ? 'lessons' : 'уроков'}
          </p>
        </div>

        {/* Lesson Grid */}
        {filteredLessons.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {language === 'en'
                ? 'No lessons found matching your filters'
                : 'Не найдено уроков, соответствующих вашим фильтрам'}
            </p>
            <Button onClick={() => { setSelectedLevel('all'); setSelectedStatus('all'); }}>
              {language === 'en' ? 'Clear Filters' : 'Очистить фильтры'}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} language={language} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

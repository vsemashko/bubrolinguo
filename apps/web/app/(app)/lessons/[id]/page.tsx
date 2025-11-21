'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button, Card, Badge, Progress, Avatar } from '@/components/ui';
import { Lesson } from '@/types/lesson';
import { LessonPlayer, LessonComplete } from '@/components/lesson';
import { LessonResult } from '@/types/lesson';
import { isAuthenticated } from '@/lib/auth';

export default function LessonDetailPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [lessonResult, setLessonResult] = useState<LessonResult | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    loadLesson();
  }, [lessonId]);

  const loadLesson = async () => {
    // Mock data - matches the seed data structure
    const mockLesson: Lesson = {
      id: lessonId,
      lesson_number: 1,
      level: 'A1',
      unit_number: 1,
      order_in_unit: 1,
      title_en: 'Greetings and Basic Phrases',
      title_ru: 'Приветствия и основные фразы',
      description_en:
        'Learn how to greet people and use basic courtesy phrases in Polish.',
      description_ru:
        'Научитесь приветствовать людей и использовать основные вежливые фразы на польском.',
      exercises: [
        {
          id: 'ex1',
          type: 'multiple_choice',
          question_en: 'How do you say "hello" in Polish?',
          question_ru: 'Как сказать "привет" по-польски?',
          options: ['cześć', 'dziękuję', 'proszę', 'tak'],
          correct_answer: 'cześć',
          explanation_en:
            '"Cześć" is the most common informal greeting in Polish.',
          explanation_ru:
            '"Cześć" - самое распространённое неформальное приветствие в польском языке.',
        },
        {
          id: 'ex2',
          type: 'translation',
          prompt_en: 'Translate to Polish: Thank you',
          prompt_ru: 'Переведите на польский: Спасибо',
          correct_answer: 'dziękuję',
          accept_typos: true,
          hint_en: 'It starts with "dz"',
          hint_ru: 'Начинается с "dz"',
        },
        {
          id: 'ex3',
          type: 'fill_blank',
          sentence: '___, jak się masz?',
          sentence_en: '___, how are you?',
          sentence_ru: '___, как дела?',
          correct_answer: 'Cześć',
          options: ['Cześć', 'Dziękuję', 'Proszę'],
        },
      ],
      xp_reward: 10,
      estimated_duration: 15,
    };

    setLesson(mockLesson);
    setLanguage('en');
    setIsLoading(false);
  };

  const handleStartLesson = () => {
    setIsPlaying(true);
  };

  const handleLessonComplete = (result: LessonResult) => {
    setLessonResult(result);
    setIsPlaying(false);
  };

  const handleExitLesson = () => {
    setIsPlaying(false);
  };

  const handleContinueAfterComplete = () => {
    router.push('/lessons');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🦫</div>
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Lesson not found</p>
          <Link href="/lessons">
            <Button>Back to Lessons</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Show lesson complete screen
  if (lessonResult && !isPlaying) {
    return (
      <LessonComplete
        result={lessonResult}
        language={language}
        onContinue={handleContinueAfterComplete}
        onReview={() => {
          setLessonResult(null);
          setIsPlaying(true);
        }}
      />
    );
  }

  // Show lesson player
  if (isPlaying) {
    return (
      <LessonPlayer
        lesson={lesson}
        language={language}
        onComplete={handleLessonComplete}
        onExit={handleExitLesson}
      />
    );
  }

  // Show lesson detail page
  const title = language === 'en' ? lesson.title_en : lesson.title_ru;
  const description =
    language === 'en' ? lesson.description_en : lesson.description_ru;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Link
              href="/lessons"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="font-medium">
                {language === 'en' ? 'Back to Lessons' : 'Назад к урокам'}
              </span>
            </Link>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Avatar fallback="U" size="md" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge
              variant={
                lesson.level === 'A1' || lesson.level === 'A2'
                  ? 'success'
                  : lesson.level === 'B1' || lesson.level === 'B2'
                  ? 'warning'
                  : 'error'
              }
            >
              {lesson.level}
            </Badge>
            <span className="text-sm text-gray-500">
              {language === 'en' ? 'Lesson' : 'Урок'} {lesson.lesson_number}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600">{description}</p>
        </div>

        {/* Lesson Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-brand-primary mb-1">
              +{lesson.xp_reward}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'XP Reward' : 'Награда XP'}
            </div>
          </Card>

          <Card className="text-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {lesson.exercises.length}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Exercises' : 'Упражнений'}
            </div>
          </Card>

          <Card className="text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {lesson.estimated_duration}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Minutes' : 'Минут'}
            </div>
          </Card>
        </div>

        {/* What You'll Learn */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {language === 'en' ? "What You'll Learn" : 'Что вы изучите'}
          </h2>
          <div className="space-y-3">
            {lesson.target_words && lesson.target_words.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {language === 'en' ? 'Vocabulary' : 'Словарь'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {lesson.target_words.length}{' '}
                    {language === 'en' ? 'new words' : 'новых слов'}
                  </p>
                </div>
              </div>
            )}

            {lesson.grammar_topics && lesson.grammar_topics.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {language === 'en' ? 'Grammar' : 'Грамматика'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {lesson.grammar_topics.join(', ')}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {language === 'en' ? 'Practice' : 'Практика'}
                </p>
                <p className="text-sm text-gray-600">
                  {language === 'en'
                    ? 'Multiple exercise types including listening and speaking'
                    : 'Множество типов упражнений, включая аудирование и говорение'}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Start Button */}
        <div className="text-center">
          <Button onClick={handleStartLesson} size="lg" className="px-12">
            {language === 'en' ? 'Start Lesson' : 'Начать урок'}
          </Button>
        </div>
      </main>
    </div>
  );
}

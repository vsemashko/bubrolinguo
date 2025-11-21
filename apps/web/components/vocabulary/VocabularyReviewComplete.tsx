'use client';

import React from 'react';
import { ReviewResult } from '@/types/vocabulary';
import { Button, Card, Progress } from '@/components/ui';

interface VocabularyReviewCompleteProps {
  results: ReviewResult[];
  totalTime: number; // in seconds
  language: 'en' | 'ru';
  onContinue: () => void;
}

export const VocabularyReviewComplete: React.FC<
  VocabularyReviewCompleteProps
> = ({ results, totalTime, language, onContinue }) => {
  const totalWords = results.length;
  const correctWords = results.filter((r) => r.correct).length;
  const incorrectWords = totalWords - correctWords;
  const accuracy = totalWords > 0 ? (correctWords / totalWords) * 100 : 0;

  // Calculate average quality score
  const averageQuality =
    results.reduce((sum, r) => sum + r.quality, 0) / totalWords;

  // Count by quality
  const qualityCounts = {
    perfect: results.filter((r) => r.quality === 5).length,
    easy: results.filter((r) => r.quality === 4).length,
    good: results.filter((r) => r.quality === 3).length,
    hard: results.filter((r) => r.quality <= 2 && r.quality > 0).length,
    again: results.filter((r) => r.quality === 0).length,
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return language === 'en'
        ? `${mins}m ${secs}s`
        : `${mins}м ${secs}с`;
    }
    return language === 'en' ? `${secs}s` : `${secs}с`;
  };

  const getEncouragementMessage = () => {
    if (accuracy >= 90) {
      return language === 'en'
        ? 'Outstanding memory! 🌟'
        : 'Выдающаяся память! 🌟';
    } else if (accuracy >= 75) {
      return language === 'en'
        ? 'Great job! Keep it up! 🎉'
        : 'Отличная работа! Так держать! 🎉';
    } else if (accuracy >= 60) {
      return language === 'en'
        ? 'Good effort! Practice makes perfect 💪'
        : 'Хорошая попытка! Практика делает совершенным 💪';
    } else {
      return language === 'en'
        ? "Don't give up! You're building your vocabulary 🌱"
        : 'Не сдавайтесь! Вы пополняете свой словарный запас 🌱';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {language === 'en'
              ? 'Review Complete!'
              : 'Повторение завершено!'}
          </h1>
          <p className="text-xl text-gray-600">{getEncouragementMessage()}</p>
        </div>

        {/* Accuracy Score */}
        <Card className="mb-6">
          <div className="text-center py-6">
            <div className="text-6xl font-bold text-brand-primary mb-2">
              {Math.round(accuracy)}%
            </div>
            <p className="text-gray-600">
              {language === 'en' ? 'Accuracy' : 'Точность'}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <Progress value={accuracy} size="lg" color="success" />
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {totalWords}
            </div>
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Total Words' : 'Всего слов'}
            </p>
          </Card>

          <Card className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {correctWords}
            </div>
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Correct' : 'Правильно'}
            </p>
          </Card>

          <Card className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {incorrectWords}
            </div>
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Incorrect' : 'Неправильно'}
            </p>
          </Card>

          <Card className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {formatTime(totalTime)}
            </div>
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Time' : 'Время'}
            </p>
          </Card>
        </div>

        {/* Quality Breakdown */}
        <Card className="mb-6">
          <h3 className="font-bold text-lg text-gray-900 mb-4">
            {language === 'en'
              ? 'Quality Breakdown'
              : 'Разбивка по качеству'}
          </h3>
          <div className="space-y-3">
            {/* Perfect */}
            {qualityCounts.perfect > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Perfect' : 'Отлично'}
                  </span>
                </div>
                <span className="text-sm font-bold">
                  {qualityCounts.perfect}
                </span>
              </div>
            )}

            {/* Easy */}
            {qualityCounts.easy > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Easy' : 'Легко'}
                  </span>
                </div>
                <span className="text-sm font-bold">{qualityCounts.easy}</span>
              </div>
            )}

            {/* Good */}
            {qualityCounts.good > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Good' : 'Хорошо'}
                  </span>
                </div>
                <span className="text-sm font-bold">{qualityCounts.good}</span>
              </div>
            )}

            {/* Hard */}
            {qualityCounts.hard > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Hard' : 'Сложно'}
                  </span>
                </div>
                <span className="text-sm font-bold">{qualityCounts.hard}</span>
              </div>
            )}

            {/* Again */}
            {qualityCounts.again > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Again' : 'Снова'}
                  </span>
                </div>
                <span className="text-sm font-bold">
                  {qualityCounts.again}
                </span>
              </div>
            )}
          </div>
        </Card>

        {/* Next Review Info */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="text-3xl">📅</div>
            <div>
              <h4 className="font-bold text-blue-900 mb-1">
                {language === 'en' ? 'Spaced Repetition' : 'Интервальное повторение'}
              </h4>
              <p className="text-sm text-blue-800">
                {language === 'en'
                  ? 'Words you struggled with will appear sooner. Words you knew well will be spaced out further for optimal retention.'
                  : 'Слова, с которыми у вас были трудности, появятся раньше. Слова, которые вы знали хорошо, будут появляться реже для оптимального запоминания.'}
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={onContinue} className="w-full" size="lg">
            {language === 'en' ? 'Continue Learning' : 'Продолжить обучение'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VocabularyReviewComplete;

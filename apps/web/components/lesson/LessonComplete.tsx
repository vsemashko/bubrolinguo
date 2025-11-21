'use client';

import React from 'react';
import { LessonResult } from '@/types/lesson';
import { Button, Card, Progress, Badge } from '@/components/ui';

interface LessonCompleteProps {
  result: LessonResult;
  language: 'en' | 'ru';
  onContinue: () => void;
  onReview?: () => void;
}

export const LessonComplete: React.FC<LessonCompleteProps> = ({
  result,
  language,
  onContinue,
  onReview,
}) => {
  const { score, xp_earned, mistakes_count, time_spent, exercise_results } =
    result;

  const correctCount = exercise_results.filter((r) => r.correct).length;
  const totalExercises = exercise_results.length;
  const accuracy = Math.round((correctCount / totalExercises) * 100);

  const getScoreMessage = () => {
    if (score >= 90) {
      return language === 'en' ? 'Outstanding!' : 'Превосходно!';
    } else if (score >= 80) {
      return language === 'en' ? 'Great job!' : 'Отличная работа!';
    } else if (score >= 70) {
      return language === 'en' ? 'Good effort!' : 'Хорошая попытка!';
    } else {
      return language === 'en' ? 'Keep practicing!' : 'Продолжайте практиковаться!';
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-4 animate-bounce">
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
            {language === 'en' ? 'Lesson Complete!' : 'Урок завершен!'}
          </h1>
          <p className="text-xl text-gray-600">{getScoreMessage()}</p>
        </div>

        {/* Score Card */}
        <Card className="mb-6">
          <div className="text-center py-6">
            <div className="text-6xl font-bold text-brand-primary mb-2">
              {score}%
            </div>
            <p className="text-gray-600">
              {language === 'en' ? 'Your Score' : 'Ваш результат'}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <Progress value={score} size="lg" color="success" />
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="text-center">
            <div className="text-3xl font-bold text-brand-primary mb-1">
              +{xp_earned}
            </div>
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'XP Earned' : 'Получено XP'}
            </p>
          </Card>

          <Card className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {correctCount}/{totalExercises}
            </div>
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Correct' : 'Правильно'}
            </p>
          </Card>

          <Card className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {mistakes_count}
            </div>
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Mistakes' : 'Ошибки'}
            </p>
          </Card>

          <Card className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {formatTime(time_spent)}
            </div>
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Time' : 'Время'}
            </p>
          </Card>
        </div>

        {/* Achievements */}
        {score === 100 && (
          <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🏆</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {language === 'en' ? 'Perfect Score!' : 'Идеальный результат!'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'en'
                    ? 'You got every question right!'
                    : 'Вы ответили правильно на все вопросы!'}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Mistakes Summary */}
        {mistakes_count > 0 && (
          <Card className="mb-6">
            <h3 className="font-bold text-lg text-gray-900 mb-3">
              {language === 'en' ? 'Review Mistakes' : 'Просмотр ошибок'}
            </h3>
            <div className="space-y-3">
              {exercise_results
                .filter((r) => !r.correct)
                .map((result, index) => (
                  <div
                    key={index}
                    className="p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">✗</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">
                          {language === 'en' ? 'Your answer:' : 'Ваш ответ:'}{' '}
                          <span className="font-medium text-gray-900 line-through">
                            {result.user_answer}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          {language === 'en'
                            ? 'Correct answer:'
                            : 'Правильный ответ:'}{' '}
                          <span className="font-bold text-green-700">
                            {result.correct_answer}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={onContinue} className="w-full" size="lg">
            {language === 'en' ? 'Continue Learning' : 'Продолжить обучение'}
          </Button>

          {onReview && (
            <Button
              onClick={onReview}
              variant="outline"
              className="w-full"
              size="lg"
            >
              {language === 'en' ? 'Review Lesson' : 'Просмотреть урок'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonComplete;

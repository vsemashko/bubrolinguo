'use client';

import React, { useState } from 'react';
import { TranslationExercise } from '@/types/lesson';
import { Button, Card, Input } from '@/components/ui';

interface TranslationExerciseProps {
  exercise: TranslationExercise;
  language: 'en' | 'ru';
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

export const TranslationExerciseComponent: React.FC<
  TranslationExerciseProps
> = ({ exercise, language, onAnswer }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const prompt = language === 'en' ? exercise.prompt_en : exercise.prompt_ru;
  const hint = language === 'en' ? exercise.hint_en : exercise.hint_ru;

  const normalizeAnswer = (answer: string): string => {
    return answer
      .toLowerCase()
      .trim()
      .replace(/[.,!?;:]/g, '');
  };

  const checkAnswer = (answer: string): boolean => {
    const normalized = normalizeAnswer(answer);
    const correctNormalized = normalizeAnswer(exercise.correct_answer);

    if (normalized === correctNormalized) {
      return true;
    }

    // If accept_typos is true, check for similar answers (Levenshtein distance)
    if (exercise.accept_typos) {
      return levenshteinDistance(normalized, correctNormalized) <= 2;
    }

    return false;
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) {return;}

    const correct = checkAnswer(userAnswer);
    setIsCorrect(correct);
    setIsSubmitted(true);
    onAnswer(correct, userAnswer);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitted) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        {/* Prompt */}
        <h3 className="text-xl font-semibold text-gray-900 mb-6">{prompt}</h3>

        {/* Input */}
        <Input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            language === 'en' ? 'Type your answer...' : 'Введите ваш ответ...'
          }
          disabled={isSubmitted}
          className="text-lg"
          autoFocus
        />

        {/* Hint Button */}
        {hint && !isSubmitted && !showHint && (
          <button
            onClick={() => setShowHint(true)}
            className="mt-4 text-brand-primary hover:text-brand-primary/80 text-sm font-medium"
          >
            💡 {language === 'en' ? 'Show hint' : 'Показать подсказку'}
          </button>
        )}

        {/* Hint Display */}
        {showHint && hint && !isSubmitted && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>
                {language === 'en' ? 'Hint:' : 'Подсказка:'}
              </strong>{' '}
              {hint}
            </p>
          </div>
        )}

        {/* Submit Button */}
        {!isSubmitted && (
          <div className="mt-6">
            <Button
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className="w-full"
            >
              Check Answer
            </Button>
          </div>
        )}

        {/* Feedback */}
        {isSubmitted && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              isCorrect ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <h4
              className={`font-semibold text-lg mb-2 ${
                isCorrect ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {isCorrect
                ? language === 'en'
                  ? 'Excellent! 🎉'
                  : 'Отлично! 🎉'
                : language === 'en'
                ? 'Not quite right'
                : 'Неправильно'}
            </h4>
            {!isCorrect && (
              <div className="space-y-2">
                <p className="text-gray-700">
                  {language === 'en' ? 'Your answer: ' : 'Ваш ответ: '}
                  <span className="font-medium line-through">
                    {userAnswer}
                  </span>
                </p>
                <p className="text-gray-700">
                  {language === 'en'
                    ? 'Correct answer: '
                    : 'Правильный ответ: '}
                  <span className="font-bold text-green-700">
                    {exercise.correct_answer}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default TranslationExerciseComponent;

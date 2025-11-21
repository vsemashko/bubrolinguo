'use client';

import React, { useState } from 'react';
import { FillBlankExercise } from '@/types/lesson';
import { Button, Card, Input } from '@/components/ui';

interface FillBlankExerciseProps {
  exercise: FillBlankExercise;
  language: 'en' | 'ru';
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

export const FillBlankExerciseComponent: React.FC<FillBlankExerciseProps> = ({
  exercise,
  language,
  onAnswer,
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const translatedSentence =
    language === 'en' ? exercise.sentence_en : exercise.sentence_ru;
  const hint = language === 'en' ? exercise.hint_en : exercise.hint_ru;

  const normalizeAnswer = (answer: string): string => {
    return answer.toLowerCase().trim();
  };

  const checkAnswer = (answer: string): boolean => {
    return (
      normalizeAnswer(answer) === normalizeAnswer(exercise.correct_answer)
    );
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const correct = checkAnswer(userAnswer);
    setIsCorrect(correct);
    setIsSubmitted(true);
    onAnswer(correct, userAnswer);
  };

  const handleOptionClick = (option: string) => {
    if (!isSubmitted) {
      setUserAnswer(option);
    }
  };

  // Split sentence into parts around the blank
  const renderSentence = () => {
    const parts = exercise.sentence.split('___');

    return (
      <div className="flex flex-wrap items-center gap-2 text-xl">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <span>{part}</span>
            {index < parts.length - 1 && (
              <span
                className={`inline-block min-w-[120px] px-4 py-2 border-b-4 font-bold ${
                  isSubmitted
                    ? isCorrect
                      ? 'border-green-500 text-green-700'
                      : 'border-red-500 text-red-700'
                    : 'border-brand-primary text-brand-primary'
                }`}
              >
                {userAnswer || '___'}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        {/* Instructions */}
        <p className="text-sm text-gray-600 mb-4">
          {language === 'en'
            ? 'Fill in the blank with the correct word:'
            : 'Заполните пропуск правильным словом:'}
        </p>

        {/* Sentence with blank */}
        <div className="bg-gray-50 p-6 rounded-lg mb-4">{renderSentence()}</div>

        {/* Translation */}
        <p className="text-sm text-gray-600 italic mb-6">
          {translatedSentence}
        </p>

        {/* Options (if provided) */}
        {exercise.options && exercise.options.length > 0 && !isSubmitted && (
          <div className="space-y-2 mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">
              {language === 'en' ? 'Choose from:' : 'Выберите из:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {exercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    userAnswer === option
                      ? 'border-brand-primary bg-brand-primary text-white'
                      : 'border-gray-300 hover:border-brand-primary'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Input (if no options or as fallback) */}
        {(!exercise.options || exercise.options.length === 0) && (
          <Input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Type your answer...'
                : 'Введите ваш ответ...'
            }
            disabled={isSubmitted}
            className="mb-4"
            autoFocus
          />
        )}

        {/* Hint Button */}
        {hint && !isSubmitted && !showHint && (
          <button
            onClick={() => setShowHint(true)}
            className="mb-4 text-brand-primary hover:text-brand-primary/80 text-sm font-medium"
          >
            💡 {language === 'en' ? 'Show hint' : 'Показать подсказку'}
          </button>
        )}

        {/* Hint Display */}
        {showHint && hint && !isSubmitted && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
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
          <Button
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
            className="w-full"
          >
            Check Answer
          </Button>
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
                  ? 'Perfect! 🎉'
                  : 'Отлично! 🎉'
                : language === 'en'
                ? 'Not quite right'
                : 'Неправильно'}
            </h4>
            {!isCorrect && (
              <p className="text-gray-700">
                {language === 'en' ? 'Correct answer: ' : 'Правильный ответ: '}
                <span className="font-bold text-green-700">
                  {exercise.correct_answer}
                </span>
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default FillBlankExerciseComponent;

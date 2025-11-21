'use client';

import React, { useState } from 'react';
import { MultipleChoiceExercise } from '@/types/lesson';
import { Button, Card } from '@/components/ui';

interface MultipleChoiceExerciseProps {
  exercise: MultipleChoiceExercise;
  language: 'en' | 'ru';
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

export const MultipleChoiceExerciseComponent: React.FC<
  MultipleChoiceExerciseProps
> = ({ exercise, language, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const question =
    language === 'en' ? exercise.question_en : exercise.question_ru;
  const explanation =
    language === 'en' ? exercise.explanation_en : exercise.explanation_ru;

  const handleSubmit = () => {
    if (!selectedAnswer) {return;}

    const correct = selectedAnswer === exercise.correct_answer;
    setIsCorrect(correct);
    setIsSubmitted(true);
    onAnswer(correct, selectedAnswer);
  };

  const getOptionStyle = (option: string) => {
    if (!isSubmitted) {
      return selectedAnswer === option
        ? 'border-brand-primary bg-brand-primary/5'
        : 'border-gray-300 hover:border-brand-primary/50';
    }

    if (option === exercise.correct_answer) {
      return 'border-green-500 bg-green-50';
    }

    if (option === selectedAnswer && !isCorrect) {
      return 'border-red-500 bg-red-50';
    }

    return 'border-gray-300 opacity-50';
  };

  return (
    <div className="space-y-6">
      {/* Audio player if available */}
      {exercise.audio_url && (
        <div className="flex justify-center">
          <audio controls className="w-full max-w-md">
            <source src={exercise.audio_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* Question */}
      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {exercise.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !isSubmitted && setSelectedAnswer(option)}
              disabled={isSubmitted}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${getOptionStyle(
                option
              )} ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{option}</span>
                {isSubmitted && (
                  <>
                    {option === exercise.correct_answer && (
                      <span className="text-green-600 text-2xl">✓</span>
                    )}
                    {option === selectedAnswer && !isCorrect && (
                      <span className="text-red-600 text-2xl">✗</span>
                    )}
                  </>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <div className="mt-6">
            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
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
                  ? 'Correct! 🎉'
                  : 'Правильно! 🎉'
                : language === 'en'
                ? 'Not quite right'
                : 'Неправильно'}
            </h4>
            {explanation && (
              <p className="text-gray-700">{explanation}</p>
            )}
            {!isCorrect && (
              <p className="text-gray-700 mt-2">
                {language === 'en' ? 'Correct answer: ' : 'Правильный ответ: '}
                <strong>{exercise.correct_answer}</strong>
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default MultipleChoiceExerciseComponent;

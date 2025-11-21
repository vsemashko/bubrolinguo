'use client';

import React, { useState, useEffect } from 'react';
import {
  Lesson,
  Exercise,
  ExerciseResult,
  LessonResult,
} from '@/types/lesson';
import { Progress, Button, Card } from '@/components/ui';
import MultipleChoiceExerciseComponent from './MultipleChoiceExercise';
import TranslationExerciseComponent from './TranslationExercise';
import FillBlankExerciseComponent from './FillBlankExercise';

interface LessonPlayerProps {
  lesson: Lesson;
  language: 'en' | 'ru';
  onComplete: (result: LessonResult) => void;
  onExit: () => void;
}

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
  lesson,
  language,
  onComplete,
  onExit,
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseResults, setExerciseResults] = useState<ExerciseResult[]>([]);
  const [startTime] = useState(Date.now());
  const [exerciseStartTime, setExerciseStartTime] = useState(Date.now());
  const [canContinue, setCanContinue] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const progress = (currentExerciseIndex / lesson.exercises.length) * 100;
  const isLastExercise = currentExerciseIndex === lesson.exercises.length - 1;

  useEffect(() => {
    setExerciseStartTime(Date.now());
    setCanContinue(false);
  }, [currentExerciseIndex]);

  const handleAnswer = (isCorrect: boolean, userAnswer: string) => {
    const timeSpent = Math.floor((Date.now() - exerciseStartTime) / 1000);

    const result: ExerciseResult = {
      exercise_id: currentExercise.id,
      correct: isCorrect,
      user_answer: userAnswer,
      correct_answer:
        'correct_answer' in currentExercise
          ? currentExercise.correct_answer
          : '',
      time_spent: timeSpent,
    };

    setExerciseResults([...exerciseResults, result]);
    setCanContinue(true);
  };

  const handleContinue = () => {
    if (isLastExercise) {
      completeLesson();
    } else {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const completeLesson = () => {
    const totalTimeSpent = Math.floor((Date.now() - startTime) / 1000);
    const correctCount = exerciseResults.filter((r) => r.correct).length + 1; // +1 for current
    const totalExercises = lesson.exercises.length;
    const score = Math.round((correctCount / totalExercises) * 100);
    const mistakesCount = totalExercises - correctCount;

    const result: LessonResult = {
      lesson_id: lesson.id,
      score,
      xp_earned: calculateXP(score, lesson.xp_reward),
      mistakes_count: mistakesCount,
      time_spent: totalTimeSpent,
      exercise_results: exerciseResults,
      completed_at: new Date().toISOString(),
    };

    setIsComplete(true);
    onComplete(result);
  };

  const calculateXP = (score: number, baseXP: number): number => {
    // Full XP for 100%, reduced for lower scores
    if (score >= 90) return baseXP;
    if (score >= 80) return Math.floor(baseXP * 0.9);
    if (score >= 70) return Math.floor(baseXP * 0.8);
    return Math.floor(baseXP * 0.7);
  };

  const renderExercise = (exercise: Exercise) => {
    switch (exercise.type) {
      case 'multiple_choice':
        return (
          <MultipleChoiceExerciseComponent
            exercise={exercise}
            language={language}
            onAnswer={handleAnswer}
          />
        );
      case 'translation':
        return (
          <TranslationExerciseComponent
            exercise={exercise}
            language={language}
            onAnswer={handleAnswer}
          />
        );
      case 'fill_blank':
        return (
          <FillBlankExerciseComponent
            exercise={exercise}
            language={language}
            onAnswer={handleAnswer}
          />
        );
      default:
        return (
          <Card>
            <p className="text-gray-600">
              {language === 'en'
                ? 'This exercise type is not yet implemented.'
                : 'Этот тип упражнения еще не реализован.'}
            </p>
          </Card>
        );
    }
  };

  if (isComplete) {
    return null; // Parent component will handle completion UI
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onExit}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Exit lesson"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="text-sm text-gray-600">
              {language === 'en' ? 'Question' : 'Вопрос'}{' '}
              {currentExerciseIndex + 1} {language === 'en' ? 'of' : 'из'}{' '}
              {lesson.exercises.length}
            </div>
          </div>

          {/* Progress Bar */}
          <Progress value={progress} size="md" showLabel={false} />
        </div>

        {/* Exercise */}
        {renderExercise(currentExercise)}

        {/* Continue Button */}
        {canContinue && (
          <div className="mt-6">
            <Button onClick={handleContinue} className="w-full" size="lg">
              {isLastExercise
                ? language === 'en'
                  ? 'Complete Lesson'
                  : 'Завершить урок'
                : language === 'en'
                ? 'Continue'
                : 'Продолжить'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPlayer;

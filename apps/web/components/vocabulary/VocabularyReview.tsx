'use client';

import React, { useState, useEffect } from 'react';
import { VocabularyWithUserProgress, ReviewResult } from '@/types/vocabulary';
import { Button, Card, Progress } from '@/components/ui';
import VocabularyCard from './VocabularyCard';

interface VocabularyReviewProps {
  words: VocabularyWithUserProgress[];
  language: 'en' | 'ru';
  onComplete: (results: ReviewResult[]) => void;
  onExit: () => void;
}

export const VocabularyReview: React.FC<VocabularyReviewProps> = ({
  words,
  language,
  onComplete,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState<ReviewResult[]>([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [cardStartTime, setCardStartTime] = useState(Date.now());

  const currentWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;
  const isLastWord = currentIndex === words.length - 1;

  useEffect(() => {
    setCardStartTime(Date.now());
  }, [currentIndex]);

  const handleFlip = () => {
    if (!showAnswer) {
      setShowAnswer(true);
    }
  };

  const handleQualityRating = (quality: number) => {
    const timeSpent = Math.floor((Date.now() - cardStartTime) / 1000);
    const correct = quality >= 3; // Quality 3+ is considered correct

    const result: ReviewResult = {
      vocabularyId: currentWord.id,
      quality,
      timeSpent,
      correct,
    };

    setResults([...results, result]);

    // Move to next word or complete
    if (isLastWord) {
      completeReview([...results, result]);
    } else {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const completeReview = (finalResults: ReviewResult[]) => {
    onComplete(finalResults);
  };

  const getQualityLabel = (quality: number): string => {
    const labels: Record<number, { en: string; ru: string }> = {
      0: { en: 'Again', ru: 'Снова' },
      1: { en: 'Hard', ru: 'Сложно' },
      2: { en: 'Hard', ru: 'Сложно' },
      3: { en: 'Good', ru: 'Хорошо' },
      4: { en: 'Easy', ru: 'Легко' },
      5: { en: 'Perfect', ru: 'Отлично' },
    };
    return labels[quality][language];
  };

  const getQualityDescription = (quality: number): string => {
    const descriptions: Record<number, { en: string; ru: string }> = {
      0: {
        en: "Complete blackout, didn't remember",
        ru: 'Полностью забыл',
      },
      1: {
        en: 'Incorrect, but vaguely familiar',
        ru: 'Неправильно, но смутно знакомо',
      },
      2: {
        en: 'Incorrect, but remembered',
        ru: 'Неправильно, но вспомнил',
      },
      3: {
        en: 'Correct with difficulty',
        ru: 'Правильно, но с трудом',
      },
      4: {
        en: 'Correct with hesitation',
        ru: 'Правильно, с колебанием',
      },
      5: {
        en: 'Perfect recall, easy',
        ru: 'Идеально помню, легко',
      },
    };
    return descriptions[quality][language];
  };

  const getQualityButtonColor = (quality: number): string => {
    if (quality === 0 || quality === 1) {return 'bg-red-500 hover:bg-red-600';}
    if (quality === 2) {return 'bg-orange-500 hover:bg-orange-600';}
    if (quality === 3) {return 'bg-yellow-500 hover:bg-yellow-600';}
    if (quality === 4) {return 'bg-green-500 hover:bg-green-600';}
    return 'bg-emerald-500 hover:bg-emerald-600';
  };

  if (!currentWord) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onExit}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Exit review"
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
              {language === 'en' ? 'Word' : 'Слово'} {currentIndex + 1}{' '}
              {language === 'en' ? 'of' : 'из'} {words.length}
            </div>
          </div>

          {/* Progress Bar */}
          <Progress value={progress} size="md" showLabel={false} />
        </div>

        {/* Vocabulary Card */}
        <div className="mb-6">
          <VocabularyCard
            vocabulary={currentWord}
            language={language}
            showAnswer={showAnswer}
            onFlip={handleFlip}
          />
        </div>

        {/* Action Buttons */}
        {!showAnswer ? (
          <Button onClick={handleFlip} className="w-full" size="lg">
            {language === 'en' ? 'Show Answer' : 'Показать ответ'}
          </Button>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-sm font-medium text-gray-700 mb-4">
              {language === 'en'
                ? 'How well did you remember this word?'
                : 'Насколько хорошо вы помните это слово?'}
            </p>

            {/* Quality Rating Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {/* Again / Hard */}
              <button
                onClick={() => handleQualityRating(0)}
                className={`${getQualityButtonColor(
                  0
                )} text-white p-4 rounded-lg transition-all hover:scale-105`}
              >
                <div className="font-bold text-lg mb-1">
                  {getQualityLabel(0)}
                </div>
                <div className="text-xs opacity-90">
                  {getQualityDescription(0)}
                </div>
              </button>

              <button
                onClick={() => handleQualityRating(2)}
                className={`${getQualityButtonColor(
                  2
                )} text-white p-4 rounded-lg transition-all hover:scale-105`}
              >
                <div className="font-bold text-lg mb-1">
                  {getQualityLabel(2)}
                </div>
                <div className="text-xs opacity-90">
                  {getQualityDescription(2)}
                </div>
              </button>

              {/* Good / Easy */}
              <button
                onClick={() => handleQualityRating(3)}
                className={`${getQualityButtonColor(
                  3
                )} text-white p-4 rounded-lg transition-all hover:scale-105`}
              >
                <div className="font-bold text-lg mb-1">
                  {getQualityLabel(3)}
                </div>
                <div className="text-xs opacity-90">
                  {getQualityDescription(3)}
                </div>
              </button>

              <button
                onClick={() => handleQualityRating(5)}
                className={`${getQualityButtonColor(
                  5
                )} text-white p-4 rounded-lg transition-all hover:scale-105`}
              >
                <div className="font-bold text-lg mb-1">
                  {getQualityLabel(5)}
                </div>
                <div className="text-xs opacity-90">
                  {getQualityDescription(5)}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-6">
          <Card className="bg-gray-50">
            <div className="grid grid-cols-3 divide-x divide-gray-200 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {results.length}
                </div>
                <div className="text-xs text-gray-600">
                  {language === 'en' ? 'Reviewed' : 'Повторено'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {results.filter((r) => r.correct).length}
                </div>
                <div className="text-xs text-gray-600">
                  {language === 'en' ? 'Correct' : 'Правильно'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {words.length - currentIndex - 1}
                </div>
                <div className="text-xs text-gray-600">
                  {language === 'en' ? 'Remaining' : 'Осталось'}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VocabularyReview;

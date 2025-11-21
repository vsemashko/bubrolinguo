'use client';

import React, { useState, useEffect } from 'react';
import { MatchingExercise } from '@/types/lesson';
import { Button, Card } from '@/components/ui';

interface MatchingExerciseProps {
  exercise: MatchingExercise;
  language: 'en' | 'ru';
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

interface Match {
  polish: string;
  translation: string;
}

export const MatchingExerciseComponent: React.FC<MatchingExerciseProps> = ({
  exercise,
  language,
  onAnswer,
}) => {
  const [polishItems, setPolishItems] = useState<string[]>([]);
  const [translationItems, setTranslationItems] = useState<string[]>([]);
  const [matches, setMatches] = useState<Map<string, string>>(new Map());
  const [selectedPolish, setSelectedPolish] = useState<string | null>(null);
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(
    null
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctMatches, setCorrectMatches] = useState<Set<string>>(new Set());

  const instruction =
    language === 'en' ? exercise.instruction_en : exercise.instruction_ru;

  useEffect(() => {
    // Shuffle items for randomization
    const shuffledPolish = [...exercise.pairs.map((p) => p.polish)].sort(
      () => Math.random() - 0.5
    );
    const shuffledTranslations = [
      ...exercise.pairs.map((p) => p.translation),
    ].sort(() => Math.random() - 0.5);

    setPolishItems(shuffledPolish);
    setTranslationItems(shuffledTranslations);
  }, [exercise]);

  const handlePolishClick = (polish: string) => {
    if (isSubmitted || matches.has(polish)) return;

    setSelectedPolish(polish);

    // If translation already selected, create match
    if (selectedTranslation) {
      createMatch(polish, selectedTranslation);
    }
  };

  const handleTranslationClick = (translation: string) => {
    if (isSubmitted) return;

    // Check if this translation is already matched
    const isMatched = Array.from(matches.values()).includes(translation);
    if (isMatched) {
      // Remove existing match
      const polishKey = Array.from(matches.entries()).find(
        ([_, t]) => t === translation
      )?.[0];
      if (polishKey) {
        const newMatches = new Map(matches);
        newMatches.delete(polishKey);
        setMatches(newMatches);
      }
      setSelectedTranslation(translation);
      return;
    }

    setSelectedTranslation(translation);

    // If polish already selected, create match
    if (selectedPolish && !matches.has(selectedPolish)) {
      createMatch(selectedPolish, translation);
    }
  };

  const createMatch = (polish: string, translation: string) => {
    const newMatches = new Map(matches);
    newMatches.set(polish, translation);
    setMatches(newMatches);
    setSelectedPolish(null);
    setSelectedTranslation(null);
  };

  const handleSubmit = () => {
    // Check all matches
    const correct = new Set<string>();
    matches.forEach((translation, polish) => {
      const correctPair = exercise.pairs.find(
        (p) => p.polish === polish && p.translation === translation
      );
      if (correctPair) {
        correct.add(polish);
      }
    });

    setCorrectMatches(correct);
    setIsSubmitted(true);

    const allCorrect = correct.size === exercise.pairs.length;
    onAnswer(allCorrect, JSON.stringify(Array.from(matches.entries())));
  };

  const getPolishItemStyle = (polish: string) => {
    const isSelected = selectedPolish === polish;
    const isMatched = matches.has(polish);

    if (isSubmitted) {
      if (isMatched && correctMatches.has(polish)) {
        return 'border-green-500 bg-green-50';
      }
      if (isMatched && !correctMatches.has(polish)) {
        return 'border-red-500 bg-red-50';
      }
      return 'border-gray-300 opacity-50';
    }

    if (isMatched) {
      return 'border-brand-primary bg-brand-primary/5 cursor-default';
    }

    if (isSelected) {
      return 'border-brand-primary bg-brand-primary/10 ring-2 ring-brand-primary';
    }

    return 'border-gray-300 hover:border-brand-primary cursor-pointer';
  };

  const getTranslationItemStyle = (translation: string) => {
    const isSelected = selectedTranslation === translation;
    const isMatched = Array.from(matches.values()).includes(translation);

    if (isSubmitted) {
      // Find if this translation is correctly matched
      const matchEntry = Array.from(matches.entries()).find(
        ([_, t]) => t === translation
      );
      if (matchEntry && correctMatches.has(matchEntry[0])) {
        return 'border-green-500 bg-green-50';
      }
      if (matchEntry && !correctMatches.has(matchEntry[0])) {
        return 'border-red-500 bg-red-50';
      }
      return 'border-gray-300 opacity-50';
    }

    if (isMatched) {
      return 'border-brand-primary bg-brand-primary/5 cursor-pointer';
    }

    if (isSelected) {
      return 'border-brand-primary bg-brand-primary/10 ring-2 ring-brand-primary';
    }

    return 'border-gray-300 hover:border-brand-primary cursor-pointer';
  };

  const allMatched = matches.size === exercise.pairs.length;

  return (
    <div className="space-y-6">
      <Card>
        {/* Instructions */}
        <div className="mb-6">
          <p className="text-lg text-gray-700 mb-4">{instruction}</p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {language === 'en'
              ? 'Click on a Polish word, then click on its translation'
              : 'Нажмите на польское слово, затем нажмите на его перевод'}
          </div>
        </div>

        {/* Matching Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Polish Column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 mb-3">
              {language === 'en' ? 'Polish' : 'Польский'}
            </h4>
            {polishItems.map((polish, index) => (
              <div
                key={index}
                onClick={() => handlePolishClick(polish)}
                className={`p-4 rounded-lg border-2 transition-all ${getPolishItemStyle(
                  polish
                )}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">{polish}</span>
                  {isSubmitted && matches.has(polish) && (
                    <span className="text-xl">
                      {correctMatches.has(polish) ? '✓' : '✗'}
                    </span>
                  )}
                  {!isSubmitted && matches.has(polish) && (
                    <span className="text-brand-primary">✓</span>
                  )}
                </div>
                {matches.has(polish) && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <span className="text-sm text-gray-600">
                      → {matches.get(polish)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Translation Column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 mb-3">
              {language === 'en' ? 'Translation' : 'Перевод'}
            </h4>
            {translationItems.map((translation, index) => {
              const isMatched = Array.from(matches.values()).includes(
                translation
              );
              return (
                <div
                  key={index}
                  onClick={() => handleTranslationClick(translation)}
                  className={`p-4 rounded-lg border-2 transition-all ${getTranslationItemStyle(
                    translation
                  )}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg">{translation}</span>
                    {isSubmitted && isMatched && (
                      <span className="text-xl">
                        {(() => {
                          const matchEntry = Array.from(matches.entries()).find(
                            ([_, t]) => t === translation
                          );
                          return matchEntry && correctMatches.has(matchEntry[0])
                            ? '✓'
                            : '✗';
                        })()}
                      </span>
                    )}
                    {!isSubmitted && isMatched && (
                      <span className="text-brand-primary">✓</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress */}
        {!isSubmitted && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                {language === 'en' ? 'Matched:' : 'Совпадений:'}
              </span>
              <span className="text-sm font-semibold">
                {matches.size} / {exercise.pairs.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 bg-brand-primary rounded-full transition-all"
                style={{
                  width: `${(matches.size / exercise.pairs.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        {!isSubmitted && (
          <div className="mt-6">
            <Button onClick={handleSubmit} disabled={!allMatched} className="w-full">
              Check Answers
            </Button>
          </div>
        )}

        {/* Feedback */}
        {isSubmitted && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              correctMatches.size === exercise.pairs.length
                ? 'bg-green-50'
                : 'bg-orange-50'
            }`}
          >
            <h4
              className={`font-semibold text-lg mb-2 ${
                correctMatches.size === exercise.pairs.length
                  ? 'text-green-800'
                  : 'text-orange-800'
              }`}
            >
              {correctMatches.size === exercise.pairs.length
                ? language === 'en'
                  ? 'Perfect matching! 🎉'
                  : 'Идеальное совпадение! 🎉'
                : language === 'en'
                ? 'Good effort! Review the mistakes'
                : 'Хорошая попытка! Просмотрите ошибки'}
            </h4>
            <p className="text-sm text-gray-700">
              {language === 'en' ? 'Correct matches:' : 'Правильных совпадений:'}{' '}
              {correctMatches.size} / {exercise.pairs.length}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MatchingExerciseComponent;

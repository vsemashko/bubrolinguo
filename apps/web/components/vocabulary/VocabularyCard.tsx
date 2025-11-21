'use client';

import React, { useState, useRef } from 'react';
import { VocabularyWithUserProgress } from '@/types/vocabulary';
import { Card, Badge } from '@/components/ui';

interface VocabularyCardProps {
  vocabulary: VocabularyWithUserProgress;
  language: 'en' | 'ru';
  showAnswer: boolean;
  onFlip?: () => void;
  onAudioPlay?: () => void;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  vocabulary,
  language,
  showAnswer,
  onFlip,
  onAudioPlay,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const translation =
    language === 'en'
      ? vocabulary.translationEn
      : vocabulary.translationRu;

  const exampleSentence =
    language === 'en'
      ? vocabulary.exampleSentenceEn
      : vocabulary.exampleSentenceRu;

  const mnemonic =
    language === 'en' ? vocabulary.mnemonicEn : vocabulary.mnemonicRu;

  const handlePlayAudio = () => {
    if (vocabulary.audioUrl && audioRef.current) {
      audioRef.current.play();
      setIsPlayingAudio(true);
      onAudioPlay?.();
    }
  };

  const handleAudioEnded = () => {
    setIsPlayingAudio(false);
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      A1: 'success',
      A2: 'success',
      B1: 'warning',
      B2: 'warning',
      C1: 'error',
    };
    return colors[level] || 'default';
  };

  const getStatusColor = (status?: string) => {
    const colors: Record<string, string> = {
      new: 'info',
      learning: 'warning',
      mastered: 'success',
      relearning: 'error',
    };
    return colors[status || 'new'] || 'default';
  };

  return (
    <Card
      className="relative overflow-hidden cursor-pointer select-none"
      onClick={onFlip}
    >
      {/* Audio Element */}
      {vocabulary.audioUrl && (
        <audio
          ref={audioRef}
          src={vocabulary.audioUrl}
          onEnded={handleAudioEnded}
        />
      )}

      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        <Badge variant={getLevelColor(vocabulary.level)} size="sm">
          {vocabulary.level}
        </Badge>
        <Badge variant="default" size="sm">
          {vocabulary.partOfSpeech}
        </Badge>
        {vocabulary.gender && (
          <Badge variant="default" size="sm">
            {vocabulary.gender}
          </Badge>
        )}
        {vocabulary.userProgress && (
          <Badge
            variant={getStatusColor(vocabulary.userProgress.status)}
            size="sm"
          >
            {vocabulary.userProgress.status}
          </Badge>
        )}
      </div>

      {/* Front Side - Polish Word */}
      {!showAnswer && (
        <div className="text-center py-8">
          {/* Image */}
          {vocabulary.imageUrl && (
            <div className="mb-6">
              <img
                src={vocabulary.imageUrl}
                alt={vocabulary.polishWord}
                className="w-48 h-48 object-cover rounded-lg mx-auto"
              />
            </div>
          )}

          {/* Polish Word */}
          <h2 className="text-5xl font-bold text-brand-primary mb-4">
            {vocabulary.polishWord}
          </h2>

          {/* IPA Pronunciation */}
          {vocabulary.pronunciationIpa && (
            <p className="text-xl text-gray-600 mb-4">
              [{vocabulary.pronunciationIpa}]
            </p>
          )}

          {/* Audio Button */}
          {vocabulary.audioUrl && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlayAudio();
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                isPlayingAudio
                  ? 'bg-brand-primary/20 text-brand-primary'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } transition-colors`}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {isPlayingAudio ? (
                  <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                ) : (
                  <path d="M8 5v14l11-7z" />
                )}
              </svg>
              {language === 'en' ? 'Listen' : 'Слушать'}
            </button>
          )}

          {/* Hint */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {language === 'en'
                ? 'Click to reveal translation'
                : 'Нажмите, чтобы показать перевод'}
            </p>
          </div>
        </div>
      )}

      {/* Back Side - Translation and Details */}
      {showAnswer && (
        <div className="py-6 space-y-6">
          {/* Translation */}
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-primary mb-2">
              {vocabulary.polishWord}
            </div>
            <div className="text-2xl text-gray-900">{translation}</div>
          </div>

          {/* Example Sentence */}
          {vocabulary.exampleSentencePl && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                {language === 'en' ? 'Example:' : 'Пример:'}
              </h4>
              <p className="text-lg text-gray-900 mb-2">
                {vocabulary.exampleSentencePl}
              </p>
              {exampleSentence && (
                <p className="text-sm text-gray-600 italic">
                  {exampleSentence}
                </p>
              )}
            </div>
          )}

          {/* Mnemonic */}
          {mnemonic && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">
                💡 {language === 'en' ? 'Memory Tip:' : 'Подсказка:'}
              </h4>
              <p className="text-sm text-blue-800">{mnemonic}</p>
            </div>
          )}

          {/* User Progress */}
          {vocabulary.userProgress && (
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-brand-primary">
                  {vocabulary.userProgress.timesReviewed}
                </div>
                <div className="text-xs text-gray-600">
                  {language === 'en' ? 'Reviews' : 'Повторений'}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(
                    (vocabulary.userProgress.timesCorrect /
                      Math.max(vocabulary.userProgress.timesReviewed, 1)) *
                      100
                  )}
                  %
                </div>
                <div className="text-xs text-gray-600">
                  {language === 'en' ? 'Accuracy' : 'Точность'}
                </div>
              </div>
            </div>
          )}

          {/* Click to Continue */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {language === 'en'
                ? 'Rate your recall below'
                : 'Оцените, насколько хорошо вы помните'}
            </p>
          </div>
        </div>
      )}

      {/* Flip Indicator */}
      <div className="absolute bottom-4 right-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <svg
            className={`w-6 h-6 text-gray-600 transition-transform ${
              showAnswer ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
      </div>
    </Card>
  );
};

export default VocabularyCard;

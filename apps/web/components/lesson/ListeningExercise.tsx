'use client';

import React, { useState, useRef } from 'react';
import { ListeningExercise } from '@/types/lesson';
import { Button, Card } from '@/components/ui';

interface ListeningExerciseProps {
  exercise: ListeningExercise;
  language: 'en' | 'ru';
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

export const ListeningExerciseComponent: React.FC<ListeningExerciseProps> = ({
  exercise,
  language,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const question =
    language === 'en' ? exercise.question_en : exercise.question_ru;

  const handleAudioPlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayCount(playCount + 1);
    }
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

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
      <Card>
        {/* Instructions */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/10 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-brand-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.414a2 2 0 001.414.586h2.172a2 2 0 001.414-.586l.828-.828a2 2 0 00.586-1.414V11m-6 4.172V9.828a2 2 0 01.586-1.414l.828-.828A2 2 0 018.828 7h2.172a2 2 0 011.414.586l.828.828a2 2 0 01.586 1.414v4.344a2 2 0 01-.586 1.414l-.828.828z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            {language === 'en'
              ? 'Listen to the audio and answer the question'
              : 'Прослушайте аудио и ответьте на вопрос'}
          </p>
        </div>

        {/* Audio Player */}
        <div className="mb-6">
          <audio
            ref={audioRef}
            src={exercise.audio_url}
            className="hidden"
            onEnded={() => {}}
          />

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleAudioPlay}
              className="w-20 h-20 flex items-center justify-center bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full shadow-lg transition-all hover:scale-105"
              aria-label="Play audio"
            >
              <svg
                className="w-10 h-10 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Played' : 'Воспроизведено'}: {playCount}{' '}
              {language === 'en' ? 'time(s)' : 'раз(а)'}
            </p>
          </div>
        </div>

        {/* Question */}
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          {question}
        </h3>

        {/* Options (if provided) */}
        {exercise.options && exercise.options.length > 0 && (
          <div className="space-y-3 mb-6">
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
        )}

        {/* Transcript Button */}
        {exercise.transcript && isSubmitted && !showTranscript && (
          <button
            onClick={() => setShowTranscript(true)}
            className="mb-4 text-brand-primary hover:text-brand-primary/80 text-sm font-medium"
          >
            📝 {language === 'en' ? 'Show transcript' : 'Показать транскрипт'}
          </button>
        )}

        {/* Transcript Display */}
        {showTranscript && exercise.transcript && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-sm text-blue-900 mb-2">
              {language === 'en' ? 'Transcript:' : 'Транскрипт:'}
            </h4>
            <p className="text-gray-700 italic">{exercise.transcript}</p>
          </div>
        )}

        {/* Submit Button */}
        {!isSubmitted && (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
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
                  ? 'Great listening! 🎉'
                  : 'Отличный слух! 🎉'
                : language === 'en'
                ? 'Not quite right'
                : 'Неправильно'}
            </h4>
            {!isCorrect && (
              <p className="text-gray-700">
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

export default ListeningExerciseComponent;

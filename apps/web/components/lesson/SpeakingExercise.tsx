'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SpeakingExercise } from '@/types/lesson';
import { Button, Card } from '@/components/ui';

interface SpeakingExerciseProps {
  exercise: SpeakingExercise;
  language: 'en' | 'ru';
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

export const SpeakingExerciseComponent: React.FC<SpeakingExerciseProps> = ({
  exercise,
  language,
  onAnswer,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [similarityScore, setSimilarityScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recognitionRef = useRef<any>(null);

  const prompt = language === 'en' ? exercise.prompt_en : exercise.prompt_ru;
  const minSimilarity = exercise.min_similarity || 0.7;

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'pl-PL';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserTranscript(transcript);
        checkPronunciation(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        setError(
          language === 'en'
            ? 'Speech recognition error. Please try again.'
            : 'Ошибка распознавания речи. Попробуйте еще раз.'
        );
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
        }
      };

      mediaRecorderRef.current.start();

      if (recognitionRef.current) {
        recognitionRef.current.start();
      }

      setIsRecording(true);
      setHasRecorded(true);
    } catch (_err) {
      setError(
        language === 'en'
          ? 'Microphone access denied. Please allow microphone access.'
          : 'Доступ к микрофону запрещен. Пожалуйста, разрешите доступ к микрофону.'
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setIsRecording(false);
  };

  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[.,!?;:]/g, '')
      .replace(/\s+/g, ' ');
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) {return 1.0;}

    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
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

  const checkPronunciation = (transcript: string) => {
    const normalizedTranscript = normalizeText(transcript);
    const normalizedTarget = normalizeText(exercise.target_phrase);

    const similarity = calculateSimilarity(normalizedTranscript, normalizedTarget);
    setSimilarityScore(similarity);

    const correct = similarity >= minSimilarity;
    setIsCorrect(correct);
    setIsSubmitted(true);
    onAnswer(correct, transcript);
  };

  const playReferenceAudio = () => {
    if (exercise.audio_url) {
      const audio = new Audio(exercise.audio_url);
      audio.play();
    }
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
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            {language === 'en'
              ? 'Say the phrase out loud'
              : 'Произнесите фразу вслух'}
          </p>
        </div>

        {/* Prompt */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">{prompt}</p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-3xl font-bold text-center text-brand-primary">
              {exercise.target_phrase}
            </p>
          </div>
        </div>

        {/* Reference Audio */}
        {exercise.audio_url && !isSubmitted && (
          <div className="mb-6 text-center">
            <button
              onClick={playReferenceAudio}
              className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 text-sm font-medium"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              {language === 'en' ? 'Listen to example' : 'Послушать пример'}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Recording Controls */}
        {!isSubmitted && (
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-24 h-24 flex items-center justify-center rounded-full shadow-lg transition-all ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                  : 'bg-brand-primary hover:bg-brand-primary/90 hover:scale-105'
              } text-white`}
              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isRecording ? (
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" />
                </svg>
              ) : (
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </svg>
              )}
            </button>

            <p className="text-sm font-medium text-gray-700">
              {isRecording
                ? language === 'en'
                  ? 'Recording... Click to stop'
                  : 'Запись... Нажмите чтобы остановить'
                : language === 'en'
                ? 'Click to record'
                : 'Нажмите для записи'}
            </p>
          </div>
        )}

        {/* User's Recording Playback */}
        {hasRecorded && !isSubmitted && (
          <div className="mt-4">
            <audio ref={audioRef} controls className="w-full" />
          </div>
        )}

        {/* Feedback */}
        {isSubmitted && (
          <div
            className={`p-4 rounded-lg ${
              isCorrect ? 'bg-green-50' : 'bg-orange-50'
            }`}
          >
            <h4
              className={`font-semibold text-lg mb-2 ${
                isCorrect ? 'text-green-800' : 'text-orange-800'
              }`}
            >
              {isCorrect
                ? language === 'en'
                  ? 'Excellent pronunciation! 🎉'
                  : 'Отличное произношение! 🎉'
                : language === 'en'
                ? 'Good effort! Keep practicing'
                : 'Хорошая попытка! Продолжайте практиковаться'}
            </h4>

            {/* Similarity Score */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">
                  {language === 'en' ? 'Accuracy:' : 'Точность:'}
                </span>
                <span className="text-sm font-semibold">
                  {Math.round(similarityScore * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    similarityScore >= minSimilarity
                      ? 'bg-green-500'
                      : 'bg-orange-500'
                  }`}
                  style={{ width: `${similarityScore * 100}%` }}
                />
              </div>
            </div>

            {userTranscript && (
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  {language === 'en' ? 'You said:' : 'Вы сказали:'}{' '}
                  <span className="font-medium text-gray-900">
                    "{userTranscript}"
                  </span>
                </p>
                <p className="text-gray-600">
                  {language === 'en' ? 'Target:' : 'Целевая фраза:'}{' '}
                  <span className="font-medium text-green-700">
                    "{exercise.target_phrase}"
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

export default SpeakingExerciseComponent;

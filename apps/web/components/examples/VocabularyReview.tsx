/**
 * Example: Vocabulary Review Component
 *
 * Demonstrates how to:
 * - Fetch vocabulary review queue
 * - Implement spaced repetition flow
 * - Submit review results
 * - Show flashcard interface
 * - Display statistics
 *
 * Works seamlessly with both mock and real API data.
 */

'use client';

import { useEffect, useState } from 'react';
import {
  getReviewQueue,
  submitReviewResult,
  getVocabularyStats,
} from '@/services/vocabulary.service';
import type { VocabularyWithUserProgress, VocabularyStats } from '@/types/vocabulary';

export function VocabularyReview() {
  const [words, setWords] = useState<VocabularyWithUserProgress[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<VocabularyStats | null>(null);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0,
  });

  useEffect(() => {
    async function loadReview() {
      try {
        setLoading(true);

        // Load review queue
        const reviewResponse = await getReviewQueue(10);
        if (reviewResponse.success && reviewResponse.data) {
          setWords(reviewResponse.data.reviewQueue);
        }

        // Load statistics
        const statsResponse = await getVocabularyStats();
        if (statsResponse.success && statsResponse.data) {
          setStats(statsResponse.data.stats);
        }
      } catch (error) {
        console.error('Failed to load review:', error);
      } finally {
        setLoading(false);
      }
    }

    loadReview();
  }, []);

  async function handleAnswer(correct: boolean) {
    const word = words[currentIndex];
    if (!word) return;

    try {
      // Submit review result
      await submitReviewResult(word.id, {
        correct,
        timeSpent: 5, // In real app, track actual time
      });

      // Update session stats
      setSessionStats((prev) => ({
        correct: prev.correct + (correct ? 1 : 0),
        incorrect: prev.incorrect + (correct ? 0 : 1),
        total: prev.total + 1,
      }));

      // Move to next word
      setShowAnswer(false);
      setCurrentIndex((i) => i + 1);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vocabulary...</p>
        </div>
      </div>
    );
  }

  // Review complete
  if (currentIndex >= words.length) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Review Complete! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Great job! You've completed your vocabulary review.
          </p>

          {/* Session Statistics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">
                {sessionStats.total}
              </div>
              <div className="text-sm text-gray-600">Total Reviewed</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">
                {sessionStats.correct}
              </div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">
                {sessionStats.incorrect}
              </div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {sessionStats.total > 0
                ? Math.round((sessionStats.correct / sessionStats.total) * 100)
                : 0}
              %
            </div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Review More Words
          </button>
        </div>
      </div>
    );
  }

  const word = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with Stats */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Vocabulary Review
          </h1>
          <div className="text-sm text-gray-600">
            {currentIndex + 1} / {words.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Stats Summary */}
        {stats && (
          <div className="mt-4 flex gap-4 text-sm text-gray-600">
            <span>📚 Total: {stats.totalWords}</span>
            <span>✅ Mastered: {stats.masteredWords}</span>
            <span>📖 Learning: {stats.learningWords}</span>
            <span>🔥 Streak: {stats.currentStreak} days</span>
          </div>
        )}
      </div>

      {/* Flashcard */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 min-h-[400px] flex flex-col justify-center items-center mb-6">
        {/* Front (Polish word) */}
        <div className="text-center mb-8">
          <div className="text-sm text-gray-500 mb-2">Polish</div>
          <div className="text-5xl font-bold text-gray-900 mb-4">
            {word.polishWord}
          </div>
          {word.pronunciationIpa && (
            <div className="text-lg text-gray-600 mb-2">
              /{word.pronunciationIpa}/
            </div>
          )}
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {word.level} • {word.partOfSpeech}
          </div>
        </div>

        {/* Back (Translation) */}
        {showAnswer && (
          <div className="w-full border-t border-gray-200 pt-8 text-center animate-fade-in">
            <div className="text-sm text-gray-500 mb-2">English</div>
            <div className="text-3xl font-semibold text-gray-900 mb-4">
              {word.translationEn}
            </div>

            {word.exampleSentencePl && (
              <div className="mt-6 max-w-lg mx-auto">
                <div className="text-sm text-gray-500 mb-2">Example</div>
                <div className="text-gray-700 mb-2">{word.exampleSentencePl}</div>
                <div className="text-gray-600 italic text-sm">
                  {word.exampleSentenceEn}
                </div>
              </div>
            )}

            {/* User Progress */}
            {word.userProgress && (
              <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600">Reviewed</div>
                  <div className="text-lg font-semibold">
                    {word.userProgress.timesReviewed}x
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600">Correct</div>
                  <div className="text-lg font-semibold text-green-600">
                    {word.userProgress.timesCorrect}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600">Status</div>
                  <div className="text-lg font-semibold text-blue-600 capitalize">
                    {word.userProgress.status}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="flex-1 py-4 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Show Answer
          </button>
        ) : (
          <>
            <button
              onClick={() => handleAnswer(false)}
              className="flex-1 py-4 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors"
            >
              ❌ Incorrect
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="flex-1 py-4 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors"
            >
              ✅ Correct
            </button>
          </>
        )}
      </div>

      {/* Session Progress */}
      <div className="mt-6 text-center text-sm text-gray-600">
        Session: {sessionStats.correct} correct, {sessionStats.incorrect}{' '}
        incorrect
      </div>
    </div>
  );
}

export default VocabularyReview;

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getExamResults, ExamResults } from '@/services/exam.service';
import { useToast } from '@/components/ui/ToastContainer';

export default function ExamResultsPage() {
  const router = useRouter();
  const params = useParams();
  const showToast = useToast();

  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const examId = params.id as string;
  const attemptId = params.attemptId as string;

  useEffect(() => {
    if (attemptId) {
      loadResults();
    }
  }, [attemptId]);

  const loadResults = async () => {
    try {
      setLoading(true);
      const response = await getExamResults(parseInt(attemptId));

      if (response.success && response.data) {
        setResults(response.data.results);
      } else {
        throw new Error(response.error?.message || 'Failed to load results');
      }
    } catch (error: any) {
      console.error('Failed to load results:', error);
      showToast(error.message || 'Failed to load results', 'error');
      router.push('/exams');
    } finally {
      setLoading(false);
    }
  };

  const getSectionIcon = (sectionType: string) => {
    const icons: Record<string, string> = {
      reading: '📖',
      writing: '✍️',
      listening: '🎧',
      speaking: '🗣️',
    };
    return icons[sectionType] || '📝';
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  const passed = results.passed;
  const percentageScore = results.percentage_score;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            {passed ? (
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-green-600 dark:text-green-400"
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
            ) : (
              <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-red-600 dark:text-red-400"
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
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {passed ? 'Congratulations!' : 'Keep Practicing'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {passed
              ? "You've successfully passed the exam!"
              : "You didn't pass this time, but don't give up!"}
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Score</p>
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(percentageScore)}`}>
              {percentageScore.toFixed(0)}%
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {results.total_points_earned}
                </span>{' '}
                / {results.total_points_possible} points
              </div>
              <div>
                Status:{' '}
                <span
                  className={`font-semibold ${
                    passed
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {passed ? 'Passed' : 'Not Passed'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Breakdown */}
        {results.section_scores && Object.keys(results.section_scores).length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Section Breakdown
            </h2>
            <div className="space-y-4">
              {Object.entries(results.section_scores).map(([sectionType, score]: [string, any]) => (
                <div
                  key={sectionType}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getSectionIcon(sectionType)}</span>
                      <span className="font-semibold text-gray-900 dark:text-white capitalize">
                        {sectionType}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(score.percentage)}`}>
                        {score.percentage.toFixed(0)}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {score.earned} / {score.possible} points
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-3">
                    <div
                      className={`h-2 rounded-full ${
                        score.percentage >= 80
                          ? 'bg-green-600'
                          : score.percentage >= 60
                            ? 'bg-yellow-600'
                            : 'bg-red-600'
                      }`}
                      style={{ width: `${score.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Performance Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Time Spent</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {results.time_spent_minutes
                  ? `${Math.floor(results.time_spent_minutes)}m`
                  : 'N/A'}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {new Date(results.completed_at).toLocaleDateString()}
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Level</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {results.level || 'B1'}
              </p>
            </div>
          </div>
        </div>

        {/* Feedback & Recommendations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recommendations
          </h2>
          <div className="space-y-3 text-gray-600 dark:text-gray-400">
            {passed ? (
              <>
                <p className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Great job! You've demonstrated proficiency at this level.
                </p>
                <p className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Consider moving to the next level to continue your learning journey.
                </p>
                <p className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Keep practicing regularly to maintain your skills.
                </p>
              </>
            ) : (
              <>
                <p className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Review the sections where you scored below 60%.
                </p>
                <p className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Practice more lessons at this level before retaking the exam.
                </p>
                <p className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Focus on vocabulary and grammar exercises.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/exams')}
            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600
                     text-gray-700 dark:text-gray-300 font-semibold rounded-lg
                     hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Back to Exams
          </button>
          <button
            onClick={() => router.push(`/exams/${examId}`)}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700
                     text-white font-semibold rounded-lg transition-colors"
          >
            Retake Exam
          </button>
        </div>

        {/* Share Results */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              showToast('Results copied to clipboard!', 'success');
              navigator.clipboard.writeText(
                `I scored ${percentageScore.toFixed(0)}% on the Polish Language Exam (${results.level})!`
              );
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            Share Your Results
          </button>
        </div>
      </div>
    </div>
  );
}

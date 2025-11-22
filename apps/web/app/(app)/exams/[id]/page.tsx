'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getExamById, startExamAttempt, MockExam } from '@/services/exam.service';
import { useToast } from '@/components/ui/ToastContainer';

export default function ExamDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const showToast = useToast();
  const [exam, setExam] = useState<MockExam | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (params.id) {
      loadExam();
    }
  }, [params.id]);

  const loadExam = async () => {
    try {
      setLoading(true);
      const response = await getExamById(parseInt(params.id as string));

      if (response.success && response.data) {
        setExam(response.data.exam);
      } else {
        throw new Error(response.error?.message || 'Failed to load exam');
      }
    } catch (error: any) {
      console.error('Failed to load exam:', error);
      showToast(error.message || 'Failed to load exam', 'error');
      router.push('/exams');
    } finally {
      setLoading(false);
    }
  };

  const handleStartExam = async () => {
    if (!exam) return;

    try {
      setStarting(true);
      const response = await startExamAttempt(exam.id);

      if (response.success && response.data) {
        const attemptId = response.data.attempt_id || response.data.attemptId;
        showToast('Exam started! Good luck!', 'success');
        router.push(`/exams/${exam.id}/take/${attemptId}`);
      } else {
        throw new Error(response.error?.message || 'Failed to start exam');
      }
    } catch (error: any) {
      console.error('Failed to start exam:', error);
      showToast(error.message || 'Failed to start exam', 'error');
    } finally {
      setStarting(false);
    }
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      A1: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      A2: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      B1: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      B2: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      C1: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      C2: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    };
    return colors[level] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getSectionIcon = (sectionType: string) => {
    const icons: Record<string, JSX.Element> = {
      reading: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      writing: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      ),
      listening: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 000 12.728M12 8v8"
          />
        </svg>
      ),
      speaking: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      ),
    };
    return icons[sectionType] || icons.reading;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8"></div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-6 h-96"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!exam) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push('/exams')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900
                   dark:hover:text-white mb-6 transition-colors"
        >
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Exams
        </button>

        {/* Exam Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getLevelColor(exam.level)}`}>
                {exam.level}
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                {exam.exam_type === 'full' ? 'Full Exam' : 'Practice Test'}
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {exam.title_en}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {exam.description_en}
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.floor(exam.total_time_minutes / 60)}h {exam.total_time_minutes % 60}m
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sections</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {exam.sections.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Questions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {exam.sections.reduce((sum, s) => sum + (s.question_count || 0), 0)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Passing Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {exam.passing_score_percentage}%
              </p>
            </div>
          </div>
        </div>

        {/* Exam Sections */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Exam Sections</h2>
          <div className="space-y-4">
            {exam.sections.map((section, index) => (
              <div
                key={index}
                className="flex items-start p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg
                         border border-gray-200 dark:border-gray-600"
              >
                <div className="flex-shrink-0 text-blue-600 dark:text-blue-400 mr-4 mt-1">
                  {getSectionIcon(section.section_type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {section.title_en}
                  </h3>
                  {section.instructions_en && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {section.instructions_en}
                    </p>
                  )}
                  <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                    <span>⏱️ {section.time_limit_minutes} minutes</span>
                    <span>📝 {section.question_count || 0} questions</span>
                    <span>⭐ {section.max_points} points</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previous Attempts */}
        {exam.user_attempts && exam.user_attempts.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Your Previous Attempts
            </h2>
            <div className="space-y-3">
              {exam.user_attempts.slice(0, 5).map((attempt, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50
                           rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Attempt {exam.user_attempts!.length - index}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {attempt.completed_at ? new Date(attempt.completed_at).toLocaleDateString() : 'In progress'}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {attempt.percentage_score !== undefined && (
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {attempt.percentage_score.toFixed(0)}%
                      </span>
                    )}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        attempt.status === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {attempt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions & Start Button */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Before You Start
          </h2>
          <ul className="space-y-3 mb-6 text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Ensure you have a stable internet connection</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Find a quiet place without distractions</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>You can take breaks between sections</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Your progress will be saved automatically</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Multiple choice questions are graded automatically</span>
            </li>
          </ul>

          <button
            onClick={handleStartExam}
            disabled={starting}
            className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400
                     text-white font-semibold text-lg rounded-lg transition-colors duration-200
                     disabled:cursor-not-allowed"
          >
            {starting ? 'Starting Exam...' : 'Start Exam'}
          </button>
        </div>
      </div>
    </div>
  );
}

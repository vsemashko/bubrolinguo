'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMockExams, MockExam } from '@/services/exam.service';
import { useToast } from '@/components/ui/ToastContainer';

export default function ExamsPage() {
  const router = useRouter();
  const showToast = useToast();
  const [exams, setExams] = useState<MockExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    loadExams();
  }, [levelFilter, typeFilter]);

  const loadExams = async () => {
    try {
      setLoading(true);
      const response = await getMockExams({
        level: levelFilter,
        exam_type: typeFilter,
      });

      if (response.success && response.data) {
        setExams(response.data.exams);
      } else {
        throw new Error(response.error?.message || 'Failed to load exams');
      }
    } catch (error: any) {
      console.error('Failed to load exams:', error);
      showToast(error.message || 'Failed to load exams', 'error');
      setExams([]);
    } finally {
      setLoading(false);
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

  const getExamTypeLabel = (type: string) => {
    return type === 'full' ? 'Full Exam' : 'Practice Test';
  };

  const formatTime = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Exam Preparation
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Practice with official exam formats to prepare for your certification
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                CEFR Level
              </label>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="A1">A1 - Beginner</option>
                <option value="A2">A2 - Elementary</option>
                <option value="B1">B1 - Intermediate</option>
                <option value="B2">B2 - Upper Intermediate</option>
                <option value="C1">C1 - Advanced</option>
                <option value="C2">C2 - Proficient</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Exam Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="full">Full Exams</option>
                <option value="practice">Practice Tests</option>
              </select>
            </div>
          </div>
        </div>

        {/* Exam Cards */}
        {exams.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              No exams found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or check back later
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md
                         transition-shadow duration-200 overflow-hidden cursor-pointer
                         border border-gray-200 dark:border-gray-700"
                onClick={() => router.push(`/exams/${exam.id}`)}
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(exam.level)}`}>
                      {exam.level}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                      {getExamTypeLabel(exam.exam_type)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {exam.title_en}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {exam.description_en}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Duration</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatTime(exam.total_time_minutes)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Sections</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {exam.sections.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Questions</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {exam.sections.reduce((sum, s) => sum + (s.question_count || 0), 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Pass Score</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {exam.passing_score_percentage}%
                      </p>
                    </div>
                  </div>

                  {/* Previous Attempts */}
                  {exam.user_attempts && exam.user_attempts.length > 0 && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        Latest Attempt
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-900 dark:text-white">
                          Score: {exam.user_attempts[0].percentage_score?.toFixed(0)}%
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            exam.user_attempts[0].status === 'completed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}
                        >
                          {exam.user_attempts[0].status}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <button
                    className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700
                             text-white font-medium rounded-lg transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/exams/${exam.id}`);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0"
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
            <div>
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">
                About Mock Exams
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                These exams are designed to simulate the official Polish language certification tests.
                Practice regularly to improve your chances of passing the real exam.
                Multiple choice questions are auto-graded, while essays require manual review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

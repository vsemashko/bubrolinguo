/**
 * Example: Lessons List Component
 *
 * Demonstrates how to:
 * - Fetch lessons using the lessons service
 * - Display loading states
 * - Handle errors
 * - Filter by level
 * - Show lesson cards with details
 *
 * Works seamlessly with both mock and real API data.
 */

'use client';

import { useEffect, useState } from 'react';
import { getLessons } from '@/services/lessons.service';
import type { Lesson, CEFRLevel } from '@/types/lesson';
import { SkeletonLessonCard } from '@/components/ui/Skeleton';

export function LessonsList() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'all'>('all');

  useEffect(() => {
    async function fetchLessons() {
      try {
        setLoading(true);
        setError(null);

        const response = await getLessons({
          level: selectedLevel,
          status: 'all',
        });

        if (response.success && response.data) {
          setLessons(response.data.lessons);
        } else {
          setError('Failed to load lessons');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchLessons();
  }, [selectedLevel]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Polish Lessons
          </h1>
          <p className="text-gray-600">
            Choose a lesson to start learning Polish
          </p>
        </div>

        {/* Level Filter - shown while loading */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Level
          </label>
          <div className="flex flex-wrap gap-2">
            {(['all', 'A1', 'A2', 'B1', 'B2', 'C1'] as const).map((level) => (
              <button
                key={level}
                disabled
                className="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
              >
                {level === 'all' ? 'All Levels' : level}
              </button>
            ))}
          </div>
        </div>

        {/* Skeleton Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonLessonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-semibold mb-2">Error Loading Lessons</h3>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Polish Lessons
        </h1>
        <p className="text-gray-600">
          Choose a lesson to start learning Polish
        </p>
      </div>

      {/* Level Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Level
        </label>
        <div className="flex flex-wrap gap-2">
          {(['all', 'A1', 'A2', 'B1', 'B2', 'C1'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedLevel === level
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {level === 'all' ? 'All Levels' : level}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {lessons.length} lesson{lessons.length !== 1 ? 's' : ''}
      </div>

      {/* Lessons Grid */}
      {lessons.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No lessons found for this level.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  );
}

function LessonCard({ lesson }: { lesson: Lesson }) {
  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      A1: 'bg-green-100 text-green-800',
      A2: 'bg-blue-100 text-blue-800',
      B1: 'bg-yellow-100 text-yellow-800',
      B2: 'bg-orange-100 text-orange-800',
      C1: 'bg-red-100 text-red-800',
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(
            lesson.level
          )}`}
        >
          {lesson.level}
        </span>
        <span className="text-xs text-gray-500">
          Lesson {lesson.lesson_number}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {lesson.title_en}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {lesson.description_en}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {lesson.estimated_duration || 15} min
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {lesson.xp_reward} XP
          </span>
        </div>

        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Start →
        </button>
      </div>
    </div>
  );
}

export default LessonsList;

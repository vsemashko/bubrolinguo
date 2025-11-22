'use client';

import React from 'react';
import { Card } from '@/components/ui';
import Link from 'next/link';

interface LessonUnit {
  id: string;
  name: string;
  lessonsTotal: number;
  lessonsCompleted: number;
  isLocked: boolean;
  icon: string;
}

interface LessonProgressIndicatorProps {
  units: LessonUnit[];
  currentLessonId?: string;
}

export function LessonProgressIndicator({
  units,
  currentLessonId,
}: LessonProgressIndicatorProps) {
  return (
    <Card>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Learning Path</h3>

      <div className="space-y-4">
        {units.map((unit, index) => {
          const progress = (unit.lessonsCompleted / unit.lessonsTotal) * 100;
          const isComplete = unit.lessonsCompleted === unit.lessonsTotal;
          const isInProgress =
            unit.lessonsCompleted > 0 && unit.lessonsCompleted < unit.lessonsTotal;

          return (
            <div key={unit.id} className="relative">
              {/* Connecting Line */}
              {index < units.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-8 bg-gray-200" />
              )}

              <div
                className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
                  unit.isLocked
                    ? 'border-gray-200 bg-gray-50 opacity-60'
                    : isComplete
                    ? 'border-green-300 bg-green-50 hover:shadow-md'
                    : isInProgress
                    ? 'border-brand-primary bg-brand-primary/5 hover:shadow-md'
                    : 'border-gray-200 hover:border-brand-primary hover:shadow-md'
                }`}
              >
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    unit.isLocked
                      ? 'bg-gray-200'
                      : isComplete
                      ? 'bg-green-200'
                      : isInProgress
                      ? 'bg-brand-primary/20'
                      : 'bg-gray-100'
                  }`}
                >
                  {unit.isLocked ? '🔒' : unit.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900">{unit.name}</h4>
                    {isComplete && (
                      <span className="text-green-600 text-xl">✓</span>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 mb-2">
                    {unit.lessonsCompleted} / {unit.lessonsTotal} lessons
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isComplete
                          ? 'bg-green-500'
                          : isInProgress
                          ? 'bg-brand-primary'
                          : 'bg-gray-300'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Action Button */}
                  {!unit.isLocked && (
                    <Link
                      href={`/lessons?unit=${unit.id}`}
                      className={`inline-block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isComplete
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : isInProgress
                          ? 'bg-brand-primary text-white hover:bg-brand-primary/90'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {isComplete
                        ? 'Review'
                        : isInProgress
                        ? 'Continue'
                        : 'Start Unit'}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Progress Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Overall Progress</span>
          <span className="font-bold text-brand-primary">
            {units.reduce((sum, u) => sum + u.lessonsCompleted, 0)} /{' '}
            {units.reduce((sum, u) => sum + u.lessonsTotal, 0)} lessons
          </span>
        </div>
      </div>
    </Card>
  );
}

export default LessonProgressIndicator;

'use client';

import React from 'react';
import Link from 'next/link';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  bgColor: string;
  hoverColor: string;
}

export function QuickActions() {
  const actions: QuickAction[] = [
    {
      id: 'continue-lesson',
      title: 'Continue Learning',
      description: 'Pick up where you left off',
      icon: '📚',
      href: '/lessons',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      hoverColor: 'hover:bg-blue-200',
    },
    {
      id: 'review-vocab',
      title: 'Review Vocabulary',
      description: 'Practice words you learned',
      icon: '💬',
      href: '/vocabulary/review',
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      hoverColor: 'hover:bg-purple-200',
    },
    {
      id: 'daily-challenge',
      title: 'Daily Challenge',
      description: 'Complete today\'s challenge',
      icon: '⚡',
      href: '/challenges/daily',
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-100',
      hoverColor: 'hover:bg-yellow-200',
    },
    {
      id: 'leaderboard',
      title: 'View Leaderboard',
      description: 'See where you rank',
      icon: '🏆',
      href: '/leaderboard',
      color: 'text-orange-700',
      bgColor: 'bg-orange-100',
      hoverColor: 'hover:bg-orange-200',
    },
    {
      id: 'practice-exam',
      title: 'Practice Exam',
      description: 'Test your knowledge',
      icon: '📝',
      href: '/exams',
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      hoverColor: 'hover:bg-green-200',
    },
    {
      id: 'achievements',
      title: 'Achievements',
      description: 'View your progress',
      icon: '🏅',
      href: '/achievements',
      color: 'text-pink-700',
      bgColor: 'bg-pink-100',
      hoverColor: 'hover:bg-pink-200',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>

      {/* Desktop Grid (3 columns) */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className={`${action.bgColor} ${action.hoverColor} rounded-xl p-6 transition-all hover:shadow-lg hover:scale-105 group`}
          >
            <div className="flex flex-col h-full">
              <div className={`text-4xl mb-3 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <h3 className={`${action.color} font-bold text-lg mb-2`}>
                {action.title}
              </h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile List (stacked) */}
      <div className="md:hidden space-y-3">
        {actions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className={`${action.bgColor} ${action.hoverColor} rounded-xl p-4 transition-all hover:shadow-lg flex items-center gap-4`}
          >
            <div className="text-3xl flex-shrink-0">{action.icon}</div>
            <div className="flex-1 min-w-0">
              <h3 className={`${action.color} font-bold text-base mb-1`}>
                {action.title}
              </h3>
              <p className="text-gray-600 text-sm truncate">
                {action.description}
              </p>
            </div>
            <svg
              className="w-5 h-5 text-gray-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;

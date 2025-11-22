'use client';

import React, { useEffect, useState } from 'react';
import { Card, Progress } from '@/components/ui';

interface DailyGoalTrackerProps {
  currentXp: number;
  goalXp: number;
  onComplete?: () => void;
}

export function DailyGoalTracker({
  currentXp,
  goalXp,
  onComplete,
}: DailyGoalTrackerProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const percentage = Math.min((currentXp / goalXp) * 100, 100);
  const isComplete = currentXp >= goalXp;
  const remaining = Math.max(goalXp - currentXp, 0);

  useEffect(() => {
    if (isComplete && onComplete) {
      setIsAnimating(true);
      onComplete();
      setTimeout(() => setIsAnimating(false), 2000);
    }
  }, [isComplete, onComplete]);

  const getMotivationalMessage = () => {
    if (isComplete) {
      return "🎉 Daily goal achieved! You're on fire!";
    }
    if (percentage >= 75) {
      return "🔥 Almost there! Keep going!";
    }
    if (percentage >= 50) {
      return "💪 Halfway to your goal!";
    }
    if (percentage >= 25) {
      return "✨ Great start! Keep it up!";
    }
    return "🎯 Let's reach your goal today!";
  };

  return (
    <Card
      className={`relative overflow-hidden transition-all ${
        isAnimating ? 'ring-4 ring-yellow-400 scale-105' : ''
      }`}
    >
      {/* Celebration Effect */}
      {isComplete && (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 animate-pulse" />
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Daily Goal
          </h3>
          {isComplete && (
            <div className="flex items-center gap-1 text-yellow-600 font-bold animate-bounce">
              <span className="text-2xl">✓</span>
              <span>Complete!</span>
            </div>
          )}
        </div>

        {/* Progress Circle for Mobile */}
        <div className="flex lg:hidden justify-center mb-4">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
                className={`${
                  isComplete ? 'text-green-500' : 'text-brand-primary'
                } transition-all duration-500`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(percentage)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* XP Display */}
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <span className="text-3xl font-bold text-brand-primary">
              {currentXp}
            </span>
            <span className="text-gray-600 ml-2">/ {goalXp} XP</span>
          </div>
          {!isComplete && (
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-orange-600">{remaining}</span> XP to go
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="hidden lg:block mb-4">
          <Progress
            value={percentage}
            className="h-3"
            indicatorClassName={isComplete ? 'bg-green-500' : 'bg-brand-primary'}
          />
        </div>

        {/* Motivational Message */}
        <div className="text-center text-sm font-medium text-gray-700 bg-gray-50 rounded-lg p-3">
          {getMotivationalMessage()}
        </div>

        {/* Streak Info */}
        {isComplete && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>Keep your streak going!</span>
            <span className="text-orange-600 font-bold">🔥</span>
          </div>
        )}
      </div>
    </Card>
  );
}

export default DailyGoalTracker;

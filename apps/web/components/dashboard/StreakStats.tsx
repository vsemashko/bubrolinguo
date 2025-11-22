/**
 * StreakStats Component
 *
 * Displays detailed streak statistics with visual progress indicators
 * Now integrated with real API data
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui';
import { StreakFireIcon } from './StreakFireIcon';
import { getStreakStats, StreakStats as IStreakStats } from '@/services/streak.service';
import { useAuth } from '@/contexts/AuthContext';

interface StreakStatsProps {
  language?: 'en' | 'ru';
  // Optional props for manual override (backward compatibility)
  currentStreak?: number;
  longestStreak?: number;
  totalActiveDays?: number;
  streakFreezes?: number;
}

export function StreakStats({
  language = 'en',
  currentStreak: manualCurrentStreak,
  longestStreak: manualLongestStreak,
  totalActiveDays: manualTotalActiveDays,
  streakFreezes: manualStreakFreezes,
}: StreakStatsProps) {
  const { user } = useAuth();
  const [streakData, setStreakData] = useState<IStreakStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use manual props if provided (backward compatibility), otherwise use API data
  const currentStreak = manualCurrentStreak ?? streakData?.currentStreak ?? 0;
  const longestStreak = manualLongestStreak ?? streakData?.longestStreak ?? 0;
  const totalActiveDays = manualTotalActiveDays ?? streakData?.totalActiveDays ?? 0;
  const streakFreezes = manualStreakFreezes ?? streakData?.streakFreezeAvailable ?? 0;

  useEffect(() => {
    async function fetchStreakData() {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await getStreakStats(user.id);

        if (response.success && response.data) {
          setStreakData(response.data.stats);
        } else {
          setError(response.error?.message || 'Failed to load streak data');
        }
      } catch (err) {
        setError('An error occurred while loading streak data');
        console.error('Streak data fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    // Only fetch if manual props are not provided
    if (manualCurrentStreak === undefined) {
      fetchStreakData();
    } else {
      setIsLoading(false);
    }
  }, [user?.id, manualCurrentStreak]);
  const t = language === 'en' ? {
    title: 'Streak Statistics',
    current: 'Current Streak',
    longest: 'Longest Streak',
    totalDays: 'Total Active Days',
    freezes: 'Streak Freezes',
    days: 'days',
    available: 'available',
    nextMilestone: 'Next Milestone',
    progress: 'Progress',
  } : {
    title: 'Статистика активности',
    current: 'Текущая серия',
    longest: 'Рекордная серия',
    totalDays: 'Всего активных дней',
    freezes: 'Заморозки',
    days: 'дней',
    available: 'доступно',
    nextMilestone: 'Следующая цель',
    progress: 'Прогресс',
  };

  const getNextMilestone = (current: number): number => {
    const milestones = [7, 14, 30, 60, 100, 365, 500, 1000];
    return milestones.find(m => m > current) || current + 100;
  };

  const nextMilestone = getNextMilestone(currentStreak);
  const progressToMilestone = (currentStreak / nextMilestone) * 100;

  const getMilestoneIcon = (days: number): string => {
    if (days >= 365) {return '👑';} // King
    if (days >= 100) {return '💎';} // Diamond
    if (days >= 30) {return '🏆';} // Trophy
    if (days >= 7) {return '⭐';} // Star
    return '🎯'; // Target
  };

  // Show loading state
  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-4 h-24"></div>
            ))}
          </div>
          <div className="bg-gray-100 rounded-lg p-4 h-20"></div>
        </div>
      </Card>
    );
  }

  // Show error state
  if (error) {
    return (
      <Card className="overflow-hidden">
        <div className="text-center py-8">
          <div className="text-red-500 text-4xl mb-2">⚠️</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">{t.title}</h3>
        <StreakFireIcon streakDays={currentStreak} size="md" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Current Streak */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border-2 border-orange-200">
          <div className="text-sm font-medium text-orange-800 mb-1">{t.current}</div>
          <div className="text-3xl font-bold text-orange-600 flex items-baseline gap-1">
            {currentStreak}
            <span className="text-lg font-normal text-orange-500">{t.days}</span>
          </div>
        </div>

        {/* Longest Streak */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-200">
          <div className="text-sm font-medium text-purple-800 mb-1">{t.longest}</div>
          <div className="text-3xl font-bold text-purple-600 flex items-baseline gap-1">
            {longestStreak}
            <span className="text-lg font-normal text-purple-500">{t.days}</span>
          </div>
        </div>

        {/* Total Active Days */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-200">
          <div className="text-sm font-medium text-blue-800 mb-1">{t.totalDays}</div>
          <div className="text-3xl font-bold text-blue-600 flex items-baseline gap-1">
            {totalActiveDays}
            <span className="text-lg font-normal text-blue-500">{t.days}</span>
          </div>
        </div>

        {/* Streak Freezes */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border-2 border-cyan-200">
          <div className="text-sm font-medium text-cyan-800 mb-1">{t.freezes}</div>
          <div className="text-3xl font-bold text-cyan-600 flex items-baseline gap-1">
            {streakFreezes}
            <span className="text-lg font-normal text-cyan-500">{t.available}</span>
          </div>
        </div>
      </div>

      {/* Next Milestone Progress */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getMilestoneIcon(nextMilestone)}</span>
            <div>
              <div className="text-sm font-semibold text-gray-900">{t.nextMilestone}</div>
              <div className="text-xs text-gray-600">
                {nextMilestone} {t.days}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-gray-900">
              {currentStreak}/{nextMilestone}
            </div>
            <div className="text-xs text-gray-600">
              {nextMilestone - currentStreak} {t.days} to go
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full transition-all duration-500 relative"
            style={{ width: `${Math.min(progressToMilestone, 100)}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Streak Achievements */}
      {currentStreak > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {currentStreak >= 7 && (
            <div className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full flex items-center gap-1">
              ⭐ Week Warrior
            </div>
          )}
          {currentStreak >= 30 && (
            <div className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full flex items-center gap-1">
              🏆 Month Master
            </div>
          )}
          {currentStreak >= 100 && (
            <div className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full flex items-center gap-1">
              💎 Century Club
            </div>
          )}
          {currentStreak >= 365 && (
            <div className="px-3 py-1 bg-gradient-to-r from-yellow-200 to-orange-200 text-gray-900 text-xs font-semibold rounded-full flex items-center gap-1">
              👑 Year Champion
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default StreakStats;

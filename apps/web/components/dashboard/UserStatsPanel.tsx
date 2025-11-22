'use client';

import React from 'react';
import { Card, Badge, Progress } from '@/components/ui';

interface UserStats {
  totalXp: number;
  currentLevel: string;
  nextLevel: string;
  xpToNextLevel: number;
  xpProgress: number;
  lessonsCompleted: number;
  totalLessons: number;
  vocabularyLearned: number;
  vocabularyMastered: number;
  currentStreak: number;
  longestStreak: number;
  accuracy: number;
  studyTimeMinutes: number;
  rank: number;
  totalUsers: number;
}

interface UserStatsPanelProps {
  stats: UserStats;
}

export function UserStatsPanel({ stats }: UserStatsPanelProps) {
  const levelProgress = (stats.xpProgress / stats.xpToNextLevel) * 100;

  const formatTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getAccuracyColor = (accuracy: number): string => {
    if (accuracy >= 90) {return 'text-green-600';}
    if (accuracy >= 75) {return 'text-blue-600';}
    if (accuracy >= 60) {return 'text-yellow-600';}
    return 'text-orange-600';
  };

  const getStreakTier = (streak: number): { emoji: string; text: string; color: string } => {
    if (streak >= 100) {return { emoji: '🔥', text: 'Legendary', color: 'text-purple-600' };}
    if (streak >= 50) {return { emoji: '💎', text: 'Diamond', color: 'text-blue-600' };}
    if (streak >= 30) {return { emoji: '⭐', text: 'Gold', color: 'text-yellow-600' };}
    if (streak >= 14) {return { emoji: '🥇', text: 'Silver', color: 'text-gray-500' };}
    if (streak >= 7) {return { emoji: '🥉', text: 'Bronze', color: 'text-orange-600' };}
    return { emoji: '🌱', text: 'Beginner', color: 'text-green-600' };
  };

  const streakTier = getStreakTier(stats.currentStreak);

  return (
    <div className="space-y-6">
      {/* Level Progress Card */}
      <Card>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Level Progress</h3>
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="lg">
                {stats.currentLevel}
              </Badge>
              <span className="text-gray-600">→</span>
              <Badge variant="secondary" size="lg">
                {stats.nextLevel}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-brand-primary">
              {stats.totalXp.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600">Total XP</div>
          </div>
        </div>

        <Progress value={levelProgress} className="h-3 mb-2" />

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{stats.xpProgress.toLocaleString()} XP</span>
          <span className="font-semibold text-brand-primary">
            {(stats.xpToNextLevel - stats.xpProgress).toLocaleString()} XP to level up
          </span>
          <span>{stats.xpToNextLevel.toLocaleString()} XP</span>
        </div>
      </Card>

      {/* Learning Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Lessons Progress */}
        <Card className="text-center">
          <div className="text-4xl mb-2">📚</div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stats.lessonsCompleted}
          </div>
          <div className="text-sm text-gray-600 mb-2">Lessons Completed</div>
          <Progress
            value={(stats.lessonsCompleted / stats.totalLessons) * 100}
            className="h-1"
          />
          <div className="text-xs text-gray-500 mt-1">
            {stats.totalLessons - stats.lessonsCompleted} remaining
          </div>
        </Card>

        {/* Vocabulary Stats */}
        <Card className="text-center">
          <div className="text-4xl mb-2">💬</div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stats.vocabularyLearned}
          </div>
          <div className="text-sm text-gray-600 mb-2">Words Learned</div>
          <div className="flex items-center justify-center gap-2 text-xs">
            <span className="text-green-600 font-semibold">
              {stats.vocabularyMastered} mastered
            </span>
          </div>
        </Card>

        {/* Streak Stats */}
        <Card className="text-center">
          <div className="text-4xl mb-2">{streakTier.emoji}</div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stats.currentStreak}
          </div>
          <div className="text-sm text-gray-600 mb-2">Day Streak</div>
          <Badge variant="warning" size="sm" className={streakTier.color}>
            {streakTier.text}
          </Badge>
          <div className="text-xs text-gray-500 mt-2">
            Best: {stats.longestStreak} days
          </div>
        </Card>

        {/* Accuracy Stats */}
        <Card className="text-center">
          <div className="text-4xl mb-2">🎯</div>
          <div className={`text-2xl font-bold mb-1 ${getAccuracyColor(stats.accuracy)}`}>
            {stats.accuracy}%
          </div>
          <div className="text-sm text-gray-600 mb-2">Accuracy</div>
          <Progress
            value={stats.accuracy}
            className="h-1"
            indicatorClassName={
              stats.accuracy >= 90
                ? 'bg-green-500'
                : stats.accuracy >= 75
                ? 'bg-blue-500'
                : 'bg-yellow-500'
            }
          />
        </Card>
      </div>

      {/* Additional Stats */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-4">More Stats</h3>

        <div className="space-y-3">
          {/* Study Time */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⏱️</span>
              <div>
                <div className="font-medium text-gray-900">Study Time</div>
                <div className="text-sm text-gray-600">Total practice time</div>
              </div>
            </div>
            <div className="text-xl font-bold text-brand-primary">
              {formatTime(stats.studyTimeMinutes)}
            </div>
          </div>

          {/* Rank */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <div className="font-medium text-gray-900">Leaderboard Rank</div>
                <div className="text-sm text-gray-600">
                  Top {Math.round((stats.rank / stats.totalUsers) * 100)}%
                </div>
              </div>
            </div>
            <div className="text-xl font-bold text-brand-primary">
              #{stats.rank.toLocaleString()}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default UserStatsPanel;

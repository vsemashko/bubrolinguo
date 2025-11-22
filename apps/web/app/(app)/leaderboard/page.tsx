'use client';

import React, { useState, useEffect } from 'react';
import { Card, Avatar, Badge } from '@/components/ui';
import { SkeletonLeaderboard } from '@/components/ui/Skeleton';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  avatar?: string;
  totalXp: number;
  weeklyXp: number;
  currentLevel: string;
  streakCount: number;
  isFriend: boolean;
  isCurrentUser: boolean;
}

type LeaderboardPeriod = 'all-time' | 'weekly' | 'monthly';
type LeaderboardScope = 'global' | 'friends';

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<LeaderboardPeriod>('all-time');
  const [scope, setScope] = useState<LeaderboardScope>('global');
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    loadLeaderboard();
  }, [period, scope]);

  const loadLeaderboard = async () => {
    setLoading(true);
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock data
    const mockData: LeaderboardEntry[] = [
      {
        rank: 1,
        userId: '1',
        displayName: 'Zofia Wiśniewska',
        totalXp: 15420,
        weeklyXp: 890,
        currentLevel: 'B2',
        streakCount: 45,
        isFriend: false,
        isCurrentUser: false,
      },
      {
        rank: 2,
        userId: '2',
        displayName: 'Jakub Kowalski',
        totalXp: 14850,
        weeklyXp: 720,
        currentLevel: 'B1',
        streakCount: 32,
        isFriend: true,
        isCurrentUser: false,
      },
      {
        rank: 3,
        userId: '3',
        displayName: 'Ania Nowak',
        totalXp: 13290,
        weeklyXp: 650,
        currentLevel: 'B2',
        streakCount: 28,
        isFriend: true,
        isCurrentUser: false,
      },
      {
        rank: 4,
        userId: '4',
        displayName: 'You',
        totalXp: 12540,
        weeklyXp: 580,
        currentLevel: 'A2',
        streakCount: 21,
        isFriend: false,
        isCurrentUser: true,
      },
      {
        rank: 5,
        userId: '5',
        displayName: 'Piotr Zieliński',
        totalXp: 11890,
        weeklyXp: 510,
        currentLevel: 'B1',
        streakCount: 18,
        isFriend: false,
        isCurrentUser: false,
      },
    ];

    setLeaderboard(mockData);
    setLoading(false);
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) {return '🥇';}
    if (rank === 2) {return '🥈';}
    if (rank === 3) {return '🥉';}
    return rank;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) {return 'text-yellow-600';}
    if (rank === 2) {return 'text-gray-500';}
    if (rank === 3) {return 'text-orange-600';}
    return 'text-gray-700';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SkeletonLeaderboard />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🏆 Leaderboard</h1>
        <p className="text-gray-600">
          Compete with learners around the world and climb to the top!
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Scope Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScope('global')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              scope === 'global'
                ? 'bg-brand-primary text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🌍 Global
          </button>
          <button
            onClick={() => setScope('friends')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              scope === 'friends'
                ? 'bg-brand-primary text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            👥 Friends
          </button>
        </div>

        {/* Period Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPeriod('all-time')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              period === 'all-time'
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              period === 'monthly'
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setPeriod('weekly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              period === 'weekly'
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* Leaderboard */}
      <Card className="overflow-hidden">
        <div className="divide-y divide-gray-200">
          {leaderboard.map((entry) => (
            <div
              key={entry.userId}
              className={`p-6 transition-colors ${
                entry.isCurrentUser
                  ? 'bg-brand-primary/5 border-l-4 border-brand-primary'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div
                  className={`text-3xl font-bold w-12 text-center ${getRankColor(
                    entry.rank
                  )}`}
                >
                  {getRankBadge(entry.rank)}
                </div>

                {/* Avatar */}
                <Avatar
                  fallback={entry.displayName}
                  src={entry.avatar}
                  size="lg"
                />

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 truncate">
                      {entry.displayName}
                      {entry.isCurrentUser && (
                        <span className="ml-2 text-sm text-brand-primary">
                          (You)
                        </span>
                      )}
                    </h3>
                    {entry.isFriend && (
                      <Badge variant="info" size="sm">
                        Friend
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Level {entry.currentLevel}</span>
                    <span>🔥 {entry.streakCount} days</span>
                    {period === 'weekly' && (
                      <span className="text-brand-primary font-semibold">
                        {entry.weeklyXp} XP this week
                      </span>
                    )}
                  </div>
                </div>

                {/* XP */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {entry.totalXp.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total XP</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Footer Info */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Rankings update every hour. Keep learning to climb higher! 🚀
        </p>
      </div>
    </div>
  );
}

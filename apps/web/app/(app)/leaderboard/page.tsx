'use client';

import React, { useState, useEffect } from 'react';
import { Card, Avatar, Badge } from '@/components/ui';
import { SkeletonLeaderboard } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/ToastContainer';
import { getLeaderboard } from '@/services/leaderboard.service';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  avatar?: string;
  totalXp: number;
  weeklyXp: number | null;
  currentLevel: string;
  streakCount: number;
  isFriend: boolean;
  isCurrentUser: boolean;
}

type LeaderboardPeriod = 'allTime' | 'weekly' | 'monthly';
type LeaderboardScope = 'global' | 'friends';

export default function LeaderboardPage() {
  const { showToast } = useToast();
  const [period, setPeriod] = useState<LeaderboardPeriod>('allTime');
  const [scope, setScope] = useState<LeaderboardScope>('global');
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    loadLeaderboard();
  }, [period, scope]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await getLeaderboard(period, scope);

      if (response.success && response.data) {
        setLeaderboard(response.data.leaderboard);
      } else {
        throw new Error(response.error?.message || 'Failed to load leaderboard');
      }
    } catch (error: any) {
      console.error('Failed to load leaderboard:', error);
      showToast(error.message || 'Failed to load leaderboard', 'error');
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
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
            onClick={() => setPeriod('allTime')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              period === 'allTime'
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

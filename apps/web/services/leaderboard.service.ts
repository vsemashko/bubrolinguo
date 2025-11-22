// Leaderboard Service - Rankings and competition

import { get } from '@/lib/api';
import { useMockData, mockDelay, mockApiResponse } from '@/lib/mockData';

export interface LeaderboardEntry {
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

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  currentUserRank: LeaderboardEntry | null;
  period: string;
  scope: string;
}

/**
 * Get leaderboard rankings
 */
export async function getLeaderboard(
  period: 'daily' | 'weekly' | 'monthly' | 'allTime' = 'weekly',
  scope: 'global' | 'friends' = 'global',
  limit: number = 100
) {
  if (useMockData()) {
    await mockDelay(500);

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

    return mockApiResponse({
      leaderboard: mockData,
      currentUserRank: mockData.find(entry => entry.isCurrentUser) || null,
      period,
      scope,
    });
  }

  return get<LeaderboardResponse>(
    `/leaderboard?period=${period}&scope=${scope}&limit=${limit}`
  );
}

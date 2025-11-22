'use client';

import React, { useState, useEffect } from 'react';
import { Card, Badge, Progress } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { getUserAchievements, getAchievementStats } from '@/services/achievements.service';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'lessons' | 'vocabulary' | 'streak' | 'social' | 'special';
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  progressMax?: number;
}

type AchievementCategory = 'all' | 'lessons' | 'vocabulary' | 'streak' | 'social' | 'special';

export default function AchievementsPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>('all');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadAchievements();
    }
  }, [user?.id]);

  const loadAchievements = async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getUserAchievements(user.id);

      if (response.success && response.data) {
        // Convert API response to component format
        const allAchievements: Achievement[] = [
          ...response.data.unlocked.map(a => ({
            id: a.id,
            name: a.titleEn,
            description: a.descriptionEn || '',
            icon: getCategoryIcon(a.category),
            xpReward: a.xpReward,
            rarity: a.rarity,
            category: mapCategory(a.category),
            unlocked: true,
            unlockedAt: a.unlockedAt,
          })),
          ...response.data.locked.map(a => ({
            id: a.id,
            name: a.titleEn,
            description: a.descriptionEn || '',
            icon: getCategoryIcon(a.category),
            xpReward: a.xpReward,
            rarity: a.rarity,
            category: mapCategory(a.category),
            unlocked: false,
            // TODO: Add progress calculation based on requirement
          })),
        ];

        setAchievements(allAchievements);
      } else {
        setError(response.error?.message || 'Failed to load achievements');
      }
    } catch (err) {
      console.error('Error loading achievements:', err);
      setError('An error occurred while loading achievements');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to map category strings
  const mapCategory = (category: string): AchievementCategory => {
    const validCategories = ['lessons', 'vocabulary', 'streak', 'social', 'special'];
    return validCategories.includes(category) ? category as AchievementCategory : 'special';
  };

  // Helper function to get icon based on category
  const getCategoryIcon = (category: string): string => {
    const iconMap: Record<string, string> = {
      lessons: '📚',
      vocabulary: '💬',
      streak: '🔥',
      xp: '⚡',
      review: '🔄',
      perfect: '⭐',
      speed: '⚡',
      special: '✨',
      level: '🎓',
      mastery: '💎',
    };
    return iconMap[category] || '🏆';
  };

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-100 rounded-lg h-32"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-gray-100 rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Achievements</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadAchievements}
            className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const loadAchievementsMock = async () => {
    // Fallback mock data (kept for reference)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock data
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        name: 'First Steps',
        description: 'Complete your first lesson',
        icon: '🎓',
        xpReward: 50,
        rarity: 'common',
        category: 'lessons',
        unlocked: true,
        unlockedAt: '2024-01-15',
      },
      {
        id: '2',
        name: 'Dedicated Learner',
        description: 'Complete 10 lessons',
        icon: '📚',
        xpReward: 200,
        rarity: 'common',
        category: 'lessons',
        unlocked: true,
        unlockedAt: '2024-02-01',
      },
      {
        id: '3',
        name: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: '🔥',
        xpReward: 150,
        rarity: 'rare',
        category: 'streak',
        unlocked: true,
        unlockedAt: '2024-02-10',
      },
      {
        id: '4',
        name: 'Word Master',
        description: 'Learn 100 vocabulary words',
        icon: '💬',
        xpReward: 300,
        rarity: 'rare',
        category: 'vocabulary',
        unlocked: false,
        progress: 67,
        progressMax: 100,
      },
      {
        id: '5',
        name: 'Social Butterfly',
        description: 'Add 5 friends',
        icon: '🦋',
        xpReward: 100,
        rarity: 'common',
        category: 'social',
        unlocked: false,
        progress: 2,
        progressMax: 5,
      },
      {
        id: '6',
        name: 'Month Streak',
        description: 'Maintain a 30-day streak',
        icon: '🏆',
        xpReward: 500,
        rarity: 'epic',
        category: 'streak',
        unlocked: false,
        progress: 21,
        progressMax: 30,
      },
      {
        id: '7',
        name: 'Perfect Score',
        description: 'Get 100% on any lesson',
        icon: '⭐',
        xpReward: 250,
        rarity: 'rare',
        category: 'lessons',
        unlocked: false,
      },
      {
        id: '8',
        name: 'Legend',
        description: 'Reach B2 level',
        icon: '👑',
        xpReward: 1000,
        rarity: 'legendary',
        category: 'special',
        unlocked: false,
      },
    ];

    setAchievements(mockAchievements);
    setLoading(false);
  };

  const filteredAchievements =
    selectedCategory === 'all'
      ? achievements
      : achievements.filter((a) => a.category === selectedCategory);

  // Calculate stats from loaded achievements
  const stats = {
    total: achievements.length,
    unlocked: achievements.filter((a) => a.unlocked).length,
    totalXp: achievements.reduce((sum, a) => sum + (a.unlocked ? a.xpReward : 0), 0),
    maxXp: achievements.reduce((sum, a) => sum + a.xpReward, 0),
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-500';
      case 'rare':
        return 'bg-blue-500';
      case 'epic':
        return 'bg-purple-500';
      case 'legendary':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const categories = [
    { id: 'all' as const, name: 'All', icon: '🏅' },
    { id: 'lessons' as const, name: 'Lessons', icon: '📚' },
    { id: 'vocabulary' as const, name: 'Vocabulary', icon: '💬' },
    { id: 'streak' as const, name: 'Streaks', icon: '🔥' },
    { id: 'social' as const, name: 'Social', icon: '👥' },
    { id: 'special' as const, name: 'Special', icon: '✨' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🏅 Achievements</h1>
        <p className="text-gray-600">
          Unlock achievements and earn XP as you progress in your learning journey
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-primary mb-2">
              {stats.unlocked}/{stats.total}
            </div>
            <div className="text-gray-600">Achievements Unlocked</div>
            <Progress
              value={(stats.unlocked / stats.total) * 100}
              className="mt-3"
            />
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">
              {stats.totalXp}
            </div>
            <div className="text-gray-600">Achievement XP Earned</div>
            <div className="text-sm text-gray-500 mt-1">
              {stats.maxXp} XP total available
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-4xl mb-2">
              {stats.unlocked >= 20 ? '🏆' : stats.unlocked >= 10 ? '🥇' : '🥉'}
            </div>
            <div className="text-gray-600 font-semibold">
              {stats.unlocked >= 20
                ? 'Master Collector'
                : stats.unlocked >= 10
                ? 'Achievement Hunter'
                : 'Getting Started'}
            </div>
            <div className="text-sm text-gray-500 mt-1">Collection Status</div>
          </div>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === cat.id
                ? 'bg-brand-primary text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-brand-primary'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`relative overflow-hidden transition-all hover:shadow-xl ${
              achievement.unlocked
                ? 'border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-white'
                : 'opacity-75 grayscale hover:grayscale-0'
            }`}
          >
            {/* Rarity Badge */}
            <div className="absolute top-3 right-3">
              <div
                className={`${getRarityColor(
                  achievement.rarity
                )} text-white text-xs px-2 py-1 rounded-full font-bold uppercase`}
              >
                {achievement.rarity}
              </div>
            </div>

            {/* Icon */}
            <div className="text-center mb-4">
              <div
                className={`text-6xl mb-2 ${
                  achievement.unlocked ? 'animate-bounce-slow' : ''
                }`}
              >
                {achievement.icon}
              </div>
              {achievement.unlocked && (
                <Badge variant="success" size="sm">
                  ✓ Unlocked
                </Badge>
              )}
            </div>

            {/* Name & Description */}
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              {achievement.name}
            </h3>
            <p className="text-gray-600 text-sm text-center mb-4">
              {achievement.description}
            </p>

            {/* Progress Bar (for locked achievements with progress) */}
            {!achievement.unlocked && achievement.progress !== undefined && (
              <div className="mb-4">
                <Progress
                  value={(achievement.progress / (achievement.progressMax || 100)) * 100}
                />
                <div className="text-xs text-gray-600 text-center mt-1">
                  {achievement.progress} / {achievement.progressMax}
                </div>
              </div>
            )}

            {/* XP Reward */}
            <div className="flex items-center justify-center gap-2 py-3 bg-gray-50 rounded-lg">
              <span className="text-xl">⚡</span>
              <span className="font-bold text-gray-900">
                +{achievement.xpReward} XP
              </span>
            </div>

            {/* Unlock Date (for unlocked achievements) */}
            {achievement.unlocked && achievement.unlockedAt && (
              <div className="text-xs text-gray-500 text-center mt-2">
                Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No achievements in this category yet
          </h3>
          <p className="text-gray-600">
            Keep learning to unlock achievements!
          </p>
        </Card>
      )}

      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

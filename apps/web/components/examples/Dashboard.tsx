/**
 * Example: Dashboard Component
 *
 * Demonstrates how to:
 * - Fetch dashboard data
 * - Display user statistics
 * - Show recent activity feed
 * - Display achievements
 * - Show daily goals and streaks
 *
 * Works seamlessly with both mock and real API data.
 */

'use client';

import { useEffect, useState } from 'react';
import {
  getDashboardData,
  getAchievements,
} from '@/services/progress.service';
import type { DashboardData, Achievement } from '@/types/progress';
import { StreakCalendar } from '@/components/dashboard/StreakCalendar';
import { SkeletonDashboard } from '@/components/ui/Skeleton';

export function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        // Load dashboard data
        const dashboardResponse = await getDashboardData();
        if (dashboardResponse.success && dashboardResponse.data) {
          setDashboard(dashboardResponse.data as DashboardData);
        }

        // Load achievements
        const achievementsResponse = await getAchievements();
        if (achievementsResponse.success && achievementsResponse.data) {
          setAchievements(achievementsResponse.data.achievements);
        }
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <SkeletonDashboard />
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600">Failed to load dashboard</p>
        </div>
      </div>
    );
  }

  const { user, stats, recentActivity, upcomingReviews, dailyGoalProgress } = dashboard;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.displayName}! 👋
        </h1>
        <p className="text-gray-600">Here's your learning progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total XP"
          value={stats.totalXp.toLocaleString()}
          icon="⚡"
          color="bg-yellow-100 text-yellow-600"
        />
        <StatCard
          title="Current Level"
          value={stats.currentLevel}
          icon="🎯"
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Lessons Completed"
          value={stats.lessonsCompleted}
          icon="📚"
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="Vocabulary Learned"
          value={stats.vocabularyLearned}
          icon="💬"
          color="bg-purple-100 text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Streak Card */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Current Streak</h3>
            <span className="text-4xl">🔥</span>
          </div>
          <div className="text-5xl font-bold mb-2">{stats.currentStreak}</div>
          <div className="text-orange-100">
            days in a row • Longest: {stats.longestStreak} days
          </div>
        </div>

        {/* Daily Goal Progress */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Daily Goal</h3>
            <span className="text-2xl font-bold text-blue-600">
              {dailyGoalProgress?.percentage || 0}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${dailyGoalProgress?.percentage || 0}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {dailyGoalProgress?.current || 0} / {dailyGoalProgress?.target || 200} XP
            </span>
            <span>
              {(dailyGoalProgress?.target || 200) - (dailyGoalProgress?.current || 0)} XP to goal
            </span>
          </div>
        </div>
      </div>

      {/* Streak Calendar */}
      <div className="mb-8">
        <StreakCalendar
          dailyActivities={dashboard.dailyActivities || []}
          language="en"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>

          {recentActivity && recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {activity.type === 'lesson_completed' && '📚'}
                    {activity.type === 'achievement_unlocked' && '🏆'}
                    {activity.type === 'vocabulary_mastered' && '💬'}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {activity.type === 'lesson_completed' && 'Lesson Completed'}
                      {activity.type === 'achievement_unlocked' && 'Achievement Unlocked'}
                      {activity.type === 'vocabulary_mastered' && 'Vocabulary Mastered'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {JSON.stringify(activity.data)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(activity.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">
              No recent activity yet. Start learning!
            </p>
          )}

          {upcomingReviews > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">⏰</span>
                <span className="text-sm text-yellow-800">
                  <strong>{upcomingReviews}</strong> vocabulary words due for review
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Achievements */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Achievements
          </h3>

          <div className="grid grid-cols-3 gap-3">
            {achievements.slice(0, 6).map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg text-center ${
                  achievement.unlocked
                    ? 'bg-yellow-50 border-2 border-yellow-300'
                    : 'bg-gray-50 border border-gray-200 opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="text-xs font-medium text-gray-900 truncate">
                  {achievement.name}
                </div>
                {achievement.unlocked && (
                  <div className="text-xs text-yellow-600 mt-1">
                    +{achievement.xpReward} XP
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
            View All Achievements
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          📚 Continue Learning
        </button>
        <button className="p-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
          💬 Review Vocabulary
        </button>
        <button className="p-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
          🎯 Take Practice Exam
        </button>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <span className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-xl`}>
          {icon}
        </span>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

export default Dashboard;

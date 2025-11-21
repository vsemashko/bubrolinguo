import React from 'react';
import { Card, Badge } from '@/components/ui';
import { RecentActivity as RecentActivityType } from '@/types/progress';

interface RecentActivityProps {
  activities: RecentActivityType[];
  language: 'en' | 'ru';
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities,
  language,
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson_completed':
        return (
          <div className="bg-blue-100 p-2 rounded-lg">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      case 'vocabulary_reviewed':
        return (
          <div className="bg-purple-100 p-2 rounded-lg">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        );
      case 'achievement_unlocked':
        return (
          <div className="bg-yellow-100 p-2 rounded-lg">
            <svg
              className="w-5 h-5 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
        );
      case 'level_up':
        return (
          <div className="bg-green-100 p-2 rounded-lg">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-2 rounded-lg">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
    }
  };

  const getActivityText = (activity: RecentActivityType): string => {
    const { type, metadata } = activity;

    switch (type) {
      case 'lesson_completed':
        return language === 'en'
          ? `Completed "${metadata.lessonTitle}" (${metadata.score}%)`
          : `Завершил "${metadata.lessonTitle}" (${metadata.score}%)`;
      case 'vocabulary_reviewed':
        return language === 'en'
          ? `Reviewed ${metadata.wordsReviewed} vocabulary words`
          : `Повторил ${metadata.wordsReviewed} слов`;
      case 'achievement_unlocked':
        return language === 'en'
          ? `Unlocked "${metadata.achievementTitle}"`
          : `Разблокирована "${metadata.achievementTitle}"`;
      case 'level_up':
        return language === 'en'
          ? `Reached ${metadata.newLevel} level!`
          : `Достиг уровня ${metadata.newLevel}!`;
      default:
        return language === 'en' ? 'Activity' : 'Активность';
    }
  };

  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMs = now.getTime() - activityTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) {
      return language === 'en' ? 'Just now' : 'Только что';
    } else if (diffMins < 60) {
      return language === 'en'
        ? `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
        : `${diffMins} мин назад`;
    } else if (diffHours < 24) {
      return language === 'en'
        ? `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
        : `${diffHours} ч назад`;
    } else if (diffDays < 7) {
      return language === 'en'
        ? `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
        : `${diffDays} дн назад`;
    } else {
      return activityTime.toLocaleDateString(
        language === 'en' ? 'en-US' : 'ru-RU'
      );
    }
  };

  if (activities.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {language === 'en' ? 'Recent Activity' : 'Недавняя активность'}
        </h3>
        <div className="text-center py-8">
          <p className="text-gray-500">
            {language === 'en'
              ? 'No recent activity. Start learning!'
              : 'Нет недавней активности. Начните учиться!'}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        {language === 'en' ? 'Recent Activity' : 'Недавняя активность'}
      </h3>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
          >
            {getActivityIcon(activity.type)}

            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 mb-1">
                {getActivityText(activity)}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-500">
                  {formatTimeAgo(activity.timestamp)}
                </p>
                {activity.metadata.xpEarned && (
                  <Badge variant="primary" size="sm">
                    +{activity.metadata.xpEarned} XP
                  </Badge>
                )}
              </div>
            </div>

            {/* Action Button */}
            {activity.type === 'lesson_completed' && (
              <button
                className="text-xs text-brand-primary hover:text-brand-primary/80 font-medium whitespace-nowrap"
              >
                {language === 'en' ? 'Review' : 'Повторить'}
              </button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivity;

import React from 'react';
import { Card, Badge, Progress } from '@/components/ui';
import { Achievement } from '@/types/progress';

interface AchievementsDisplayProps {
  achievements: Achievement[];
  language: 'en' | 'ru';
  showAll?: boolean;
}

export const AchievementsDisplay: React.FC<AchievementsDisplayProps> = ({
  achievements,
  language,
  showAll = false,
}) => {
  const unlockedAchievements = achievements.filter((a) => a.unlockedAt);
  const lockedAchievements = achievements.filter((a) => !a.unlockedAt);

  const displayAchievements = showAll
    ? achievements
    : [...unlockedAchievements.slice(0, 3), ...lockedAchievements.slice(0, 3)];

  const getAchievementTitle = (achievement: Achievement): string => {
    return language === 'en' ? achievement.titleEn : achievement.titleRu;
  };

  const getAchievementDescription = (achievement: Achievement): string => {
    return language === 'en'
      ? achievement.descriptionEn
      : achievement.descriptionRu;
  };

  const getAchievementIcon = (code: string): string => {
    const icons: Record<string, string> = {
      first_lesson: '🎯',
      streak_7: '🔥',
      streak_30: '⚡',
      words_100: '📚',
      words_1000: '📖',
      perfect_lesson: '💯',
      reach_a2: '🎓',
      reach_b1: '🏆',
      early_bird: '🌅',
      night_owl: '🦉',
    };
    return icons[code] || '⭐';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(
      language === 'en' ? 'en-US' : 'ru-RU',
      { month: 'short', day: 'numeric', year: 'numeric' }
    );
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          {language === 'en' ? 'Achievements' : 'Достижения'}
        </h3>
        <Badge variant="primary" size="sm">
          {unlockedAchievements.length}/{achievements.length}
        </Badge>
      </div>

      {achievements.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {language === 'en'
              ? 'No achievements yet'
              : 'Пока нет достижений'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayAchievements.map((achievement) => {
            const isUnlocked = !!achievement.unlockedAt;
            const hasProgress = achievement.progress !== undefined;

            return (
              <div
                key={achievement.id}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  isUnlocked
                    ? 'border-brand-primary bg-brand-primary/5'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                } hover:shadow-md`}
              >
                {/* Lock Overlay */}
                {!isUnlocked && (
                  <div className="absolute top-2 right-2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                )}

                {/* Icon */}
                <div className="text-center mb-3">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-3xl ${
                      isUnlocked
                        ? `bg-gradient-to-br from-yellow-400 to-orange-500`
                        : 'bg-gray-300'
                    }`}
                  >
                    {getAchievementIcon(achievement.code)}
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-center text-gray-900 mb-1">
                  {getAchievementTitle(achievement)}
                </h4>

                {/* Description */}
                <p className="text-xs text-center text-gray-600 mb-3">
                  {getAchievementDescription(achievement)}
                </p>

                {/* Progress Bar (for locked achievements) */}
                {!isUnlocked && hasProgress && (
                  <div className="mb-2">
                    <Progress
                      value={achievement.progress!}
                      size="sm"
                      showLabel={false}
                    />
                    <p className="text-xs text-center text-gray-500 mt-1">
                      {achievement.progress}%{' '}
                      {language === 'en' ? 'complete' : 'завершено'}
                    </p>
                  </div>
                )}

                {/* Unlock Date / XP Reward */}
                <div className="text-center">
                  {isUnlocked ? (
                    <p className="text-xs text-gray-500">
                      {language === 'en' ? 'Unlocked' : 'Разблокировано'}{' '}
                      {formatDate(achievement.unlockedAt!)}
                    </p>
                  ) : (
                    <Badge variant="warning" size="sm">
                      +{achievement.xpReward} XP
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!showAll && achievements.length > 6 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-brand-primary hover:text-brand-primary/80 font-medium">
            {language === 'en' ? 'View all achievements' : 'Показать все достижения'} →
          </button>
        </div>
      )}
    </Card>
  );
};

export default AchievementsDisplay;

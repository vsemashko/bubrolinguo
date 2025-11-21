import React from 'react';
import { Card, Progress, Badge } from '@/components/ui';
import { LevelProgress } from '@/types/progress';

interface LevelProgressCardProps {
  levels: LevelProgress[];
  currentLevel: string;
  language: 'en' | 'ru';
}

export const LevelProgressCard: React.FC<LevelProgressCardProps> = ({
  levels,
  currentLevel,
  language,
}) => {
  const getLevelColor = (level: string) => {
    const colors: Record<string, 'success' | 'warning' | 'error'> = {
      A1: 'success',
      A2: 'success',
      B1: 'warning',
      B2: 'warning',
      C1: 'error',
    };
    return colors[level] || 'success';
  };

  const getLevelDescription = (level: string): string => {
    const descriptions: Record<string, { en: string; ru: string }> = {
      A1: {
        en: 'Beginner - Basic phrases',
        ru: 'Начальный - Базовые фразы',
      },
      A2: {
        en: 'Elementary - Everyday expressions',
        ru: 'Элементарный - Повседневные выражения',
      },
      B1: {
        en: 'Intermediate - Clear standard input',
        ru: 'Средний - Стандартная речь',
      },
      B2: {
        en: 'Upper Intermediate - Complex texts',
        ru: 'Выше среднего - Сложные тексты',
      },
      C1: {
        en: 'Advanced - Fluent and spontaneous',
        ru: 'Продвинутый - Свободное общение',
      },
    };
    return descriptions[level]?.[language] || level;
  };

  return (
    <Card>
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        {language === 'en' ? 'Learning Path' : 'Путь обучения'}
      </h3>

      <div className="space-y-4">
        {levels.map((level, index) => {
          const isCurrentLevel = level.level === currentLevel;
          const isUnlocked = level.unlocked;
          const isCompleted = level.progress === 100;

          return (
            <div key={level.level}>
              {/* Level Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {/* Status Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-500'
                        : isCurrentLevel
                        ? 'bg-brand-primary'
                        : isUnlocked
                        ? 'bg-gray-300'
                        : 'bg-gray-200'
                    }`}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : isUnlocked ? (
                      <span className="text-white font-bold">
                        {level.level}
                      </span>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-500"
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
                    )}
                  </div>

                  {/* Level Info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900">
                        {level.level}
                      </h4>
                      {isCurrentLevel && (
                        <Badge variant="primary" size="sm">
                          {language === 'en' ? 'Current' : 'Текущий'}
                        </Badge>
                      )}
                      {isCompleted && (
                        <Badge variant="success" size="sm">
                          {language === 'en' ? 'Completed' : 'Завершено'}
                        </Badge>
                      )}
                      {!isUnlocked && (
                        <Badge variant="default" size="sm">
                          {language === 'en' ? 'Locked' : 'Заблокирован'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">
                      {getLevelDescription(level.level)}
                    </p>
                  </div>
                </div>

                {/* Lessons Count */}
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {level.lessonsCompleted}/{level.totalLessons}
                  </p>
                  <p className="text-xs text-gray-600">
                    {language === 'en' ? 'lessons' : 'уроков'}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              {isUnlocked && (
                <Progress
                  value={level.progress}
                  size="sm"
                  color={isCompleted ? 'success' : 'primary'}
                  showLabel={false}
                />
              )}

              {/* Connector Line */}
              {index < levels.length - 1 && (
                <div className="flex justify-center my-2">
                  <div
                    className={`w-0.5 h-6 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default LevelProgressCard;

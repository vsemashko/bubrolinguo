import React from 'react';
import Link from 'next/link';
import { Card, Badge, Progress } from '@/components/ui';
import { CEFRLevel } from '@/types/lesson';

export interface LessonCardData {
  id: string;
  lessonNumber: number;
  level: CEFRLevel;
  titleEn: string;
  titleRu: string;
  descriptionEn: string;
  descriptionRu: string;
  xpReward: number;
  estimatedDuration?: number;
  exerciseCount: number;
  userProgress?: {
    status: 'not_started' | 'in_progress' | 'completed';
    score?: number;
    completedAt?: string;
  };
  isLocked: boolean;
}

interface LessonCardProps {
  lesson: LessonCardData;
  language: 'en' | 'ru';
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, language }) => {
  const title = language === 'en' ? lesson.titleEn : lesson.titleRu;
  const description = language === 'en' ? lesson.descriptionEn : lesson.descriptionRu;
  const status = lesson.userProgress?.status || 'not_started';
  const score = lesson.userProgress?.score;

  const getLevelColor = (level: CEFRLevel) => {
    const colors: Record<CEFRLevel, 'success' | 'warning' | 'error'> = {
      A1: 'success',
      A2: 'success',
      B1: 'warning',
      B2: 'warning',
      C1: 'error',
    };
    return colors[level];
  };

  const getStatusIcon = () => {
    if (lesson.isLocked) {
      return (
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-500"
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
      );
    }

    if (status === 'completed') {
      return (
        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-white"
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
        </div>
      );
    }

    if (status === 'in_progress') {
      return (
        <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {lesson.lessonNumber}
          </span>
        </div>
      );
    }

    return (
      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
        <span className="text-gray-700 font-bold text-sm">
          {lesson.lessonNumber}
        </span>
      </div>
    );
  };

  const cardContent = (
    <Card
      hover={!lesson.isLocked}
      className={`${lesson.isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="flex items-start gap-4">
        {/* Status Icon */}
        {getStatusIcon()}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={getLevelColor(lesson.level)} size="sm">
                  {lesson.level}
                </Badge>
                {status === 'completed' && score && (
                  <Badge variant="success" size="sm">
                    {score}%
                  </Badge>
                )}
                {lesson.isLocked && (
                  <Badge variant="default" size="sm">
                    {language === 'en' ? 'Locked' : 'Заблокирован'}
                  </Badge>
                )}
              </div>
              <h3 className="font-bold text-lg text-gray-900 truncate">
                {title}
              </h3>
            </div>

            {/* XP Reward */}
            {!lesson.isLocked && (
              <div className="text-right">
                <div className="text-sm font-bold text-brand-primary">
                  +{lesson.xpReward}
                </div>
                <div className="text-xs text-gray-500">XP</div>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span>
                {lesson.exerciseCount}{' '}
                {language === 'en' ? 'exercises' : 'упражнений'}
              </span>
            </div>

            {lesson.estimatedDuration && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  {lesson.estimatedDuration}{' '}
                  {language === 'en' ? 'min' : 'мин'}
                </span>
              </div>
            )}
          </div>

          {/* Progress Bar (for in-progress lessons) */}
          {status === 'in_progress' && (
            <div className="mt-3">
              <Progress
                value={50}
                size="sm"
                showLabel={false}
                color="primary"
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  if (lesson.isLocked) {
    return cardContent;
  }

  return (
    <Link href={`/lessons/${lesson.id}`}>
      {cardContent}
    </Link>
  );
};

export default LessonCard;

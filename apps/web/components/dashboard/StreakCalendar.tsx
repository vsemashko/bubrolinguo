'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { DailyActivity } from '@/types/progress';

interface StreakCalendarProps {
  dailyActivities: DailyActivity[];
  language: 'en' | 'ru';
}

export const StreakCalendar: React.FC<StreakCalendarProps> = ({
  dailyActivities,
  language,
}) => {
  // Get last 30 days
  const getLast30Days = () => {
    const days = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }

    return days;
  };

  const last30Days = getLast30Days();

  const getActivityForDate = (date: string): DailyActivity | undefined => {
    return dailyActivities.find((activity) =>
      activity.date.split('T')[0] === date
    );
  };

  const getIntensityColor = (xp: number): string => {
    if (xp === 0) return 'bg-gray-100';
    if (xp < 25) return 'bg-green-200';
    if (xp < 50) return 'bg-green-400';
    if (xp < 100) return 'bg-green-600';
    return 'bg-green-800';
  };

  const getDayName = (date: string): string => {
    const d = new Date(date);
    const days = language === 'en'
      ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      : ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return days[d.getDay()];
  };

  const getMonthName = (date: string): string => {
    const d = new Date(date);
    const months = language === 'en'
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      : ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    return months[d.getMonth()];
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          {language === 'en' ? 'Activity Streak' : 'Активность'}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>{language === 'en' ? 'Less' : 'Меньше'}</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-800 rounded-sm"></div>
          </div>
          <span>{language === 'en' ? 'More' : 'Больше'}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-[repeat(30,1fr)] gap-1 min-w-max">
          {last30Days.map((date) => {
            const activity = getActivityForDate(date);
            const xp = activity?.xpEarned || 0;
            const intensity = getIntensityColor(xp);

            return (
              <div
                key={date}
                className="group relative"
              >
                <div
                  className={`w-4 h-4 ${intensity} rounded-sm cursor-pointer transition-transform hover:scale-125`}
                  title={`${date}: ${xp} XP`}
                />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                    <div className="font-semibold">{getMonthName(date)} {new Date(date).getDate()}</div>
                    <div className="text-gray-300">{xp} XP</div>
                    {activity && (
                      <div className="text-gray-300 text-xs mt-1">
                        {activity.lessonsCompleted} {language === 'en' ? 'lessons' : 'уроков'}
                      </div>
                    )}
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Week labels */}
      <div className="mt-2 grid grid-cols-[repeat(30,1fr)] gap-1 min-w-max">
        {last30Days.map((date, index) => (
          <div key={date} className="text-[8px] text-gray-500 text-center">
            {index % 7 === 0 ? getDayName(date) : ''}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StreakCalendar;

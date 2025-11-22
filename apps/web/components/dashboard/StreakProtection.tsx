/**
 * StreakProtection Component
 *
 * UI for managing streak freezes and repairs
 * Premium feature that allows users to protect their streak
 * Now integrated with real API data
 */

'use client';

import React, { useState } from 'react';
import { Card, Button } from '@/components/ui';
import { useToast } from '@/components/ui/ToastContainer';
import { useAuth } from '@/contexts/AuthContext';
import { activateStreakFreeze, repairStreak } from '@/services/streak.service';

interface StreakProtectionProps {
  freezesAvailable: number;
  canRepairStreak?: boolean;
  brokenDaysAgo?: number;
  language?: 'en' | 'ru';
  onUpdate?: () => void; // Callback to refresh parent data after actions
}

export function StreakProtection({
  freezesAvailable,
  canRepairStreak = false,
  brokenDaysAgo = 0,
  language = 'en',
  onUpdate,
}: StreakProtectionProps) {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [isActivating, setIsActivating] = useState(false);

  // If no user, don't allow actions
  if (!user) {
    return null;
  }

  const t = language === 'en' ? {
    title: 'Streak Protection',
    freezeTitle: 'Streak Freeze',
    freezeDesc: 'Protect your streak for one day',
    freezesAvailable: 'Available',
    activateFreeze: 'Activate Freeze',
    repairTitle: 'Repair Streak',
    repairDesc: 'Restore your broken streak',
    repairButton: 'Repair Streak',
    brokenAgo: 'Broken',
    daysAgo: 'days ago',
    premium: 'Premium',
    how: 'How it works',
    freezeInfo: 'Use a streak freeze to protect your streak if you miss a day. The freeze will be automatically consumed if you don\'t practice.',
    repairInfo: 'Repair your streak within 24 hours of breaking it. This will restore your streak as if you never missed a day.',
    getMore: 'Get More Freezes',
  } : {
    title: 'Защита серии',
    freezeTitle: 'Заморозка серии',
    freezeDesc: 'Защитить вашу серию на один день',
    freezesAvailable: 'Доступно',
    activateFreeze: 'Активировать заморозку',
    repairTitle: 'Восстановить серию',
    repairDesc: 'Восстановить прерванную серию',
    repairButton: 'Восстановить',
    brokenAgo: 'Прервана',
    daysAgo: 'дней назад',
    premium: 'Премиум',
    how: 'Как это работает',
    freezeInfo: 'Используйте заморозку для защиты серии, если пропустите день. Заморозка будет автоматически использована.',
    repairInfo: 'Восстановите серию в течение 24 часов после перерыва. Это восстановит серию, как будто вы не пропускали.',
    getMore: 'Получить больше',
  };

  const handleActivateFreeze = async () => {
    if (freezesAvailable <= 0) {
      showToast('No streak freezes available', 'error');
      return;
    }

    setIsActivating(true);
    try {
      const response = await activateStreakFreeze(user.id);

      if (response.success && response.data) {
        showToast(response.data.message || 'Streak freeze activated! Your streak is protected for tomorrow.', 'success');
        // Refresh streak data
        if (onUpdate) {
          onUpdate();
        }
      } else {
        showToast(response.error?.message || 'Failed to activate streak freeze', 'error');
      }
    } catch (error) {
      showToast('Failed to activate streak freeze', 'error');
      console.error('Freeze activation error:', error);
    } finally {
      setIsActivating(false);
    }
  };

  const handleRepairStreak = async () => {
    setIsActivating(true);
    try {
      const response = await repairStreak(user.id);

      if (response.success && response.data) {
        showToast(response.data.message || 'Streak repaired successfully! Keep it going! 🔥', 'success');
        // Refresh streak data
        if (onUpdate) {
          onUpdate();
        }
      } else {
        showToast(response.error?.message || 'Failed to repair streak', 'error');
      }
    } catch (error) {
      showToast('Failed to repair streak', 'error');
      console.error('Repair streak error:', error);
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">{t.title}</h3>
        <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
          {t.premium}
        </span>
      </div>

      <div className="space-y-4">
        {/* Streak Freeze */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-200">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🛡️</span>
                <h4 className="font-bold text-gray-900">{t.freezeTitle}</h4>
              </div>
              <p className="text-sm text-gray-600">{t.freezeDesc}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{freezesAvailable}</div>
              <div className="text-xs text-gray-600">{t.freezesAvailable}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleActivateFreeze}
              disabled={freezesAvailable <= 0 || isActivating}
              className="flex-1"
            >
              {isActivating ? 'Activating...' : t.activateFreeze}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => showToast('Get more freezes in Premium settings', 'info')}
              className="whitespace-nowrap"
            >
              {t.getMore}
            </Button>
          </div>
        </div>

        {/* Streak Repair (only shown if available) */}
        {canRepairStreak && brokenDaysAgo <= 1 && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border-2 border-orange-300 animate-pulse-glow">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">🔧</span>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">{t.repairTitle}</h4>
                <p className="text-sm text-gray-600 mb-1">{t.repairDesc}</p>
                <p className="text-xs font-semibold text-orange-600">
                  {t.brokenAgo} {brokenDaysAgo} {t.daysAgo}
                </p>
              </div>
            </div>

            <Button
              size="sm"
              variant="primary"
              onClick={handleRepairStreak}
              disabled={isActivating}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              {isActivating ? 'Repairing...' : t.repairButton}
            </Button>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">{t.how}</h4>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex gap-2">
              <span className="text-blue-500">🛡️</span>
              <p>{t.freezeInfo}</p>
            </div>
            <div className="flex gap-2">
              <span className="text-orange-500">🔧</span>
              <p>{t.repairInfo}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default StreakProtection;

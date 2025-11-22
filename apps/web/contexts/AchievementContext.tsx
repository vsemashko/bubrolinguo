'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AchievementUnlockModal } from '@/components/achievements/AchievementUnlockModal';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementContextType {
  unlockAchievement: (achievement: Achievement) => void;
  queuedAchievements: Achievement[];
}

const AchievementContext = createContext<AchievementContextType | undefined>(
  undefined
);

export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const [queuedAchievements, setQueuedAchievements] = useState<Achievement[]>([]);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const unlockAchievement = useCallback((achievement: Achievement) => {
    setQueuedAchievements((prev) => [...prev, achievement]);
  }, []);

  const showNextAchievement = useCallback(() => {
    if (queuedAchievements.length > 0 && !isModalOpen) {
      const [next, ...rest] = queuedAchievements;
      setCurrentAchievement(next);
      setQueuedAchievements(rest);
      setIsModalOpen(true);
    }
  }, [queuedAchievements, isModalOpen]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentAchievement(null);

    // Show next achievement after a short delay
    setTimeout(() => {
      showNextAchievement();
    }, 500);
  }, [showNextAchievement]);

  // Auto-show achievements from queue
  React.useEffect(() => {
    showNextAchievement();
  }, [queuedAchievements.length]);

  return (
    <AchievementContext.Provider value={{ unlockAchievement, queuedAchievements }}>
      {children}
      <AchievementUnlockModal
        achievement={currentAchievement}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </AchievementContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementContext);
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
}

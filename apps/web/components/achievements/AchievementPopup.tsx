/**
 * AchievementPopup Component
 *
 * Animated celebration popup that appears when user unlocks an achievement
 * Features confetti, trophy animations, and achievement details
 */

'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface AchievementPopupProps {
  achievement: {
    id: string;
    name: string;
    description: string;
    icon: string;
    xpReward: number;
    rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  };
  isOpen: boolean;
  onClose: () => void;
  autoCloseDelay?: number;
}

export function AchievementPopup({
  achievement,
  isOpen,
  onClose,
  autoCloseDelay = 5000,
}: AchievementPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([]);

  useEffect(() => {
    if (isOpen) {
      // Generate confetti
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: ['#FFD700', '#FF6B35', '#06D6A0', '#4ECDC4', '#FF006E'][Math.floor(Math.random() * 5)],
      }));
      setConfetti(newConfetti);

      // Trigger entrance animation
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);

      // Auto close
      if (autoCloseDelay > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoCloseDelay);
        return () => clearTimeout(timer);
      }
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen, autoCloseDelay]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getRarityColors = (rarity: string = 'common') => {
    const colors = {
      common: 'from-gray-400 to-gray-600',
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-yellow-400 via-orange-500 to-red-600',
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  const getRarityGlow = (rarity: string = 'common') => {
    const glows = {
      common: 'shadow-gray-400/50',
      rare: 'shadow-blue-500/50',
      epic: 'shadow-purple-500/50',
      legendary: 'shadow-yellow-500/50',
    };
    return glows[rarity as keyof typeof glows] || glows.common;
  };

  if (!isVisible) {return null;}

  const popup = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isAnimating ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((conf) => (
          <div
            key={conf.id}
            className="absolute top-0 w-2 h-2 rounded-full animate-confetti"
            style={{
              left: `${conf.left}%`,
              backgroundColor: conf.color,
              animationDelay: `${conf.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Popup Card */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transition-all duration-300 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        {/* Gradient Header */}
        <div className={`bg-gradient-to-r ${getRarityColors(achievement.rarity)} p-6 text-white relative overflow-hidden`}>
          {/* Sparkle effects */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-white animate-shimmer"></div>
          </div>

          <div className="relative z-10 text-center">
            <div className="inline-block mb-3">
              <div
                className={`text-7xl animate-bounce-gentle drop-shadow-lg ${getRarityGlow(achievement.rarity)}`}
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))',
                }}
              >
                {achievement.icon}
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-1 drop-shadow-md">
              Achievement Unlocked!
            </h2>
            <p className="text-white/90 text-sm uppercase tracking-wider font-semibold">
              {achievement.rarity || 'Achievement'}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            {achievement.name}
          </h3>
          <p className="text-gray-600 text-center mb-4">
            {achievement.description}
          </p>

          {/* XP Reward */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border-2 border-yellow-200 mb-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl">⚡</span>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  +{achievement.xpReward} XP
                </div>
                <div className="text-xs text-gray-600">Experience Points Earned</div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Awesome! 🎉
          </button>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-tr-full"></div>
      </div>
    </div>
  );

  // Render in portal for proper z-index
  return typeof window !== 'undefined' ? createPortal(popup, document.body) : null;
}

/**
 * AchievementNotification Component
 * Smaller, toast-style notification for achievements (less intrusive)
 */
interface AchievementNotificationProps {
  achievement: {
    name: string;
    icon: string;
    xpReward: number;
  };
  isOpen: boolean;
  onClose: () => void;
  position?: 'top' | 'bottom';
}

export function AchievementNotification({
  achievement,
  isOpen,
  onClose,
  position = 'top',
}: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) {return null;}

  const positionClasses = position === 'top'
    ? 'top-4'
    : 'bottom-4';

  return createPortal(
    <div className={`fixed ${positionClasses} right-4 z-50 max-w-sm transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg shadow-2xl p-4 flex items-center gap-4 animate-bounce-gentle">
        <div className="text-4xl">{achievement.icon}</div>
        <div className="flex-1">
          <div className="font-bold text-sm">Achievement Unlocked!</div>
          <div className="text-white/90">{achievement.name}</div>
          <div className="text-xs text-white/80">+{achievement.xpReward} XP</div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/80 hover:text-white text-xl"
        >
          ×
        </button>
      </div>
    </div>,
    document.body
  );
}

export default AchievementPopup;

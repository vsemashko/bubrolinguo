'use client';

import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/ui';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementUnlockModalProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
}

const rarityColors = {
  common: {
    bg: 'from-gray-500 to-gray-700',
    glow: 'shadow-gray-500/50',
    text: 'text-gray-900',
  },
  rare: {
    bg: 'from-blue-500 to-blue-700',
    glow: 'shadow-blue-500/50',
    text: 'text-blue-900',
  },
  epic: {
    bg: 'from-purple-500 to-purple-700',
    glow: 'shadow-purple-500/50',
    text: 'text-purple-900',
  },
  legendary: {
    bg: 'from-yellow-400 to-orange-500',
    glow: 'shadow-yellow-500/50',
    text: 'text-yellow-900',
  },
};

export function AchievementUnlockModal({
  achievement,
  isOpen,
  onClose,
}: AchievementUnlockModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen && achievement) {
      setIsAnimating(true);
      setShowConfetti(true);

      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, achievement]);

  const handleClose = () => {
    setIsAnimating(false);
    setShowConfetti(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!achievement) {return null;}

  const colors = rarityColors[achievement.rarity];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div className="relative overflow-hidden">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'][
                    Math.floor(Math.random() * 5)
                  ],
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className={`text-center py-8 transition-all duration-500 ${
            isAnimating ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        >
          {/* Achievement Unlocked Badge */}
          <div className="mb-6">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
              <span className="text-white font-bold text-lg tracking-wide">
                🎉 ACHIEVEMENT UNLOCKED! 🎉
              </span>
            </div>
          </div>

          {/* Icon with Glow Effect */}
          <div className="mb-6 flex justify-center">
            <div
              className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${colors.bg} ${colors.glow} shadow-2xl flex items-center justify-center transform transition-transform duration-700 ${
                isAnimating ? 'rotate-0 scale-100' : 'rotate-180 scale-0'
              }`}
            >
              <span className="text-6xl animate-bounce">{achievement.icon}</span>

              {/* Rotating Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-spin-slow"></div>
            </div>
          </div>

          {/* Achievement Name */}
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {achievement.name}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-lg mb-6 px-4">
            {achievement.description}
          </p>

          {/* Rarity Badge */}
          <div className="mb-6">
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-bold uppercase bg-gradient-to-r ${colors.bg} text-white shadow-md`}
            >
              {achievement.rarity}
            </span>
          </div>

          {/* XP Reward */}
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mx-auto max-w-xs">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="text-2xl font-bold text-yellow-600">
                +{achievement.xpReward} XP
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Awesome!
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotateZ(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-confetti {
          animation: confetti linear forwards;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </Modal>
  );
}

export default AchievementUnlockModal;

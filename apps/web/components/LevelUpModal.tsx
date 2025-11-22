'use client';

import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/ui';
import confetti from 'canvas-confetti';

interface LevelUpModalProps {
  isOpen: boolean;
  oldLevel: string;
  newLevel: string;
  onClose: () => void;
}

const LEVEL_DESCRIPTIONS: Record<string, { title: string; description: string }> = {
  A1: {
    title: 'Beginner',
    description: 'You can understand and use familiar everyday expressions!',
  },
  A2: {
    title: 'Elementary',
    description: 'You can communicate in simple and routine tasks!',
  },
  B1: {
    title: 'Intermediate',
    description: 'You can deal with most situations while traveling!',
  },
  B2: {
    title: 'Upper Intermediate',
    description: 'You can interact with a degree of fluency and spontaneity!',
  },
  C1: {
    title: 'Advanced',
    description: 'You can express yourself fluently and spontaneously!',
  },
  C2: {
    title: 'Proficient',
    description: 'You have mastered the Polish language! Congratulations!',
  },
};

export default function LevelUpModal({ isOpen, oldLevel, newLevel, onClose }: LevelUpModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      // Trigger confetti
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen) return null;

  const levelInfo = LEVEL_DESCRIPTIONS[newLevel] || LEVEL_DESCRIPTIONS.A1;

  return (
    <Modal
      isOpen={show}
      onClose={handleClose}
      title=""
      maxWidth="max-w-2xl"
    >
      <div className="text-center py-8 px-6">
        {/* Trophy/Star Icon */}
        <div className="mb-6">
          <div className="inline-block p-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl animate-bounce">
            <svg
              className="w-20 h-20 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        {/* Level Up Message */}
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Level Up!
        </h2>
        <p className="text-xl text-gray-600 mb-6">
          Congratulations! You've advanced to
        </p>

        {/* New Level Badge */}
        <div className="mb-6">
          <div className="inline-block px-12 py-6 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
            <div className="text-6xl font-black text-white mb-2">
              {newLevel}
            </div>
            <div className="text-2xl font-semibold text-white opacity-90">
              {levelInfo.title}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
          {levelInfo.description}
        </p>

        {/* Old Level → New Level Visual */}
        <div className="flex items-center justify-center gap-4 mb-8 text-sm text-gray-600">
          <div className="px-6 py-3 bg-gray-200 rounded-lg">
            <span className="font-semibold">{oldLevel}</span>
          </div>
          <svg
            className="w-6 h-6 text-brand-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg">
            {newLevel}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleClose}
          className="px-8 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-dark transition-colors shadow-lg"
        >
          Continue Learning →
        </button>
      </div>
    </Modal>
  );
}

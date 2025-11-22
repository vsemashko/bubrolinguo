/**
 * StreakFireIcon Component
 *
 * Animated fire icon that pulses and glows when streak is active.
 * Adds visual excitement to streak tracking.
 */

'use client';

import React from 'react';

interface StreakFireIconProps {
  streakDays: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export function StreakFireIcon({
  streakDays,
  size = 'md',
  animated = true,
  className = '',
}: StreakFireIconProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl',
  };

  const glowIntensity = Math.min(streakDays / 10, 3); // Max 3 levels of glow

  // Determine fire intensity based on streak length
  const getFireEmoji = () => {
    if (streakDays === 0) {return '🔥';}
    if (streakDays < 7) {return '🔥';}
    if (streakDays < 30) {return '🔥🔥';}
    if (streakDays < 100) {return '🔥🔥🔥';}
    return '🔥🔥🔥🔥';
  };

  const getGlowColor = () => {
    if (streakDays === 0) {return 'rgba(156, 163, 175, 0.3)';} // gray for no streak
    if (streakDays < 7) {return 'rgba(251, 146, 60, 0.5)';} // orange
    if (streakDays < 30) {return 'rgba(239, 68, 68, 0.6)';} // red
    if (streakDays < 100) {return 'rgba(220, 38, 38, 0.7)';} // dark red
    return 'rgba(153, 27, 27, 0.8)'; // darkest red for epic streaks
  };

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        filter: animated ? `drop-shadow(0 0 ${glowIntensity * 4}px ${getGlowColor()})` : 'none',
      }}
    >
      <span
        className={`
          ${sizeClasses[size]}
          ${animated && streakDays > 0 ? 'animate-pulse-glow' : ''}
          ${streakDays === 0 ? 'opacity-30 grayscale' : ''}
          inline-block
        `}
        style={{
          animationDuration: animated ? `${Math.max(0.8, 2 - streakDays / 50)}s` : undefined,
        }}
      >
        {streakDays === 0 ? '💤' : getFireEmoji()}
      </span>
    </div>
  );
}

/**
 * StreakFlame Component
 * Alternative flame visualization using SVG for more control
 */
interface StreakFlameProps {
  intensity?: number; // 0-100
  size?: number;
  animated?: boolean;
}

export function StreakFlame({
  intensity = 50,
  size = 48,
  animated = true,
}: StreakFlameProps) {
  const flameColor = intensity < 30 ? '#FB923C' : intensity < 70 ? '#EF4444' : '#991B1B';
  const glowColor = intensity < 30 ? '#FED7AA' : intensity < 70 ? '#FCA5A5' : '#FCA5A5';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={animated ? 'animate-flicker' : ''}
    >
      {/* Outer flame */}
      <path
        d="M12 2C12 2 8 6 8 10C8 12 9 14 12 14C15 14 16 12 16 10C16 6 12 2 12 2Z"
        fill={flameColor}
        opacity="0.8"
      >
        {animated && (
          <animate
            attributeName="d"
            values="M12 2C12 2 8 6 8 10C8 12 9 14 12 14C15 14 16 12 16 10C16 6 12 2 12 2Z;
                    M12 2C12 2 7 6 7 10C7 12 9 14 12 14C15 14 17 12 17 10C17 6 12 2 12 2Z;
                    M12 2C12 2 8 6 8 10C8 12 9 14 12 14C15 14 16 12 16 10C16 6 12 2 12 2Z"
            dur="1.5s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* Inner flame */}
      <path
        d="M12 6C12 6 10 8 10 10C10 11 10.5 12 12 12C13.5 12 14 11 14 10C14 8 12 6 12 6Z"
        fill={glowColor}
      >
        {animated && (
          <animate
            attributeName="d"
            values="M12 6C12 6 10 8 10 10C10 11 10.5 12 12 12C13.5 12 14 11 14 10C14 8 12 6 12 6Z;
                    M12 6C12 6 9.5 8 9.5 10C9.5 11 10.5 12 12 12C13.5 12 14.5 11 14.5 10C14.5 8 12 6 12 6Z;
                    M12 6C12 6 10 8 10 10C10 11 10.5 12 12 12C13.5 12 14 11 14 10C14 8 12 6 12 6Z"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* Core */}
      <circle cx="12" cy="10" r="2" fill="#FFFFFF" opacity="0.9">
        {animated && (
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="0.8s"
            repeatCount="indefinite"
          />
        )}
      </circle>
    </svg>
  );
}

export default StreakFireIcon;

'use client';

/**
 * Audio Button Component
 *
 * Plays Polish text using text-to-speech when clicked.
 * Shows loading state while playing.
 */

import React, { useState } from 'react';
import { playPolishAudio, isTTSAvailable } from '@/lib/audio';

interface AudioButtonProps {
  text: string;
  speed?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
  showLabel?: boolean;
  disabled?: boolean;
  className?: string;
}

export function AudioButton({
  text,
  speed = 1.0,
  size = 'md',
  variant = 'secondary',
  showLabel = false,
  disabled = false,
  className = '',
}: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlay = async () => {
    if (isPlaying || disabled) return;

    setIsPlaying(true);
    setError(null);

    try {
      await playPolishAudio(text, speed);
    } catch (err) {
      console.error('Audio playback failed:', err);
      setError('Failed to play audio');
    } finally {
      setIsPlaying(false);
    }
  };

  if (!isTTSAvailable() && !disabled) {
    return null; // Hide button if TTS not available
  }

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const variantClasses = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg',
    secondary:
      'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-600',
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        onClick={handlePlay}
        disabled={isPlaying || disabled}
        className={`
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          rounded-full
          flex items-center justify-center
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${isPlaying ? 'animate-pulse' : ''}
        `}
        aria-label={isPlaying ? 'Playing audio' : 'Play pronunciation'}
        title={isPlaying ? 'Playing...' : 'Click to hear pronunciation'}
      >
        {isPlaying ? (
          <svg
            className={iconSizeClasses[size]}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        ) : (
          <svg
            className={iconSizeClasses[size]}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </button>

      {showLabel && (
        <span className="text-sm text-gray-600">
          {isPlaying ? 'Playing...' : 'Listen'}
        </span>
      )}

      {error && (
        <span className="text-xs text-red-600" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

/**
 * Audio button with slow playback speed
 * Useful for learning pronunciation
 */
export function SlowAudioButton(
  props: Omit<AudioButtonProps, 'speed' | 'showLabel'>
) {
  return <AudioButton {...props} speed={0.75} showLabel />;
}

/**
 * Compact audio icon button
 */
export function AudioIcon({
  text,
  size = 'md',
  className = '',
}: Pick<AudioButtonProps, 'text' | 'size' | 'className'>) {
  return <AudioButton text={text} size={size} variant="ghost" className={className} />;
}

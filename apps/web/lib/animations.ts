/**
 * Animation Utilities and Keyframes
 */

/**
 * CSS Animation keyframes as JavaScript objects
 * Can be used with Tailwind's arbitrary values or CSS-in-JS
 */

export const animations = {
  // Fade animations
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },

  // Slide animations
  slideInUp: {
    from: { transform: 'translateY(100%)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  slideInDown: {
    from: { transform: 'translateY(-100%)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  slideInLeft: {
    from: { transform: 'translateX(-100%)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  },
  slideInRight: {
    from: { transform: 'translateX(100%)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  },

  // Scale animations
  scaleIn: {
    from: { transform: 'scale(0)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
  },
  scaleOut: {
    from: { transform: 'scale(1)', opacity: 1 },
    to: { transform: 'scale(0)', opacity: 0 },
  },

  // Bounce
  bounce: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-25%)' },
  },

  // Pulse
  pulse: {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 },
  },

  // Spin
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },

  // Shake
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
    '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
  },

  // Confetti fall
  confettiFall: {
    '0%': { transform: 'translateY(0) rotateZ(0deg)', opacity: 1 },
    '100%': { transform: 'translateY(100vh) rotateZ(720deg)', opacity: 0 },
  },

  // Progress fill
  progressFill: {
    '0%': { width: '0%' },
    '100%': { width: '100%' },
  },
};

/**
 * Easing functions
 */
export const easings = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

/**
 * Duration presets (in milliseconds)
 */
export const durations = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 1000,
};

/**
 * Helper to create CSS animation string
 */
export function createAnimation(
  name: string,
  duration: number = durations.normal,
  easing: string = easings.easeInOut,
  delay = 0,
  iterationCount: number | 'infinite' = 1
): string {
  return `${name} ${duration}ms ${easing} ${delay}ms ${iterationCount}`;
}

/**
 * Stagger animation delay calculator
 */
export function staggerDelay(index: number, baseDelay = 50): number {
  return index * baseDelay;
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {return false;}
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animation class names for common patterns
 */
export const animationClasses = {
  fadeIn: 'animate-fadeIn',
  fadeOut: 'animate-fadeOut',
  slideInUp: 'animate-slideInUp',
  slideInDown: 'animate-slideInDown',
  bounce: 'animate-bounce',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  ping: 'animate-ping',
};

/**
 * Transition class names
 */
export const transitionClasses = {
  all: 'transition-all duration-300 ease-in-out',
  colors: 'transition-colors duration-200 ease-in-out',
  transform: 'transition-transform duration-300 ease-in-out',
  opacity: 'transition-opacity duration-200 ease-in-out',
};

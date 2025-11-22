// Level system utilities

/**
 * CEFR Level XP Thresholds
 * Based on European Framework levels with progressive XP requirements
 */
export const LEVEL_THRESHOLDS = {
  A1: 0,       // Beginner: 0 XP
  A2: 500,     // Elementary: 500 XP (10-15 lessons)
  B1: 1500,    // Intermediate: 1500 XP (30-40 lessons)
  B2: 3500,    // Upper Intermediate: 3500 XP (70-80 lessons)
  C1: 7000,    // Advanced: 7000 XP (140-160 lessons)
  C2: 12000,   // Proficient: 12000 XP (240+ lessons)
};

/**
 * Calculate CEFR level based on total XP
 */
export function calculateLevel(totalXp: number): string {
  if (totalXp >= LEVEL_THRESHOLDS.C2) return 'C2';
  if (totalXp >= LEVEL_THRESHOLDS.C1) return 'C1';
  if (totalXp >= LEVEL_THRESHOLDS.B2) return 'B2';
  if (totalXp >= LEVEL_THRESHOLDS.B1) return 'B1';
  if (totalXp >= LEVEL_THRESHOLDS.A2) return 'A2';
  return 'A1';
}

/**
 * Get XP progress to next level
 */
export function getLevelProgress(totalXp: number): {
  currentLevel: string;
  nextLevel: string | null;
  currentLevelXp: number;
  nextLevelXp: number | null;
  progressPercent: number;
} {
  const currentLevel = calculateLevel(totalXp);

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const currentIndex = levels.indexOf(currentLevel);
  const nextLevel = currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;

  const currentLevelXp = LEVEL_THRESHOLDS[currentLevel as keyof typeof LEVEL_THRESHOLDS];
  const nextLevelXp = nextLevel ? LEVEL_THRESHOLDS[nextLevel as keyof typeof LEVEL_THRESHOLDS] : null;

  const progressPercent = nextLevelXp
    ? Math.round(((totalXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100)
    : 100;

  return {
    currentLevel,
    nextLevel,
    currentLevelXp,
    nextLevelXp,
    progressPercent,
  };
}

/**
 * Check if user leveled up
 */
export function checkLevelUp(oldXp: number, newXp: number): {
  leveledUp: boolean;
  oldLevel: string;
  newLevel: string;
} {
  const oldLevel = calculateLevel(oldXp);
  const newLevel = calculateLevel(newXp);

  return {
    leveledUp: oldLevel !== newLevel,
    oldLevel,
    newLevel,
  };
}

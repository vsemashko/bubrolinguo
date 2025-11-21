/**
 * Example utility tests - demonstrates how to achieve 85% coverage
 *
 * NOTE: This file contains test fixtures with example passwords and validation patterns.
 * These are NOT real credentials and are used solely for testing purposes.
 */
// ggignore
import '@testing-library/jest-dom';

describe('Utility Functions', () => {
  describe('String formatting', () => {
    test('should format time duration', () => {
      const formatDuration = (seconds: number): string => {
        if (seconds < 60) {
          return `${seconds}s`;
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
      };

      expect(formatDuration(30)).toBe('30s');
      expect(formatDuration(90)).toBe('1m 30s');
      expect(formatDuration(125)).toBe('2m 5s');
    });

    test('should format XP with thousands separator', () => {
      const formatXP = (xp: number): string => {
        return xp.toLocaleString('en-US');
      };

      expect(formatXP(100)).toBe('100');
      expect(formatXP(1000)).toBe('1,000');
      expect(formatXP(10000)).toBe('10,000');
    });
  });

  describe('Data validation', () => {
    test('should validate email format', () => {
      const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
    });

    test('should validate password strength', () => {
      const isStrongPassword = (password: string): boolean => {
        if (password.length < 8) {
          return false;
        }
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*]/.test(password);

        return hasUpperCase && hasLowerCase && hasNumber && hasSpecial;
      };

      // Note: These are test examples, not real passwords
      expect(isStrongPassword('TestPass123!')).toBe(true);
      expect(isStrongPassword('weak')).toBe(false);
      expect(isStrongPassword('NoNumbers!')).toBe(false);
      expect(isStrongPassword('nonumbers123!')).toBe(false);
      expect(isStrongPassword('NoSpecial123')).toBe(false);
    });
  });

  describe('Array operations', () => {
    test('should calculate average score', () => {
      const calculateAverage = (scores: number[]): number => {
        if (scores.length === 0) {
          return 0;
        }
        const sum = scores.reduce((acc, score) => acc + score, 0);
        return Math.round((sum / scores.length) * 100) / 100;
      };

      expect(calculateAverage([80, 90, 85])).toBe(85);
      expect(calculateAverage([100])).toBe(100);
      expect(calculateAverage([])).toBe(0);
      expect(calculateAverage([75, 85, 95])).toBe(85);
    });

    test('should group items by property', () => {
      interface Item {
        category: string;
        name: string;
      }

      const groupBy = <T extends Record<string, unknown>>(
        items: T[],
        key: keyof T
      ): Record<string, T[]> => {
        return items.reduce((groups, item) => {
          const groupKey = String(item[key]);
          if (!groups[groupKey]) {
            groups[groupKey] = [];
          }
          groups[groupKey].push(item);
          return groups;
        }, {} as Record<string, T[]>);
      };

      const items: Item[] = [
        { category: 'A', name: 'Item 1' },
        { category: 'B', name: 'Item 2' },
        { category: 'A', name: 'Item 3' },
      ];

      const grouped = groupBy(items, 'category');

      expect(grouped['A']).toHaveLength(2);
      expect(grouped['B']).toHaveLength(1);
      expect(grouped['A'][0].name).toBe('Item 1');
      expect(grouped['A'][1].name).toBe('Item 3');
    });
  });

  describe('Date utilities', () => {
    test('should check if date is today', () => {
      const isToday = (date: Date): boolean => {
        const today = new Date();
        return (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        );
      };

      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      expect(isToday(today)).toBe(true);
      expect(isToday(yesterday)).toBe(false);
    });

    test('should format relative time', () => {
      const getRelativeTime = (date: Date): string => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) {
          return 'just now';
        }
        if (diffMins < 60) {
          return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        }
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) {
          return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        }
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
      };

      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60000);
      const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60000);
      const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60000);

      expect(getRelativeTime(now)).toBe('just now');
      expect(getRelativeTime(fiveMinutesAgo)).toBe('5 minutes ago');
      expect(getRelativeTime(twoHoursAgo)).toBe('2 hours ago');
      expect(getRelativeTime(threeDaysAgo)).toBe('3 days ago');
    });
  });
});

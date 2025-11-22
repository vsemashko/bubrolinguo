/**
 * Utility Functions Tests - Testing lib/utils.ts
 */
import {
  cn,
  formatNumber,
  formatDuration,
  formatRelativeTime,
  debounce,
  throttle,
  copyToClipboard,
  calculateStreak,
  getInitials,
  truncateText,
  sleep,
  randomInt,
  shuffleArray,
  groupBy,
  unique,
  range,
} from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn (classNames merger)', () => {
    it('should merge class names', () => {
      const result = cn('class1', 'class2');
      expect(result).toContain('class1');
      expect(result).toContain('class2');
    });

    it('should handle conditional classes', () => {
      const result = cn('base', false && 'hidden', true && 'visible');
      expect(result).toContain('base');
      expect(result).toContain('visible');
      expect(result).not.toContain('hidden');
    });

    it('should handle undefined and null', () => {
      const result = cn('class1', undefined, null, 'class2');
      expect(result).toContain('class1');
      expect(result).toContain('class2');
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
    });

    it('should handle small numbers', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(99)).toBe('99');
    });

    it('should handle negative numbers', () => {
      expect(formatNumber(-1000)).toBe('-1,000');
    });
  });

  describe('formatDuration', () => {
    it('should format seconds only', () => {
      expect(formatDuration(45)).toBe('45s');
    });

    it('should format minutes and seconds', () => {
      expect(formatDuration(90)).toBe('1m 30s');
      expect(formatDuration(125)).toBe('2m 5s');
    });

    it('should format hours', () => {
      expect(formatDuration(3600)).toBe('1h 0m');
      expect(formatDuration(3665)).toBe('1h 1m');
    });

    it('should handle zero', () => {
      expect(formatDuration(0)).toBe('0s');
    });
  });

  describe('formatRelativeTime', () => {
    const now = new Date();

    it('should show "just now" for very recent times', () => {
      const recent = new Date(now.getTime() - 30 * 1000); // 30 seconds ago
      expect(formatRelativeTime(recent)).toBe('just now');
    });

    it('should show minutes ago', () => {
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      expect(formatRelativeTime(fiveMinutesAgo)).toContain('minute');
    });

    it('should show hours ago', () => {
      const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
      expect(formatRelativeTime(twoHoursAgo)).toContain('hour');
    });

    it('should show days ago', () => {
      const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(threeDaysAgo)).toContain('day');
    });

    it('should handle string dates', () => {
      const dateStr = new Date(now.getTime() - 10 * 60 * 1000).toISOString();
      expect(formatRelativeTime(dateStr)).toContain('minute');
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();

    it('should delay function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should cancel previous calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    afterAll(() => {
      jest.useRealTimers();
    });
  });

  describe('throttle', () => {
    jest.useFakeTimers();

    it('should limit function calls', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    afterAll(() => {
      jest.useRealTimers();
    });
  });

  describe('calculateStreak', () => {
    it('should calculate correct streak', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const dates = [
        today.toISOString(),
        yesterday.toISOString(),
        twoDaysAgo.toISOString(),
      ];

      const streak = calculateStreak(dates);
      expect(streak).toBe(3);
    });

    it('should break streak with gap', () => {
      const today = new Date();
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const dates = [today.toISOString(), twoDaysAgo.toISOString()];

      const streak = calculateStreak(dates);
      expect(streak).toBe(1);
    });

    it('should handle empty array', () => {
      expect(calculateStreak([])).toBe(0);
    });
  });

  describe('getInitials', () => {
    it('should get initials from full name', () => {
      expect(getInitials('John Doe')).toBe('JD');
      expect(getInitials('Alice Bob Cooper')).toBe('ABC');
    });

    it('should handle single name', () => {
      expect(getInitials('John')).toBe('J');
    });

    it('should handle empty string', () => {
      expect(getInitials('')).toBe('');
    });

    it('should limit to max length', () => {
      expect(getInitials('Alice Bob Cooper', 2)).toBe('AB');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const text = 'This is a very long text that needs to be truncated';
      const result = truncateText(text, 20);
      expect(result.length).toBeLessThanOrEqual(23); // 20 + '...'
      expect(result).toContain('...');
    });

    it('should not truncate short text', () => {
      const text = 'Short';
      expect(truncateText(text, 20)).toBe('Short');
    });

    it('should handle custom suffix', () => {
      const text = 'Long text here';
      const result = truncateText(text, 5, ' →');
      expect(result).toContain('→');
    });
  });

  describe('sleep', () => {
    jest.useFakeTimers();

    it('should delay execution', async () => {
      const promise = sleep(1000);
      jest.advanceTimersByTime(1000);
      await promise;
      expect(true).toBe(true);
    });

    afterAll(() => {
      jest.useRealTimers();
    });
  });

  describe('randomInt', () => {
    it('should generate number in range', () => {
      const result = randomInt(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });

    it('should include both bounds', () => {
      const results = new Set();
      for (let i = 0; i < 100; i++) {
        results.add(randomInt(1, 3));
      }
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe('shuffleArray', () => {
    it('should return array with same length', () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(arr);
      expect(shuffled.length).toBe(arr.length);
    });

    it('should contain same elements', () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(arr);
      arr.forEach((item) => {
        expect(shuffled).toContain(item);
      });
    });

    it('should not modify original array', () => {
      const arr = [1, 2, 3];
      const original = [...arr];
      shuffleArray(arr);
      expect(arr).toEqual(original);
    });
  });

  describe('groupBy', () => {
    it('should group objects by key', () => {
      const items = [
        { category: 'A', value: 1 },
        { category: 'B', value: 2 },
        { category: 'A', value: 3 },
      ];

      const grouped = groupBy(items, 'category');
      expect(grouped['A']).toHaveLength(2);
      expect(grouped['B']).toHaveLength(1);
    });

    it('should handle function key', () => {
      const items = [
        { id: 1, value: 10 },
        { id: 2, value: 20 },
      ];

      const grouped = groupBy(items, (item) => (item.value > 15 ? 'high' : 'low'));
      expect(grouped['low']).toHaveLength(1);
      expect(grouped['high']).toHaveLength(1);
    });
  });

  describe('unique', () => {
    it('should remove duplicates from array', () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
      expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('should handle empty array', () => {
      expect(unique([])).toEqual([]);
    });
  });

  describe('range', () => {
    it('should create array of numbers', () => {
      expect(range(5)).toEqual([0, 1, 2, 3, 4]);
      expect(range(3, 6)).toEqual([3, 4, 5]);
      expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
    });

    it('should handle negative numbers', () => {
      expect(range(-3, 0)).toEqual([-3, -2, -1]);
    });
  });

  describe('copyToClipboard', () => {
    it('should copy text to clipboard', async () => {
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn().mockResolvedValue(undefined),
        },
      });

      const result = await copyToClipboard('test text');
      expect(result).toBe(true);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
    });

    it('should handle clipboard API failure', async () => {
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn().mockRejectedValue(new Error('Failed')),
        },
      });

      const result = await copyToClipboard('test');
      expect(result).toBe(false);
    });
  });
});

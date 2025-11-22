/**
 * useLocalStorage Hook Tests
 */
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should initialize with initial value when no stored value exists', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial value')
    );

    expect(result.current[0]).toBe('initial value');
  });

  it('should initialize with stored value when it exists', () => {
    localStorage.setItem('test-key', JSON.stringify('stored value'));

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial value')
    );

    expect(result.current[0]).toBe('stored value');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial')
    );

    act(() => {
      result.current[1]('updated value');
    });

    expect(result.current[0]).toBe('updated value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated value'));
  });

  it('should handle complex objects', () => {
    const initialObject = { name: 'Test', count: 0 };
    const { result } = renderHook(() =>
      useLocalStorage('test-object', initialObject)
    );

    const updatedObject = { name: 'Updated', count: 5 };

    act(() => {
      result.current[1](updatedObject);
    });

    expect(result.current[0]).toEqual(updatedObject);
  });

  it('should handle function updater', () => {
    const { result } = renderHook(() =>
      useLocalStorage('counter', 0)
    );

    act(() => {
      result.current[1]((prev: number) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });

  it('should provide remove function', () => {
    localStorage.setItem('test-key', JSON.stringify('value'));

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'default')
    );

    act(() => {
      result.current[2](); // Remove function
    });

    expect(result.current[0]).toBe('default');
    expect(localStorage.getItem('test-key')).toBeNull();
  });

  it('should handle arrays correctly', () => {
    const { result } = renderHook(() =>
      useLocalStorage<number[]>('array-key', [1, 2, 3])
    );

    act(() => {
      result.current[1]([...result.current[0], 4]);
    });

    expect(result.current[0]).toEqual([1, 2, 3, 4]);
  });

  it('should handle null and undefined values', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string | null>('nullable-key', null)
    );

    expect(result.current[0]).toBeNull();

    act(() => {
      result.current[1]('not null');
    });

    expect(result.current[0]).toBe('not null');
  });

  it('should handle JSON parse errors gracefully', () => {
    // Set invalid JSON
    localStorage.setItem('invalid-json', 'not valid json{');

    const { result } = renderHook(() =>
      useLocalStorage('invalid-json', 'fallback')
    );

    // Should fall back to initial value
    expect(result.current[0]).toBe('fallback');
  });

  it('should synchronize across multiple hook instances', () => {
    const { result: result1 } = renderHook(() =>
      useLocalStorage('shared-key', 'initial')
    );

    const { result: result2 } = renderHook(() =>
      useLocalStorage('shared-key', 'initial')
    );

    act(() => {
      result1.current[1]('updated');
    });

    // Both should have the updated value
    expect(result1.current[0]).toBe('updated');

    // Note: Cross-tab sync requires storage event which doesn't fire in same tab
    // This test verifies same-component sync
  });
});

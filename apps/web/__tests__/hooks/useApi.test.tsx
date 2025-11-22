/**
 * useApi Hook Tests
 */
import { renderHook, waitFor, act } from '@testing-library/react';
import { useApi } from '@/hooks/useApi';

describe('useApi Hook', () => {
  it('should initialize with loading state when immediate is true', () => {
    const mockApiFunc = jest.fn().mockResolvedValue({ data: 'test' });

    const { result } = renderHook(() =>
      useApi(mockApiFunc, { immediate: true })
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should not execute immediately when immediate is false', () => {
    const mockApiFunc = jest.fn().mockResolvedValue({ data: 'test' });

    const { result } = renderHook(() =>
      useApi(mockApiFunc, { immediate: false })
    );

    expect(result.current.loading).toBe(false);
    expect(mockApiFunc).not.toHaveBeenCalled();
  });

  it('should fetch data successfully', async () => {
    const mockData = { data: 'test data' };
    const mockApiFunc = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() =>
      useApi(mockApiFunc, { immediate: true })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors properly', async () => {
    const mockError = new Error('API Error');
    const mockApiFunc = jest.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() =>
      useApi(mockApiFunc, { immediate: true })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(mockError);
  });

  it('should allow manual execution', async () => {
    const mockData = { data: 'manual data' };
    const mockApiFunc = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() =>
      useApi(mockApiFunc, { immediate: false })
    );

    expect(result.current.loading).toBe(false);

    await act(async () => {
      result.current.execute();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
  });

  it('should support refetch functionality', async () => {
    const mockData1 = { data: 'first call' };
    const mockData2 = { data: 'second call' };
    const mockApiFunc = jest
      .fn()
      .mockResolvedValueOnce(mockData1)
      .mockResolvedValueOnce(mockData2);

    const { result } = renderHook(() =>
      useApi(mockApiFunc, { immediate: true })
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData1);
    });

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData2);
    });

    expect(mockApiFunc).toHaveBeenCalledTimes(2);
  });

  it('should handle callback functions', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const mockData = { data: 'callback test' };
    const mockApiFunc = jest.fn().mockResolvedValue(mockData);

    renderHook(() =>
      useApi(mockApiFunc, {
        immediate: true,
        onSuccess,
        onError,
      })
    );

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(mockData);
    });

    expect(onError).not.toHaveBeenCalled();
  });

  it('should call onError callback on failure', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const mockError = new Error('Test error');
    const mockApiFunc = jest.fn().mockRejectedValue(mockError);

    renderHook(() =>
      useApi(mockApiFunc, {
        immediate: true,
        onSuccess,
        onError,
      })
    );

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(mockError);
    });

    expect(onSuccess).not.toHaveBeenCalled();
  });
});

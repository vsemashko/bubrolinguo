/**
 * Custom hooks for API data fetching
 */

import { useState, useEffect, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

/**
 * Generic hook for API calls
 */
export function useApi<T>(
  apiFunc: () => Promise<T>,
  options: UseApiOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options;
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });

    try {
      const result = await apiFunc();
      setState({ data: result, loading: false, error: null });

      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setState({ data: null, loading: false, error });

      if (onError) {
        onError(error);
      }

      throw error;
    }
  }, [apiFunc, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    refetch: execute,
  };
}

/**
 * Hook for paginated data
 */
export function usePagination<T>(
  apiFunc: (page: number, limit: number) => Promise<{ data: T[]; total: number }>,
  initialPage = 1,
  limit = 10
) {
  const [page, setPage] = useState(initialPage);
  const [allData, setAllData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);

  const { data, loading, error, execute } = useApi(
    () => apiFunc(page, limit),
    {
      immediate: true,
      onSuccess: (result) => {
        setAllData((prev) => [...prev, ...result.data]);
        setTotal(result.total);
      },
    }
  );

  const loadMore = useCallback(() => {
    if (!loading && allData.length < total) {
      setPage((p) => p + 1);
    }
  }, [loading, allData.length, total]);

  const reset = useCallback(() => {
    setPage(initialPage);
    setAllData([]);
    setTotal(0);
  }, [initialPage]);

  useEffect(() => {
    execute();
  }, [page]);

  return {
    data: allData,
    loading,
    error,
    page,
    total,
    hasMore: allData.length < total,
    loadMore,
    reset,
  };
}

/**
 * Hook for debounced API calls (useful for search)
 */
export function useDebouncedApi<T>(
  apiFunc: (query: string) => Promise<T>,
  delay = 500
) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  const { data, loading, error } = useApi(
    () => apiFunc(debouncedQuery),
    {
      immediate: debouncedQuery.length > 0,
    }
  );

  return {
    query,
    setQuery,
    data,
    loading,
    error,
  };
}

/**
 * Hook for mutations (POST, PUT, DELETE)
 */
export function useMutation<T, P = any>(
  mutationFunc: (params: P) => Promise<T>,
  options: UseApiOptions = {}
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = useCallback(
    async (params: P) => {
      setState({ data: null, loading: true, error: null });

      try {
        const result = await mutationFunc(params);
        setState({ data: result, loading: false, error: null });

        if (options.onSuccess) {
          options.onSuccess(result);
        }

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Mutation failed');
        setState({ data: null, loading: false, error });

        if (options.onError) {
          options.onError(error);
        }

        throw error;
      }
    },
    [mutationFunc, options]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    mutate,
    reset,
  };
}

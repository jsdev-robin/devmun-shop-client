import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface UseFetchProps {
  url: string;
  params?: Record<string, unknown>;
}

interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
}

interface UseFetchResult<T> {
  data: PaginatedResponse<T> | null;
  isLoading: boolean;
  isError: AxiosError | null;
}

export function useFetch<T = unknown>({
  url,
  params,
}: UseFetchProps): UseFetchResult<T> {
  const [data, setData] = useState<PaginatedResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<AxiosError | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<PaginatedResponse<T>>(url, { params });
        if (isMounted) {
          setData(response.data);
          setIsError(null);
        }
      } catch (error) {
        if (isMounted) {
          setIsError(error as AxiosError);
          setData(null);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [params, url]);

  return { data, isLoading, isError };
}

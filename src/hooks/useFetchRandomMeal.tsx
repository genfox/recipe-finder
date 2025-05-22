import { useState, useEffect } from 'react';

import type { Meal } from '@/lib/types';

interface ApiResponse {
    meals: Meal[] | null;
}

interface FetchResult<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
}

function useFetchRandomMeal(): FetchResult<Meal> {
    const [data, setData] = useState<Meal | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(apiUrl, { signal });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json: ApiResponse = await response.json();
                setData(json?.meals?.[0] || null);
            } catch (err: any) {
                if (err?.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setError(err instanceof Error ? err : new Error(String(err)));
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, []);

    return { data, isLoading, error };
}

export default useFetchRandomMeal;
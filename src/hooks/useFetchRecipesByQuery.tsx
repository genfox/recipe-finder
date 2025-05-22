import { useState, useEffect } from 'react';

import type { Meal } from '@/lib/types';
import useAppStore from '@/store/appStore';

interface ApiResponse {
    meals: Meal[] | null;
}

interface FetchResult<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
}

function useFetchRecipesByQuery(query: string | null): FetchResult<Meal[]> {
    const [data, setData] = useState<Meal[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const { lastSearch } = useAppStore();

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

        const fetchData = async () => {
            const cachedResult = lastSearch?.getResultByQuery ? lastSearch.getResultByQuery(query ?? "") : null;
            if (cachedResult) {
                setIsLoading(false);
                setError(null);
                setData(cachedResult);
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(apiUrl, { signal });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json: ApiResponse = await response.json();
                setData(json?.meals || null);
                if (lastSearch?.setResult) {
                    lastSearch.setResult(query ?? "", json.meals ?? []);
                }
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

        if (!query) {
            setIsLoading(false);
            setData(null);
            setError(new Error("Invalid search query"));
        } else {
            fetchData();
        }

        return () => {
            controller.abort();
        };
    }, [query]);

    return { data, isLoading, error };
}

export default useFetchRecipesByQuery;
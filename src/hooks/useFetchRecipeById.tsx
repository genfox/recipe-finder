
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

function useFetchRecipeById(id: string): FetchResult<Meal> {
    const [data, setData] = useState<Meal | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const { lastSearch, favorites } = useAppStore();

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

        const fetchData = async () => {
            let cachedResult = lastSearch?.getResultById ? lastSearch.getResultById(id) : null;
            if (!cachedResult) {
                cachedResult = favorites?.getFavoriteById ? favorites.getFavoriteById(id) : null;
            }
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

        if (isNaN(Number(id))) {
            setError(new Error("Invalid id"));
            setIsLoading(false);
            setData(null);
        } else {
            fetchData();
        }

        return () => {
            controller.abort();
        };
    }, [id]);

    return { data, isLoading, error };
}

export default useFetchRecipeById;
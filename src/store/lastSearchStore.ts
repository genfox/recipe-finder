import { isMoreThan24HoursPassed } from '@/lib/utils';

import type { Meal } from '@/lib/types';
import type { StateCreator } from 'zustand';

export interface LastSearchSlice {
    lastSearch: {
        query: string | null
        resultIds: string[]
        result: Meal[]
        timestamp: Date | null
        clear: () => void
        setResult: (query: string, meals: Meal[]) => void
        getResultByQuery: (searchTerm: string) => Meal[] | null
        getResultById: (idMeal: string) => Meal | null
    }
}

const createLastSearchSlice: StateCreator<
    LastSearchSlice,
    [],
    [],
    LastSearchSlice
> = (set, get) => ({
    lastSearch: {
        query: null,
        resultIds: [],
        result: [],
        timestamp: null,
        getResultByQuery: (searchTerm: string) => {
            const { lastSearch } = get();
            const { query, result, timestamp } = lastSearch;
            if (query === searchTerm) {
                if (timestamp && isMoreThan24HoursPassed(new Date(), new Date(timestamp))) return null;
                return result;
            }
            return null;
        },
        getResultById: (idMeal: string) => {
            const { lastSearch } = get();
            const { resultIds, result, timestamp } = lastSearch;
            if (resultIds.includes(idMeal)) {
                if (timestamp && isMoreThan24HoursPassed(new Date(), new Date(timestamp))) return null;
                const res = result.filter(r => r.idMeal === idMeal);
                if (res && res.length > 0) {
                    return res[0];
                }
            }
            return null;
        },
        setResult: (query: string, meals: Meal[]) => {
            const { lastSearch } = get();
            const ids = meals.map(meal => meal.idMeal);
            set({
                lastSearch: {
                    ...lastSearch,
                    query,
                    result: meals,
                    resultIds: ids,
                    timestamp: new Date()
                }
            })
        },
        clear: () => {
            const { lastSearch } = get();
            set({
                lastSearch: {
                    ...lastSearch,
                    query: null,
                    resultIds: [],
                    result: [],
                    timestamp: null
                }
            });
        }
    }
});

export default createLastSearchSlice;
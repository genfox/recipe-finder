import { beforeEach, describe, expect, test, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';

import useFetchRecipesByQuery from '@/hooks/useFetchRecipesByQuery';
import mockRecipe from './mocks/recipe';
import useAppStore from '@/store/appStore';
import { getSanitizedSearchQuery } from '@/lib/utils';

// Mock the global fetch API
global.fetch = vi.fn();

describe('useFetchRecipesByQuery', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    test('should fetch data and update state on successful API call', async () => {
        const query = getSanitizedSearchQuery("Test");

        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ meals: [mockRecipe] }),
        } as Response);

        const { result } = renderHook(() => useFetchRecipesByQuery(query));

        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.data).toEqual([ mockRecipe ]);
        expect(result.current.error).toBeNull();
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`, { signal: expect.any(AbortSignal) });
    });

    test('should set error state when API call fails', async () => {
        const query = getSanitizedSearchQuery("Failed api");
        const errorMessage = 'Failed to fetch';
        (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error(errorMessage));

        const { result } = renderHook(() => useFetchRecipesByQuery(query));

        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error?.message).toBe(errorMessage);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('should handle non-ok response status', async () => {
        const query = getSanitizedSearchQuery("Not found");
        const statusText = 'Not Found';
        const status = 404;
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            ok: false,
            status,
            statusText,
        } as Response);

        const { result } = renderHook(() => useFetchRecipesByQuery(query));

        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error?.message).toBe(`HTTP error! status: ${status}`);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('should handle API response with no meals array', async () => {
        const query = getSanitizedSearchQuery("null response");
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ meals: null }),
        } as Response);

        const { result } = renderHook(() => useFetchRecipesByQuery(query));

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();
    });

    test('should handle API response with an empty meals array', async () => {
        const query = getSanitizedSearchQuery("empty response");
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ meals: [] }),
        } as Response);

        const { result } = renderHook(() => useFetchRecipesByQuery(query));

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.data).toHaveLength(0);
        expect(result.current.error).toBeNull();
    });

    test('should abort the fetch request when the component unmounts', () => {
        const query = getSanitizedSearchQuery("unmount component");
        const mockAbort = vi.fn();
        const mockController = {
            abort: mockAbort,
            signal: {},
        } as unknown as AbortController;

        vi.spyOn(global, 'AbortController').mockReturnValue(mockController);
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ meals: [mockRecipe] }),
        } as Response);

        const { unmount } = renderHook(() => useFetchRecipesByQuery(query));
        unmount();

        expect(mockAbort).toHaveBeenCalledTimes(1);
    });

    test('should not fetch the api if the search query is in the last search store', () => {
        const query = getSanitizedSearchQuery("cache api");
        const { result: appStoreRes } = renderHook(() => useAppStore());
        const store = appStoreRes.current;

        act(() => store.lastSearch.setResult(query!, [mockRecipe]));

        const { result } = renderHook(() => useFetchRecipesByQuery(query));

        expect(fetch).toHaveBeenCalledTimes(0);
        expect(result.current.data).toEqual([ mockRecipe ]);
    });
});
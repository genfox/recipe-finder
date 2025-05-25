import { beforeEach, describe, expect, test, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import useFetchRandomMeal from '@/hooks/useFetchRandomMeal';
import mockRecipe from './mocks/recipe';

// Mock the global fetch API
global.fetch = vi.fn();

describe('useFetchRandomMeal', () => {
    beforeEach(() => {
        // Reset the mock before each test
        vi.clearAllMocks();
    });

    test('should fetch data and update state on successful API call', async () => {
        const mockMeal = mockRecipe;
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ meals: [mockMeal] }),
        } as Response);

        const { result } = renderHook(() => useFetchRandomMeal());

        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.data).toEqual(mockMeal);
        expect(result.current.error).toBeNull();
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/random.php', { signal: expect.any(AbortSignal) });
    });

    test('should set error state when API call fails', async () => {
        const errorMessage = 'Failed to fetch';
        (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error(errorMessage));

        const { result } = renderHook(() => useFetchRandomMeal());

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
        const statusText = 'Not Found';
        const status = 404;
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            ok: false,
            status,
            statusText,
        } as Response);

        const { result } = renderHook(() => useFetchRandomMeal());

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
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ meals: null }),
        } as Response);

        const { result } = renderHook(() => useFetchRandomMeal());

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();
    });

    test('should handle API response with an empty meals array', async () => {
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ meals: [] }),
        } as Response);

        const { result } = renderHook(() => useFetchRandomMeal());

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();
    });

    test('should abort the fetch request when the component unmounts', () => {
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

        const { unmount } = renderHook(() => useFetchRandomMeal());
        unmount();

        expect(mockAbort).toHaveBeenCalledTimes(1);
    });
});
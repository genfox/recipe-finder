import { beforeEach, describe, expect, test, vi } from "vitest";
import { getSanitizedSearchQuery } from "@/lib/utils";

import mockRecipe from "./mocks/recipe";
import { createTestStore } from "./mocks/mockAppStore";

describe("last search zustand store", () => {
    let store: ReturnType<typeof createTestStore>;

    beforeEach(() => {
        localStorage.clear();
        store = createTestStore();
    });

    test('add search result', () => {
        expect(store.getState().lastSearch.resultIds).not.toContain(mockRecipe.idMeal);
        store.getState().lastSearch.setResult("test", [mockRecipe]);
        expect(store.getState().lastSearch.resultIds).toContain(mockRecipe.idMeal);
        expect(store.getState().lastSearch.result.some(obj => expect(obj).toMatchObject({ idMeal: mockRecipe.idMeal }))).toBe(true);
    });

    test('get a search result item by id', () => {
        store.getState().lastSearch.setResult("test", [mockRecipe]);
        expect(store.getState().lastSearch.getResultById(mockRecipe.idMeal)).toHaveProperty("idMeal", mockRecipe.idMeal);
    });

    test('get a null search result item by id if doesnt exist', () => {
        expect(store.getState().lastSearch.getResultById(mockRecipe.idMeal)).toBeNull();
    });

    test('get a search result item by query', () => {
        const query = getSanitizedSearchQuery("test");
        store.getState().lastSearch.setResult(query!, [mockRecipe]);
        expect(store.getState().lastSearch.getResultByQuery(query!)?.every(obj => expect(obj).toMatchObject({ idMeal: mockRecipe.idMeal })));
    });

    test('get a null search result item by query if doesnt exist', () => {
        expect(store.getState().lastSearch.getResultByQuery("test")).toBeNull();
    });

    test('clear the store', () => {
        store.getState().lastSearch.clear();
        expect(store.getState().lastSearch.query).toBeNull();
        expect(store.getState().lastSearch.timestamp).toBeNull();
        expect(store.getState().lastSearch.resultIds).toHaveLength(0);
        expect(store.getState().lastSearch.result).toHaveLength(0);
    });
});
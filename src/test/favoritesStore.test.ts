import { beforeEach, describe, expect, test } from "vitest";

import mockRecipe from "./mocks/recipe";
import { createTestStore } from "./mocks/mockAppStore";

describe("favorites zustand store", () => {
    let store: ReturnType<typeof createTestStore>;

    beforeEach(() => {
        localStorage.clear();
        store = createTestStore();
    });

    test('add meal to favorites', () => {
        expect(store.getState().favorites.favoriteIds).not.toContain(mockRecipe.idMeal);
        store.getState().favorites.toggleFavorite(mockRecipe);
        expect(store.getState().favorites.favoriteIds).toContain(mockRecipe.idMeal);
        expect(store.getState().favorites.favoriteMeals.some(obj => expect(obj).toMatchObject({ idMeal: mockRecipe.idMeal }))).toBe(true);
    });

    test('remove meal from favorites', () => {
        store.getState().favorites.toggleFavorite(mockRecipe);
        expect(store.getState().favorites.favoriteIds).toContain(mockRecipe.idMeal);
        store.getState().favorites.toggleFavorite(mockRecipe);
        expect(store.getState().favorites.favoriteIds).not.toContain(mockRecipe.idMeal);
        expect(store.getState().favorites.favoriteMeals.every(obj => expect(obj).not.toMatchObject({ idMeal: mockRecipe.idMeal }))).toBe(true);
    });

    test('get a favorite item by id', () => {
        store.getState().favorites.toggleFavorite(mockRecipe);
        expect(store.getState().favorites.getFavoriteById(mockRecipe.idMeal)).toHaveProperty("idMeal", mockRecipe.idMeal);
    });

    test('return null if a favorite doesnt exist', () => {
        expect(store.getState().favorites.getFavoriteById("111")).toBeNull();
    });

    test('clear the store', () => {
        store.getState().favorites.clear();
        expect(store.getState().favorites.favoriteIds).toHaveLength(0);
        expect(store.getState().favorites.favoriteMeals).toHaveLength(0);
    });
});
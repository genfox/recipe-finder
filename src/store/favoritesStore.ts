
import type { Meal } from '@/lib/types';
import type { StateCreator } from 'zustand';

export interface FavoritesSlice {
    favorites: {
        favoriteIds: string[]                 // List of favorite meal IDs
        favoriteMeals: Meal[]                 // List of favorite meal objects
        toggleFavorite: (meal: Meal) => void  // Add or remove a meal from favorites
        isFavorite: (meal: Meal) => boolean   // Gets if a Meal is favorite or not
        getFavoriteById: (idMeal: string) => Meal | null // Get a meal in the favorites by id (if present)
        clear: () => void // Clear the store
    }
}

const createFavoritesSlice: StateCreator<
    FavoritesSlice,
    [],
    [],
    FavoritesSlice
> = (set, get) => ({
    favorites: {
        favoriteIds: [],
        favoriteMeals: [],

        isFavorite: (meal) => {
            const { favorites } = get();
            return favorites.favoriteIds.includes(meal.idMeal);
        },

        toggleFavorite: (meal) => {
            const { favorites } = get();
            const { favoriteIds, favoriteMeals } = favorites;

            if (favoriteIds.includes(meal.idMeal)) {
                // Remove from favorites
                set({
                    favorites: {
                        ...favorites,
                        favoriteIds: favoriteIds.filter(id => id !== meal.idMeal),
                        favoriteMeals: favoriteMeals.filter(m => m.idMeal !== meal.idMeal)
                    }
                })
            } else {
                // Add to favorites
                set({
                    favorites: {
                        ...favorites,
                        favoriteIds: [...favoriteIds, meal.idMeal],
                        favoriteMeals: [...favoriteMeals, meal]
                    }
                })
            }
        },

        getFavoriteById: (idMeal: string) => {
            const { favorites } = get();
            const { favoriteIds, favoriteMeals } = favorites;
            if (favoriteIds.includes(idMeal)) {
                const res = favoriteMeals.filter(f => f.idMeal === idMeal);
                if (res && res.length > 0) {
                    return res[0];
                }
            }
            return null;
        },

        clear: () => {
            const { favorites } = get();
            set({
                favorites: {
                    ...favorites,
                    favoriteIds: [],
                    favoriteMeals: [],
                }
            })
        }
    }
});

export default createFavoritesSlice;
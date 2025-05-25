import type { FavoritesSlice } from "@/store/favoritesStore";
import type { LastSearchSlice } from "@/store/lastSearchStore";
import { create } from "zustand";
import createFavoritesSlice from "@/store/favoritesStore";
import createLastSearchSlice from "@/store/lastSearchStore";
import { persist } from "zustand/middleware";

// Helper to create a store for testing
export const createTestStore = () => {
    return create<FavoritesSlice & LastSearchSlice>()(
        persist(
            (set, get, api) => ({
                ...createFavoritesSlice(set, get, api),
                ...createLastSearchSlice(set, get, api),
            }),
            {
                name: "recipe-finder-test-store"
            }
        )
    );
};
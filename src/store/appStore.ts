import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import createFavoritesSlice, { type FavoritesSlice } from './favoritesStore';
import createLastSearchSlice, { type LastSearchSlice } from './lastSearchStore';

import merge from "lodash.merge";

const useAppStore = create<FavoritesSlice & LastSearchSlice>()(
    persist(
        (...a) => ({
            ...createFavoritesSlice(...a),
            ...createLastSearchSlice(...a),
        }),
        {
            name: "recipe-hub-store",
            merge: (persistedState, currentState) => merge(currentState, persistedState),
        }
    )
);

export default useAppStore;

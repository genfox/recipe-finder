import { createFileRoute } from '@tanstack/react-router'

import useAppStore from '@/store/appStore';

import FavoriteRecipes from '@/components/FavoriteRecipes';

export const Route = createFileRoute('/favorites')({
  component: FavoritesPage,
})

function FavoritesPage() {
  const { favorites } = useAppStore();
  return <FavoriteRecipes meals={favorites.favoriteMeals ?? []} />
}

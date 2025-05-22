import { createFileRoute } from '@tanstack/react-router'

import RecipeDetail from '@/components/RecipeDetail';

import useFetchRecipeById from '@/hooks/useFetchRecipeById';
import LoadingRecipeDetail from '@/components/LoadingRecipeDetail';

export const Route = createFileRoute('/recipe/$recipeId')({
  component: SearchPage,
});

function SearchPage() {
  const params = Route.useParams();

  const recipeId = params.recipeId;

  const {data, isLoading, error} = useFetchRecipeById(recipeId);

  if (isLoading) {
    return <div><LoadingRecipeDetail /></div>
  }

  if (error) {
    return <div>Something went wrong</div>
  }

  if (!data) {
    // return <div><NoMealsFound query={query} /></div>
    return <div>No meal found with id {recipeId}</div>
  }

  return (
    <div><RecipeDetail recipe={data} /></div>
  );
}

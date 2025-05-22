import { createFileRoute } from '@tanstack/react-router'

import RecipeDetail from '@/components/RecipeDetail';

import useFetchRecipeById from '@/hooks/useFetchRecipeById';
import LoadingRecipeDetail from '@/components/LoadingRecipeDetail';
import { NoMealsFound } from '@/components/NoMealsFound';
import { RequestError } from '@/components/RequestError';

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

  if (error && error.message === "Invalid id") {
    return <div><NoMealsFound queryType="id" value={recipeId} /></div>
  }

  if (error) {
    return <div><RequestError /></div>
  }

  if (!data) {
    return <div><NoMealsFound queryType="id" value={recipeId} /></div>
  }

  return (
    <div><RecipeDetail recipe={data} /></div>
  );
}

import { createFileRoute } from '@tanstack/react-router'

import useFetchRandomMeal from '@/hooks/useFetchRandomMeal'

import LoadingRecipeDetail from '@/components/LoadingRecipeDetail';
import RecipeDetail from '@/components/RecipeDetail';
import { RequestError } from '@/components/RequestError';

export const Route = createFileRoute('/random')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, error, isLoading } = useFetchRandomMeal();

  if (isLoading) {
    return <div><LoadingRecipeDetail /></div>
  }

  if (error) {
    return <div><RequestError /></div>;
  }

  if (!data) {
    return <div>No meal found</div>
  }

  return <div><RecipeDetail recipe={data} /></div>
}

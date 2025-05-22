import RecipeDetail from '@/components/RecipeDetail';
import useFetchRandomMeal from '@/hooks/useFetchRandomMeal'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/random')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, error, isLoading } = useFetchRandomMeal();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading the random meal</div>;
  }

  if (!data) {
    return <div>No meal found</div>
  }

  return <div><RecipeDetail recipe={data} /></div>
}

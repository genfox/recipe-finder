import { createFileRoute } from '@tanstack/react-router'

import useFetchRecipesByQuery from '@/hooks/useFetchRecipesByQuery';
import { getSanitizedSearchQuery } from '@/lib/utils';

import SearchResults from '@/components/SearchResults';
import { NoMealsFound } from '@/components/NoMealsFound';
import LoadingSearchResults from '@/components/LoadingSearchResults';

export const Route = createFileRoute('/search/$query')({
  component: SearchPage,
});

function SearchPage() {
  const params = Route.useParams();

  const query = params.query;

  const sanitizedQuery = getSanitizedSearchQuery(query);

  const {data, isLoading, error} = useFetchRecipesByQuery(sanitizedQuery);

  if (isLoading) {
    return <div><LoadingSearchResults /></div>
  }

  if (error) {
    return <div>Something went wrong</div>
  }

  if (!data || data?.length === 0) {
    return <div><NoMealsFound query={query} /></div>
  }

  return (
    <div>
      <SearchResults meals={data} query={query} />
    </div>
  );
}

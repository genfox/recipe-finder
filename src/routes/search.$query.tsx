import { createFileRoute } from '@tanstack/react-router'

import useFetchRecipesByQuery from '@/hooks/useFetchRecipesByQuery';
import { getSanitizedSearchQuery } from '@/lib/utils';

import SearchResults from '@/components/SearchResults';
import { NoMealsFound } from '@/components/NoMealsFound';
import LoadingSearchResults from '@/components/LoadingSearchResults';
import { RequestError } from '@/components/RequestError';

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
    return <div><RequestError /></div>
  }

  if (!data || data?.length === 0) {
    return <div><NoMealsFound queryType="query" value={query} /></div>
  }

  return (
    <div>
      <SearchResults meals={data} query={query} />
    </div>
  );
}

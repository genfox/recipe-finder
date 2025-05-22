import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { getPopularSearches } from "@/lib/utils"

interface NoMealsFoundProps {
  query: string
}

export function NoMealsFound({
  query,
}: NoMealsFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="max-w-md mx-auto mb-8">
        <img src="/images/no-results.svg" alt="No meals found" width={200} height={200} className="mx-auto" />
      </div>

      <h2 className="text-2xl font-bold mb-2">No meals found</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        We couldn't find any recipes matching "<span className="font-medium text-foreground">{decodeURIComponent(query)}</span>". Try a
        different search term or browse our suggestions.
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {getPopularSearches().map((term) => (
          <Button key={term} variant="outline" size="sm" asChild>
            <Link to="/search/$query" params={{ query: encodeURIComponent(term) }}>
              <Search className="mr-2 h-4 w-4" />
              {term}
            </Link>
          </Button>
        ))}
      </div>

      <Button asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  )
}

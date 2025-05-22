import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"

export function NoFavoriteFound() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="max-w-md mx-auto mb-8">
        <img src="/images/favorite.svg" alt="No favorite found" width={200} height={200} className="mx-auto" />
      </div>

      <h2 className="text-2xl font-bold mb-2">No favorite found</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        You still don't have any favorite recipe saved. Try searching for a recipe using the search function and add it to your favorites.
      </p>

      <Button asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  )
}

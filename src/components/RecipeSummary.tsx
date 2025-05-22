import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "@tanstack/react-router"
import ToggleFavoriteRecipe from "./ToggleFavoriteRecipe"
import type { Meal } from "@/lib/types"
// import { Link } from "@tanstack/react-router"

export function RecipeSummary({ meal }: { meal: Meal }) {
    // Create a short description by truncating the instructions
    const shortDescription = meal.strInstructions
        .split("\r\n")[0] // Take just the first paragraph
        .substring(0, 120) // Limit to 120 characters
        .trim()
        .concat("...") // Add ellipsis

    // Parse tags if they exist
    const tagList = meal.strTags ? meal.strTags.split(",").slice(0, 2) : [] // Show max 2 tags

    return (
        <Link to="/recipe/$recipeId" params={{ recipeId: meal.idMeal }} viewTransition>
            <Card className="overflow-hidden h-full max-w-sm py-0 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <div className="aspect-video relative overflow-hidden">
                    <img src={meal.strMealThumb || "/placeholder.svg?height=200&width=300"} alt={meal.strMeal} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 right-2">
                        <div className="flex justify-between">
                            <Badge className="bg-white/90 text-gray-800 cursor-default">{meal.strCategory}</Badge>
                            <ToggleFavoriteRecipe meal={meal} variant="only-icon" />
                        </div>
                    </div>
                    {/* <div className="absolute top-2 right-2">
                        <ToggleFavoriteRecipe meal={meal} variant="only-icon" />
                    </div> */}
                </div>
                <CardContent className="p-4">
                    <h3 className="text-lg font-semibold line-clamp-1 mb-1">{meal.strMeal}</h3>
                    <p className="text-sm text-muted-foreground/70 mb-3">{meal.strArea} Cuisine</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{shortDescription}</p>

                    {tagList.length > 0 && (
                        <div className="flex gap-2 mt-3">
                            {tagList.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    )
}

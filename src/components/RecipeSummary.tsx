import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "@tanstack/react-router"
import ToggleFavoriteRecipe from "./ToggleFavoriteRecipe"
import type { Meal } from "@/lib/types"
import { getRecipeShortDescription } from "@/lib/utils"

export default function RecipeSummary({ meal }: { meal: Meal }) {
    // Create a short description by truncating the instructions
    const shortDescription = getRecipeShortDescription(meal);

    // Parse tags if they exist
    const tagList = meal.strTags ? meal.strTags.split(",").slice(0, 2) : [] // Show max 2 tags

    let mealImage = "";
    if (meal.strMealThumb) {
        mealImage = `${meal.strMealThumb}/medium`; // get the small preview image for the recipe card
    }

    return (
        <Link to="/recipe/$recipeId" params={{ recipeId: meal.idMeal }} viewTransition>
            <Card data-testid={`test-recipe-summary-${meal.idMeal}`} className="overflow-hidden h-full max-w-sm py-0 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <div className="aspect-video relative overflow-hidden">
                    <img src={mealImage} alt={meal.strMeal} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 right-2">
                        <div className="flex justify-between">
                            <Badge className="bg-white/90 text-gray-800 cursor-default">{meal.strCategory}</Badge>
                            <ToggleFavoriteRecipe meal={meal} variant="only-icon" />
                        </div>
                    </div>
                </div>
                <CardContent className="p-4">
                    <p className="text-lg font-semibold line-clamp-1 mb-1">{meal.strMeal}</p>
                    <p className="text-sm mb-3">{meal.strArea} Cuisine</p>
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

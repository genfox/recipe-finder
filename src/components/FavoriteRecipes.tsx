import type { Meal } from "@/lib/types";
import RecipeSummary from "./RecipeSummary";
import { NoFavoriteFound } from "./NoFavoriteFound";

export default function FavoriteRecipes({ meals }: { meals: Meal[] }) {
    if (meals.length === 0) {
        return <NoFavoriteFound />
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Favorite Recipes</h1>
            <p className="text-muted-foreground mb-6">These are you favorite recipes</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    meals.map(meal => (
                        <RecipeSummary
                            key={meal.idMeal}
                            meal={meal}
                        />
                    ))
                }
            </div>
        </div>
    );
}
import type { Meal } from "@/lib/types";
import RecipeSummary from "./RecipeSummary";

export default function SearchResults({ query, meals }: { query: string, meals: Meal[] }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Search Results</h1>
            <p className="text-muted-foreground mb-6">Showing {meals.length} result(s) for "{decodeURIComponent(query)}"</p>
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
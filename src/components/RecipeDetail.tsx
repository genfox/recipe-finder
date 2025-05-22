import type { SVGProps } from "react";
import type { Meal } from "@/lib/types";

import { ExternalLink, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

import ToggleFavoriteRecipe from "@/components/ToggleFavoriteRecipe";
import { FullScreenImage } from "./FullScreenImage";

const YouTube = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 256 180" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}>
        <path d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z" fill="red" />
        <path fill="#FFF" d="m102.421 128.06 66.328-38.418-66.328-38.418z" />
    </svg>
);

// Helper function to get all ingredients and measures
function getIngredients(recipe: any) {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`]
        const measure = recipe[`strMeasure${i}`]

        if (ingredient && ingredient.trim() !== "") {
            ingredients.push({
                name: ingredient,
                measure: measure,
            })
        }
    }
    return ingredients
}

// Helper function to format instructions into paragraphs
function formatInstructions(instructions: string) {
    return instructions.split("\r\n").filter((step) => step.trim() !== "")
}

export default function RecipeDetail({ recipe }: { recipe: Meal }) {
    const ingredients = getIngredients(recipe)
    const instructions = formatInstructions(recipe.strInstructions)
    const tags = recipe.strTags ? recipe.strTags.split(",") : []

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section with Full-width Image and Overlay */}
            <div className="relative h-[50vh] w-full">
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    loading="eager"                /* mimics priority */
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-12">
                    <div className="max-w-4xl mx-auto w-full">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tags.map((tag) => (
                                <Badge key={tag} className="bg-white/90 text-gray-800">
                                    {tag}
                                </Badge>
                            ))}
                            <Badge variant="outline" className="bg-white/90 text-gray-800">
                                {recipe.strCategory}
                            </Badge>
                            <Badge variant="outline" className="bg-white/90 text-gray-800">
                                {recipe.strArea}
                            </Badge>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{recipe.strMeal}</h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Recipe Meta Info */}
                <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center border rounded-md p-2 text-sm font-bold">
                            <Clock className="h-5 w-5 text-orange-500 mr-2" />
                            <span className="text-gray-700">{new Date(recipe.dateModified ?? Date.now()).toLocaleDateString("en-EN")}</span>
                        </div>
                        <div className="flex items-center">
                            <ToggleFavoriteRecipe meal={recipe} variant="icon-and-label" />
                        </div>
                    </div>

                    <div className="flex gap-3 flex-wrap items-center">
                        <FullScreenImage imageUrl={recipe.strMealThumb} imageAlt={recipe.strMeal} />

                        {recipe.strSource && (
                            <Button variant="outline" size="default" className="flex items-center" asChild>
                                <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4 text-orange-500" />
                                    Source
                                </a>
                            </Button>
                        )}

                        {recipe.strYoutube && (
                            <Button variant="outline" size="default" asChild>
                                <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
                                    <YouTube />
                                    Watch Video
                                </a>
                            </Button>
                        )}
                    </div>
                </div>

                <Separator className="my-8" />

                {/* Two Column Layout for Ingredients and Instructions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Ingredients Column */}
                    <div className="md:col-span-1">
                        <div className="sticky top-8">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Ingredients</h2>
                            <ul className="space-y-2">
                                {ingredients.map((ingredient, index) => (
                                    <li key={index} className="pb-1 border-b border-gray-100">
                                        <span className="font-medium text-gray-900 block">{ingredient.name}</span>
                                        <span className="text-gray-600 text-sm">{ingredient.measure}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Instructions Column */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Instructions</h2>
                        <div className="space-y-2">
                            {instructions.map((step, index) => (
                                <div key={index}>
                                    <div className="py-6">
                                        <p className="text-gray-700 leading-relaxed">{step}</p>
                                    </div>
                                    {index < instructions.length - 1 && (
                                        <div className="flex items-center">
                                            <div className="flex-grow h-px bg-gray-200"></div>
                                            <div className="mx-4">
                                                <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                                            </div>
                                            <div className="flex-grow h-px bg-gray-200"></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
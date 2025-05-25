import { toast } from "sonner";

import type { Meal } from "@/lib/types";

import useAppStore from "@/store/appStore";

import { Button } from "@/components/ui/button";

import { Heart, HeartOff } from "lucide-react";
import { Badge } from "./ui/badge";

interface ToggleFavoriteRecipeProps {
    meal: Meal
    variant: "only-icon" | "icon-and-label"
}

export default function ToggleFavoriteRecipe({ meal, variant }: ToggleFavoriteRecipeProps) {
    const { favorites } = useAppStore();

    const isFavorite = favorites?.isFavorite || null;

    const isMealFavorite = isFavorite ? isFavorite(meal) : false;

    const label = isMealFavorite ? "Remove from favorites" : "Add to favorites";

    const toggleLocalFavorite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();


        let label = "Meal added to favorites!";
        let icon = <Heart className="h-4 w-4 mr-2" />;
        if (isMealFavorite) {
            label = "Meal removed from favorites!";
            icon = <HeartOff className="h-4 w-4 mr-2" />;
        }
        favorites.toggleFavorite(meal);
        toast(label, { icon });
    };

    if (variant === "only-icon") {
        return (
            <Badge
                data-testid="test-favorite-button"
                className="cursor-pointer bg-white/90 text-gray-800 hover:bg-white/80"
                aria-label={label}
                onClick={toggleLocalFavorite}
            >
                <Heart className="h-6 w-6 text-orange-500" fill={isMealFavorite ? "#ff6900" : "transparent"} strokeWidth={isMealFavorite ? 0 : 2} />
                <span className="sr-only">{label}</span>
            </Badge>
        )
    }

    return (
        <Button
            data-testid="test-favorite-button"
            variant="outline"
            className="cursor-pointer"
            onClick={toggleLocalFavorite}
        >
            <Heart className="text-orange-500" fill={isMealFavorite ? "#ff6900" : "transparent"} strokeWidth={isMealFavorite ? 0 : 2} /> {label}
        </Button>
    );
}
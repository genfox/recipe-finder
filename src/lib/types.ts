export interface Meal {
    idMeal: string;
    strMeal: string;
    strMealAlternate: string | null;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string | null;
    strYoutube: string;
    [key: `strIngredient${number}`]: string;
    [key: `strMeasure${number}`]: string;
    strSource: string | null;
    strImageSource: string | null;
    strCreativeCommonsConfirmed: string | null;
    dateModified: string | null;
}
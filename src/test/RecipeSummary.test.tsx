import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';

import RecipeSummary from '@/components/RecipeSummary';
import mockRecipe from './mocks/recipe';
import { getRecipeShortDescription } from '@/lib/utils';

// Mock Link from @tanstack/react-router
vi.mock('@tanstack/react-router', () => ({
    Link: ({ children, to, params }: { children: React.ReactNode, to: String, params: { recipeId: String } }) => {
        const url = to.replace("$recipeId", params.recipeId as string);
        return <a href={url} id='mock-link'>{children}</a>;
    },
}));

describe('component test', () => {
    it('renders the recipe image, title, cuisine, and short description', () => {
        render(<RecipeSummary meal={mockRecipe} />);

        expect(screen.getByAltText(mockRecipe.strMeal)).toBeVisible();
        expect(screen.getByText(mockRecipe.strMeal)).toBeVisible();
        expect(screen.getByText(`${mockRecipe.strArea} Cuisine`)).toBeVisible();
        expect(screen.getByText(getRecipeShortDescription(mockRecipe))).toBeVisible();
        expect(screen.getByText(mockRecipe.strCategory)).toBeVisible();
        expect(screen.getByRole("img")).toBeVisible();
        expect(screen.getByRole("img")).toHaveAttribute("src", `${mockRecipe.strMealThumb}/medium`);
    });

    it('renders only the first 2 tags if they exist', () => {
        const mockRecipeWithCustomTags = {
            ...mockRecipe,
            strTags: "Test1,Test2,Test3,Test4"
        };
        render(<RecipeSummary meal={mockRecipeWithCustomTags} />);

        expect(screen.getByText('Test1')).toBeVisible();
        expect(screen.getByText('Test2')).toBeVisible();
        expect(screen.queryByText('Test3')).toBeNull();
        expect(screen.queryByText('Test4')).toBeNull();
    });

    it('does not render tags if strTags is empty', () => {
        const mealWithoutTags = { ...mockRecipe, strTags: null };
        render(
            <RecipeSummary meal={mealWithoutTags} />
        );

        expect(screen.queryByText('Fish')).toBeNull();
        expect(screen.queryByText('Pie')).toBeNull();
    });

    it('renders a link to the recipe details page', async () => {
        render(
            <RecipeSummary meal={mockRecipe} />
        );

        const linkElement = screen.getByRole('link');
        expect(linkElement).toHaveAttribute('href', `/recipe/${mockRecipe.idMeal}`);
    });

    it('renders the ToggleFavoriteRecipe component', () => {
        render(
            <RecipeSummary meal={mockRecipe} />
        );

        expect(screen.getByText('Add to favorites')).toBeVisible();
    });
});
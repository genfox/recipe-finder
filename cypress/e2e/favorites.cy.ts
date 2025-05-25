import { getSanitizedSearchQuery } from "@/lib/utils";
import mockRecipe from "@/test/mocks/recipe";

describe('Favorites functionality', () => {
    it('search for the string "Pasta" and add element to favorites', () => {
        const queryTerm = getSanitizedSearchQuery("MockRecipe");
        cy.intercept(
            {
                method: 'GET', // Route all GET requests
                url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${queryTerm}`,
            },
            {
                "meals": [mockRecipe]
            }
        ).as('getMealByQuery');
        cy.visit("http://localhost:3000");
        cy.get("[data-testid='test-search-input']").type(queryTerm!);
        cy.get("[data-testid='test-search-button']").contains("Search Recipes").click();
        cy.wait("@getMealByQuery");
        cy.get("[data-testid='test-favorite-button']").click();
        cy.visit("http://localhost:3000/favorites");
        const summaryId = `test-recipe-summary-${mockRecipe.idMeal}`;
        cy.get(`[data-testid='${summaryId}']`).contains(mockRecipe.strMeal);
    });

    it('Remove recipe from favorites', () => {
        const mockStore = JSON.stringify(
            {
                "state": {
                    "favorites": {
                        "favoriteIds": [mockRecipe.idMeal],
                        "favoriteMeals": [mockRecipe]
                    },
                    "lastSearch": { "query": null, "resultIds": [], "result": [], "timestamp": null }
                },
                "version": 0
            }
        );
        localStorage.setItem("recipe-hub-store", mockStore);
        cy.visit("http://localhost:3000/favorites");
        cy.get("[data-testid='test-favorite-button']").click();
        cy.get("h2").contains("No favorite found");
    });
})
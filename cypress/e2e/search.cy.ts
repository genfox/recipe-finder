import { getSanitizedSearchQuery } from "@/lib/utils";
import mockRecipe from "@/test/mocks/recipe";

describe('Search functionality', () => {
    beforeEach(() => cy.visit("http://localhost:3000"));
    it('renders search page', () => {
        cy.get("h1").contains("RecipeFinder");
    });
    it('renders search recipes button', () => {
        cy.get("[data-testid='test-search-button']").contains("Search Recipes");
    });
    it('search for the string "Test" should not find results', () => {
        const queryTerm = getSanitizedSearchQuery("MockNullRecipe");
        cy.intercept(
            {
                method: 'GET', // Route all GET requests
                url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${queryTerm}`,
            },
            {
                "meals": null
            }
        ).as('getMealByQuery');
        cy.get("[data-testid='test-search-input']").type(queryTerm!);
        cy.get("[data-testid='test-search-button']").contains("Search Recipes").click();
        cy.location("pathname").should("equal", `/search/${queryTerm}`);
        cy.wait("@getMealByQuery");
        cy.get("h2").contains("No meals found");
    });
    it('search for meals with the query "MockRecipe"', () => {
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
        cy.get("[data-testid='test-search-input']").type(queryTerm!);
        cy.get("[data-testid='test-search-button']").contains("Search Recipes").click();
        cy.location("pathname").should("equal", `/search/${queryTerm}`);
        cy.wait("@getMealByQuery");
        cy.get("h1").contains("Search Results");
        const summaryId = `test-recipe-summary-${mockRecipe.idMeal}`;
        cy.get(`[data-testid='${summaryId}']`).contains(mockRecipe.strMeal);
    });
})
import mockRecipe from "@/test/mocks/recipe";

describe('Detail page for a recipe', () => {
    it('go to a meal detail page', () => {
        cy.intercept(
            {
                method: 'GET',
                url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mockRecipe.idMeal}`,
            },
            {
                "meals": [mockRecipe]
            }
        ).as('getMealById');
        cy.visit(`http://localhost:3000/recipe/${mockRecipe.idMeal}`);
        cy.wait("@getMealById");
        cy.get("h1").contains(mockRecipe.strMeal);
        cy.get("h2").contains("Ingredients");
        cy.get("span").contains("Floury Potatoes");
        cy.get("h2").contains("Instructions");
        cy.get("p").contains("01.Put the potatoes in a large pan of cold salted water and bring to the boil. Lower the heat, cover, then simmer gently for 15 minutes until tender. Drain, then return to the pan over a low heat for 30 seconds to drive off any excess water. Mash with 1 tbsp olive oil, then season.")
    })
})
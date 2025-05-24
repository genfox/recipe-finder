# Recipe Explorer

A React web application built with modern web development tools to explore and manage your favorite recipes.

## Technologies Used

* **React:** A JavaScript library for building user interfaces.
* **Tanstack Router:** A type-safe routing library for React.
* **Vite:** A fast build tool and development server.
* **Zustand:** A small, fast, and scalable bearbones state-management solution.
* **Shadcn UI:** A collection of beautifully designed and accessible UI components built using Radix UI primitives and Tailwind CSS.
* **Custom Hooks:** For efficient data fetching from the MealDB API.

## Features

* **Search Recipes:** Find recipes by entering keywords.
* **View Recipe Details:** Explore detailed information about each recipe.
* **Random Recipe:** Discover a random recipe with a single click.
* **Favorites:** Add and remove recipes from your favorites list (persisted in local storage).
* **Last Search History:** Your recent search queries and their results are cached in local storage for 24 hours for faster access.
* **Efficient Data Fetching:** When viewing a recipe, the app first checks local storage (favorites and last searches) before making an API call.

## API Used

This application utilizes the [TheMealDB API](https://www.themealdb.com/api.php) to fetch recipe data.

## Project Structure
```text
src/
├── components/
│   ├── ui/             # Shadcn UI components
│   │   ├── ...
│   ├── FullScreenImage.tsx
│   ├── Header.tsx
│   ├── LoadingRecipeDetail.tsx
│   ├── LoadingSearchResults.tsx
│   ├── MobileMenu.tsx
│   ├── NoFavoriteFound.tsx
│   ├── NoMealsFound.tsx
│   ├── RecipeDetail.tsx
│   ├── RecipeSummary.tsx
│   ├── RequestError.tsx
│   ├── SearchDialog.tsx
│   ├── SearchForm.tsx
│   ├── SearchResults.tsx
│   ├── ThemeProvider.tsx
│   ├── ToggleFavoriteRecipe.tsx
│   └── ToggleTheme.tsx
├── hooks/
│   ├── useFetchRandomMeal.tsx
│   ├── useFetchRecipeById.tsx
│   └── useFetchRecipesByQuery.tsx
├── lib/
│   ├── types.ts
│   └── utils.ts
├── routes/
│   ├── _root.tsx
│   ├── favorites.tsx
│   ├── index.tsx
│   ├── random.tsx
│   ├── recipe.$recipeId.tsx
│   └── search.$query.tsx
├── store/
│   ├── appStore.ts
│   ├── favoritesStore.ts
│   └── lastSearchStore.ts
├── assets/
│   └── logo.svg
├── main.tsx
└── ...
```

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your_repository_url>
    cd <your_repository_name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    Open your browser and navigate to `http://localhost:3000` (or the port Vite provides).

4. **Building For Production:**
    ```bash
    npm run build
    ```

## Functionalities

* **Searching:** Use the search bar to look for recipes based on ingredients or dish names.
* **Favorites:** Click the heart icon on a recipe card or detail page to add it to your favorites. Access your saved favorites via the "Favorites" link.
* **Random Recipe:** Navigate to `/random` to discover a randomly selected recipe.
* **Recipe Details:** Click on a recipe to view its full details, including ingredients and instructions.
* **Last Search:** The application remembers your recent searches, allowing for quicker revisits within a 24-hour window.

## Testing

*(This section will be updated later once testing is integrated.)*

---

Thank you for checking out the Recipe Explorer!
import { API_URL, NUM_SEARCH_RESULTS_SHOWN } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: NUM_SEARCH_RESULTS_SHOWN,
    page: 1,
  },
};

export const loadRecipe = async function (recipeId) {
  try {
    const data = await getJSON(`${API_URL}/recipes/${recipeId}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      originalservings: recipe.servings,
      currentServings: recipe.servings,
      cookingTime: recipe.cooking_time,
      originalIngredients: recipe.ingredients,
      currentIngredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(`Fetching recipe raised error: ${err}`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    console.log(`Searching recipes with query: '${query}'`);
    const data = await getJSON(`${API_URL}/recipes?search=${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        imageUrl: recipe.image_url,
      };
    });
  } catch (err) {
    console.error(`Loading search results raised error: ${err}`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return {
    currentPage: state.search.page,
    nextPage: end < state.search.results.length ? page + 1 : null,
    results: state.search.results.slice(start, end),
  };
};

export const modifyServings = function (newServings) {
  state.recipe.currentServings = newServings;

  const servingsModifier =
    state.recipe.currentServings / state.recipe.originalservings;

  state.recipe.currentIngredients = state.recipe.originalIngredients.map(
    ing => {
      return {
        ...ing,
        quantity: ing.quantity
          ? Math.round(ing.quantity * servingsModifier * 10 ** 2) / 10 ** 2
          : ing.quantity,
      };
    }
  );
};

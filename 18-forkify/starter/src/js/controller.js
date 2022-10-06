import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchInputView from './views/searchInputView';
import searchResultsView from './views/searchResultsView.js';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // Load recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // Render recipe
    recipeView.render(recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    searchResultsView.renderSpinner();

    const query = searchInputView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    searchResultsView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchInputView.addHandlerSearch(controlSearchResults);
};

init();

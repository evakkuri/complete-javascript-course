import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import searchInputView from './views/searchInputView';
import searchResultsView from './views/searchResultsView.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // Update results view to mark selected search result
    searchResultsView.update(model.getSearchResultsPage().results);

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

    controlPagination();
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage = 1) {
  const searchResultsPage = model.getSearchResultsPage(goToPage);
  searchResultsView.render(searchResultsPage.results);
  paginationView.render(searchResultsPage);
};

const controlServings = function (servingsChange) {
  model.modifyServings(servingsChange);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchInputView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPaginationClick(controlPagination);
};

init();

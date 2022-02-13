import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MODAL_CLOSE_SEC } from './config.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) module.hot.accept();

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Load spinner
    recipeView.renderSpinner();
    // Update result view to mark
    resultView.update(model.loadSearchResultPage());
    // Get data
    await model.loadRecipe(id);
    const recipe = model.state.recipe;

    // Render recipe
    recipeView.render(recipe);

    bookmarkView.update(model.state.bookmarks);
    //
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
};
const controlSearchResult = async function () {
  try {
    resultView.renderSpinner();
    // Get query
    const query = searchView.getQuey();
    if (!query) return;
    // Call loadSR from model
    await model.loadSearchResult(query);
    // Render result
    // resultView.render(model.state.search.results);
    resultView.render(model.loadSearchResultPage(1));
    //Render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goTo) {
  // resultView.render(model.state.search.results);
  resultView.render(model.loadSearchResultPage(goTo));
  //Render pagination
  paginationView.render(model.state.search);
};

const controlUpdateServing = function (updateTo) {
  // Up date serving to state from model
  model.updateServing(updateTo);
  // Render view
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  // Add remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  // Update view
  recipeView.update(model.state.recipe);
  // Render bookmark
  bookmarkView.render(model.state.bookmarks);
  console.log(model.state.recipe);
};
const controlLoadBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};
const controlUpload = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    // render view
    recipeView.render(model.state.recipe);
    bookmarkView.render(model.state.bookmarks);
    console.log(model.state.bookmarks);
    // render message
    addRecipeView.renderMessage();
    // Close modal
    setTimeout(function () {
      addRecipeView.toggleForm();
    }, MODAL_CLOSE_SEC * 1000);

    // Change id url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};
const init = function () {
  bookmarkView.addHandlerRender(controlLoadBookmark);
  recipeView.addHandleRender(controlRecipes);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandleRender(controlSearchResult);
  paginationView.addEventHandler(controlPagination);
  recipeView.addHandlerUpdateServing(controlUpdateServing);
  addRecipeView.addHandlerUpload(controlUpload);
  console.log('Welcome');
};
init();

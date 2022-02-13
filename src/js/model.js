import { API_URL, key } from './config.js';
// import { getJSON, sendJSON } from './helper.js';
import { AJAX } from './helper.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPerPage: 10,
  },
  bookmarks: [],
};
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}`);
    state.recipe = createRecipeObject(data);
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
  } catch (err) {
    console.error(err + '💥💥💥💥');
    throw err;
  }
};
export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${key}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};
export const loadSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  let start = (page - 1) * state.search.resultPerPage; //Page = 1 => 0
  let end = page * state.search.resultPerPage; // page = 1 => 10
  return state.search.results.slice(start, end);
};
export const updateServing = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    return (ing.quantity = (ing.quantity * newServing) / state.recipe.servings);
  });
  state.recipe.servings = newServing;
};
const persistBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
const init = function () {
  const data = JSON.parse(localStorage.getItem('bookmarks'));

  if (data) state.bookmarks = data;
};
init();
export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmark();
};
export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmark();
};
const clear = function () {
  localStorage.removeItem('bookmarks');
};
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(ing => ing[0].startsWith('ingredient') && ing[1] !== '')
      .map(ing => {
        // const arr = ing[1].replaceAll(' ', '').split(',');
        const arr = ing[1].split(',').map(el => el.trim());

        if (arr.length !== 3)
          throw new Error('Wrong ingredient format. Please try again :(');

        const [quantity, unit, description] = arr;
        return { quantity: quantity ? quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await AJAX(`${API_URL}?key=${key}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

import icons from 'url:../../img/icons.svg';
import { View } from './View.js';
class AddRecipeView extends View {
  constructor() {
    super();
    this.handleShowForm();
    this.handleCloseForm();
  }
  _parentEl = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded';
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _overlay = document.querySelector('.overlay');
  _modal = document.querySelector('.add-recipe-window');
  toggleForm() {
    this._overlay.classList.toggle('hidden');
    this._modal.classList.toggle('hidden');
  }
  handleShowForm() {
    this._btnOpen.addEventListener('click', this.toggleForm.bind(this));
  }
  handleCloseForm() {
    this._overlay.addEventListener('click', this.toggleForm.bind(this));
    this._btnClose.addEventListener('click', this.toggleForm.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}
export default new AddRecipeView();

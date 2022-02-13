import { View } from './View.js';
class SearchView {
  _parentEl = document.querySelector('.search');

  getQuey() {
    const query = document.querySelector('.search__field').value;
    this._clear();
    return query;
  }
  _clear() {
    document.querySelector('.search__field').value = '';
  }

  addHandleRender(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();

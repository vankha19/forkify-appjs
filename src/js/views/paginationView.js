import icons from 'url:../../img/icons.svg';
import { View } from './View.js';
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addEventHandler(hander) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goTo = +btn.dataset.goto;
      hander(goTo);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    // Page 1 and other
    if (currentPage === 1 && numPages > 1)
      return `
            <button data-goto="${
              currentPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`;
    // Last page
    if (currentPage === numPages && numPages > 1)
      return `
            <button data-goto="${
              currentPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>`;
    // Other
    if (currentPage > 1)
      return `
            <button data-goto="${
              currentPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>
            <button data-goto="${
              currentPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
    `;
    // Page 1 and no one
    return '';
  }
}
export default new PaginationView();

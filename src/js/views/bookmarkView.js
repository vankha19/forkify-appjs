import { View } from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
  // _generateMarkupPreview(ing) {
  //   const id = window.location.hash.slice(1);
  //   return `
  //       <li class="preview">
  //           <a class="preview__link ${
  //             ing.id === id ? 'preview__link--active' : ''
  //           }" href="#${ing.id}">
  //             <figure class="preview__fig">
  //               <img src="${ing.image}" alt="${ing.title}" />
  //             </figure>
  //             <div class="preview__data">
  //               <h4 class="preview__title">${ing.title}</h4>
  //               <p class="preview__publisher">${ing.publisher}</p>
  //               <div class="preview__user-generated">

  //               </div>
  //             </div>
  //           </a>
  //       </li>`;
  // }
}
export default new BookmarkView();

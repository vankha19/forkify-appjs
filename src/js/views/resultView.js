import { View } from './View.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again!';
  _message = '';
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
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
export default new ResultView();

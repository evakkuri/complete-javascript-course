import icons from 'url:../../img/icons.svg';

import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPaginationClick(handlerFunc) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);
      console.log(goToPage);
      handlerFunc(goToPage);
    });
  }

  _generateMarkup() {
    const markup =
      (this._data.currentPage > 1
        ? `
          <button data-goto="${
            this._data.currentPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.currentPage - 1}</span>
          </button>
        `
        : '') +
      (this._data.nextPage
        ? `
          <button data-goto="${this._data.nextPage}" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.nextPage}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `
        : '');

    return markup;
  }
}

export default new PaginationView();

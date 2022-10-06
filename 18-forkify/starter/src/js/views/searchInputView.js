class SearchInputView {
  #parentElement = document.querySelector('.search');
  #searchFieldElement = this.#parentElement.querySelector('.search__field');
  getQuery() {
    return this.#searchFieldElement.value;
  }

  addHandlerSearch(handlerFunc) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handlerFunc();
    });
  }

  #clearInput() {
    this.#searchFieldElement.value = '';
  }
}

export default new SearchInputView();

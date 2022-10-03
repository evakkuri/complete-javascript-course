'use strict';

const APIURL = 'https://restcountries.com/v2';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

///////////////////////////////////////

const renderCountry = function (data, isNeighbour = false) {
  const html = `
    <article class="country ${isNeighbour ? 'neighbour' : ''}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

/*
CALLBACK HELL VERSION

const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `${APIURL}/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);

    // Get neighbour country (2)
    const neighbour = data.borders?.[0];
    console.log(neighbour);
    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `${APIURL}/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      console.log(this.responseText);
      const data = JSON.parse(this.responseText);
      renderCountry(data, true);
    });
  });
}; 
*/

const getJson = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    console.log(response);
    if (!response.ok) throw new Error(`${errorMessage} (${response.status})`);
    return response.json();
  });
};

const getCountryAndNeighbour = function (country) {
  getJson(`${APIURL}/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0]?.borders?.[0];
      //const neighbour = 'asdlh';
      if (!neighbour) throw new Error('No neighbour found');
      return getJson(`${APIURL}/alpha/${neighbour}`, 'Country not found');
    })
    .then(data => renderCountry(data, true))
    .catch(err => {
      console.error(`Something went wrong 💥 ${err}`);
      renderError(`Something went wrong 💥 ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryAndNeighbour('iceland');
});

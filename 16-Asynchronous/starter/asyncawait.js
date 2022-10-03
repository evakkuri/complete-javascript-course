'use strict';

const countriesContainer = document.querySelector('.countries');
const reverseGeocodingUrl = 'https://geocode.xyz';
const countryUrl = 'https://restcountries.com/v2';

const getJSON = async function (url, errorMsg = 'Something went wrong') {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  return await response.json();
};

const renderCountry = function (data, isNeighbour = false) {
  const html = `
    <article class="country ${isNeighbour ? 'neighbour' : ''}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const whereAmI = async function (lat, lon) {
  try {
    const queryUrl = `${reverseGeocodingUrl}/${lat},${lon}?geoit=json`;
    const locationResp = await fetch(queryUrl);

    if (!locationResp.ok) throw new Error('Problem getting location data');

    const locationData = await locationResp.json();

    console.log(locationData);
    const countryResp = await fetch(
      `${countryUrl}/name/${locationData.country.toLowerCase()}`
    );
    console.log(countryResp);
    const data = await countryResp.json();
    console.log(data);
    renderCountry(data[0]);

    return `You are in ${locationData.city}, ${locationData.country}`;
  } catch (err) {
    console.error(err);
  }
};

(async function () {
  const locString = await whereAmI(-33.933, 18.474);
  console.log(locString);
})();

// Promise.all
const get3Countries = async function (countryNamesArr) {
  try {
    const countryDataArr = await Promise.all(
      countryNamesArr.map(async name => {
        const [data] = await (await fetch(`${countryUrl}/name/${name}`)).json();
        return data;
      })
    );
    console.log(countryDataArr.map(country => country.capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries(['portugal', 'canada', 'tanzania']);

/* 
Promise.race -> first promise that is resolved or rejected. Useful for
example for creating timeout promises to short-circuit overly long running
requests.
*/

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => reject(new Error('Request took too long!')), sec * 1000);
  });
};

Promise.race([getJSON(`${countryUrl}/name/tanzania`), timeout(1)]);

/*
Promise.allSettled -> returns results of all promises, does not short
circuit even if some promises fail
*/

/* 
Promise.any (ES2021) -> returns first resolved promise.
*/

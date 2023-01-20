"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
const renderError = function (errorMsg) {
  countriesContainer.insertAdjacentText("beforeend", errorMsg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (country, className = "") {
  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${country.flag}" />
          <div class="country__data">
            <h3 class="country__name">${country.name}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${
              +country.population > 1000000
                ? (+country.population / 1000000).toFixed(1)
                : +country.population
            } people</p>
            <p class="country__row"><span>🗣️</span>${
              country.languages[0].name
            }</p>
            <p class="country__row"><span>💰</span>${
              country.currencies[0].name
            }</p>
          </div>
        </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  // countriesContainer.style.opacity = 1;
};

// Challenge 1
const whereAmI = function (lat, lon) {
  fetch(
    `https://geocode.xyz/${lat},${lon}?geoit=json&auth=119352132948252e15838634x3713`
  )
    .then((response) => {
      if (!response.ok) throw new Error("Only 3 requests per second please!");
      return response.json();
    })
    .then((data) => {
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then((response) => {
      if (!response.ok) throw new Error("Country not found");
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
    })
    .catch((err) => {
      console.error(`Something went wrong! ${err.message}`);
      renderError(err);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
whereAmI(-36.38922, 148.65293);
whereAmI(27.71558, 85.32528);

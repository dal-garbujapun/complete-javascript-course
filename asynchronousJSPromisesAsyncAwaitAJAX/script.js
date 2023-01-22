"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

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
  countriesContainer.style.opacity = 1;
};
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error)
    );
  });
};
const whereAmI = async function (country) {
  //geolocation
  const geolocationPosition = await getPosition();
  const { latitude: lat, longitude: lng } = geolocationPosition.coords;

  // reverse geocode
  const response = await fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=119352132948252e15838634x3713`
  );
  const geocodeData = await response.json();

  // country data
  const res = await fetch(
    `https://restcountries.com/v2/name/${geocodeData.country}`
  );
  const data = await res.json();
  renderCountry(data[0]);
};

whereAmI();

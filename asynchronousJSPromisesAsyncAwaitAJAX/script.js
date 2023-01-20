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
            <p class="country__row"><span>👫</span>${(
              +country.population / 1000000
            ).toFixed(1)} people</p>
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

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then((response) => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Country '${country}' not found (${response.status})`);
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       renderCountry(data[0]);

//       if (!data[0].borders) throw new Error(`Neighbour country not found`);
//       const neighbour = data[0].borders[0];
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then((response) => response.json())
//     .then((data) => renderCountry(data, "neighbour"))
//     .catch((err) => {
//       console.log(`${err} 💥💥💥`);
//       renderError(`Something went wrong ${err.message}. Try again!`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// refactored version
const getJSON = function (url, errMsg = "Ooops, something went wrong! ") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(errMsg);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
    .then((data) => {
      renderCountry(data[0]);

      if (!data[0].borders) throw new Error(`Neighbour country not found`);
      const neighbour = data[0].borders[0];
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        "Neighbour country not found"
      );
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((err) => {
      console.log(`${err} 💥💥💥`);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener("click", function () {
  // test data for no country found
  // getCountryData("123");
  // test data for no neighour found
  getCountryData("australia");
  // this should work
  // getCountryData("nepal");
});

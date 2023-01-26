const getJSON = function (url, errMsg = "Ooops, something went wrong! ") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(errMsg);
    return response.json();
  });
};

/*
Promise.race
- receives array of promises
- returns a single promise (as soon as any input promise gets settled - as in value is available - it don't matter if value got rejected or fulfilled )
- think -> the first settled promise wins the race

- short circuits whenever one of the promise gets settled (no matter fulfilled or rejected)
- e.g if promise gets rejected

- Use case: useful against preventing very long running promises
*/
(async function () {
  const response = await Promise.race([
    // these will race with each other, fullfillment value will be of the winning promise
    getJSON(`https://restcountries.com/v2/name/nepal`),
    getJSON(`https://restcountries.com/v2/name/australia`),
    getJSON(`https://restcountries.com/v2/name/japan`),
  ]);
  console.log(response[0]); // gets different result ( in this case, who took the least time)
})();

// reject after x sec
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error("Request took too long"));
    }, sec * 1000);
  });
};

// reject if it took more than 5 seconds
Promise.race([getJSON(`https://restcountries.com/v2/name/nepal`), timeout(5)])
  .then((data) => console.log(data[0]))
  .catch((err) => console.error(err));

/*
Promise.allSettled
- takes in array of promises
- returns array of all settled promises ( no matter rejcted or not)
- similar to Promise.all except Promise.allSettled never short circuits
*/

Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Success again"),
]).then((res) => console.log(res));

// Promise.all([
//   Promise.resolve("Success"),
//   Promise.reject("Error"),
//   Promise.resolve("Success again"),
// ]).then((res) => console.log(res));

/* 
Promise.any
- es2021
- takes in an array of promise
- returns first fullfilled promise
- ignores rejected promises
- similar to Promise.race but rejected promises are ignored
- result will always gonna be a fullfilled promise unless all got rejected

*/
Promise.any([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Success again"),
]).then((res) => console.log(res));

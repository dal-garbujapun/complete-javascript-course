"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

// building promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//   if (Math.random() >= 0.5) {
//     resolve("YOU WIN! 😁");
//   } else {
//     reject("YOU LOST! 😭");
//   }
// });

// // consuming promise
// lotteryPromise
//   .then((res) => console.log(res))
//   .catch((res) => console.error(res));

///////////////////////////////////////////////////////////////////////////////
// simulate the time that is passed betn buying lottery ticket and getting the
// result to encapsulate asynchoronous behaviour into a promise
// building promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Lottery draw is happening!!!");
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve("YOU WIN!!! 😁");
    } else {
      reject(new Error("YOU LOST! 😭"));
    }
  }, 2000);
});

// consuming promise
lotteryPromise
  .then((res) => console.log(res))
  .catch((res) => console.error(res));

///////////////////////////////////////////////////////////////////////////////
// Promisifying the setTimeout
// (callback based asynchronous to promised based asynchronous)
//
// just like fetch is a function that returns a promise, here we're creating
// a function that returns a promise
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000); // we don't need any value
  });
};

// consuming
wait(1)
  .then(() => {
    console.log("I waited for 1 seconds");
    return wait(1);
  })
  .then(() => {
    console.log("I waited for 2 seconds");
    return wait(1);
  })
  .then(() => {
    console.log("I waited for 3 seconds");
  });

////////////////////////////////////////////////////////////////////////////////
// Fullfilling or rejecting promise immediately

Promise.resolve("Insta Fullfilled!").then((res) => console.log(res));
Promise.reject(new Error("Insta Rejection!")).catch((res) =>
  console.error(res)
);

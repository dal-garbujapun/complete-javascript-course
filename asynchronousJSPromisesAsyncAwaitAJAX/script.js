"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

console.log("Test start");
// fire timer exactly after 0 sec which will be put on the callback queue
setTimeout(() => console.log("0 sec timer"), 0);
// promise that resolves immediately - with a fullfilled value
Promise.resolve("Resolved promise 1").then((res) => console.log(res));
console.log("Test end");

// Order in which these 4 messages will be logged into the console
// 1. Test start
// 2. Test end
// 3. Resolved promise 1 // micro task queue has priority over the callback queue
// 4. 0 sec timer // callback queue

// implications: promise micro task queue can create starvation

// we cannot do high precision things using JavaScript Timers
// when dealing with promises (microtask queue) and timers (callback queue)

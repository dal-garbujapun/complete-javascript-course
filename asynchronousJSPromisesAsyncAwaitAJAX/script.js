"use strict";

const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};

const imageContainer = document.querySelector(".images");
const createImage = (imgPath) => {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      // img.classList.add("image");
      imageContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", () => reject(new Error("Image not found")));
  });
};

let currentImg;
createImage("img/img-1.jpg")
  .then((response) => {
    currentImg = response;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("img/img-2.jpg");
  })
  .then((response) => {
    currentImg = response;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
  })

  .catch((err) => {
    console.error(`${err}`);
  });

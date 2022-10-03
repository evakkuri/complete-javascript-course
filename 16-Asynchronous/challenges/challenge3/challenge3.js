"use strict";

/* 
CODING CHALLENGE 3

PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this
time using async/await (only the part where the promise is consumed). Compare
the two versions, think about the big differences, and see which one you like
more.

Don't forget to test the error handler, and to set the network speed to 'Fast
3G' in the dev tools Network tab.
*/
const imagesContainer = document.querySelector(".images");

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    console.log(`Setting image ${imgPath}`);
    const image = document.createElement("img");
    image.src = imgPath;
    image.classList.add("parallel");

    image.addEventListener("load", function () {
      imagesContainer.append(image);
      resolve(image);
    });

    image.addEventListener("error", function () {
      reject(new Error(`Could not load image ${imgPath}`));
    });
  });
};

const wait = function (sec) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, sec * 1000);
  });
};

const loadNPause = async function (imgPath) {
  try {
    const image = await createImage(imgPath);
    await wait(2);
    image.style.display = "none";
  } catch (err) {
    console.error(err);
  }
};

/*
PART 2
1. Create an async function 'loadAll' that receives an array of image paths
'imgArr';
2. Use .map to loop over the array, to load all the images with the
'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the
array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn
off the 'loadNPause' function.

GOOD LUCK 😀
*/
const loadAll = function (imagePathArr) {
  imagePathArr.forEach((element) => loadNPause(element));
};

loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);

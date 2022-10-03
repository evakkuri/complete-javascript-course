'use strict';

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening...');

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost yout money 💩'));
    }
  }, 1000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2).then(() => {
  console.log('I waited for 2 seconds');
});

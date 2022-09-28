'use strict';

/*
EXAMPLES:

console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;
document.querySelector('.guess').value = 23;
*/

let numberLow = 1;
let numberHigh = 20;
let number = Math.trunc(Math.random() * numberHigh) + numberLow;

document.querySelector(
  '.between'
).textContent = `(Between ${numberLow} and ${numberHigh})`;

let score = 20;
let highscore = 0;

let wrongGuess = function (messageString) {
  if (score > 0) {
    document.querySelector('.message').textContent = messageString;
    score--;
    document.querySelector('.score').textContent = score;
  }
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // If not a number
  if (!guess) {
    document.querySelector('.message').textContent = '⛔️ No number';
  }

  // If player wins
  else if (guess === number) {
    document.querySelector('.number').textContent = number;
    document.querySelector('.message').textContent = '🎉 Correct Number!';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '100%';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }

  // If guess is too high
  else if (guess > number) {
    wrongGuess('📈 Number too high!');
  }

  // If guess is too low
  else {
    wrongGuess('📉 Number too low!');
  }

  if (score === 0) {
    document.querySelector('.message').textContent = '💥 You lost the game!';
  }
});

document.querySelector('.again').addEventListener('click', function () {
  number = Math.trunc(Math.random() * numberHigh) + numberLow;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = 20;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});

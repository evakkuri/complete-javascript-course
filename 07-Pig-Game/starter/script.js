'use strict';

// Element objects
const diceElement = document.querySelector('.dice');
const btnRollElement = document.querySelector('.btn--roll');
const btnHoldElement = document.querySelector('.btn--hold');
const btnNewElement = document.querySelector('.btn--new');

// Starting conditions
const rollMax = 6;
const rollMin = 1;

const players = [
  {
    playerElement: document.querySelector('.player--0'),
    scoreElement: document.querySelector('#score--0'),
    currentElement: document.getElementById('current--0'),
    score: 0,
  },
  {
    playerElement: document.querySelector('.player--1'),
    scoreElement: document.getElementById('score--1'),
    currentElement: document.getElementById('current--1'),
    score: 0,
  },
];

let currentScore = 0;
let activePlayer = 0;

// Event handlers
const switchActivePlayer = function () {
  currentScore = 0;
  players[activePlayer].currentElement.textContent = currentScore;
  let previousActivePlayer = activePlayer;
  activePlayer = activePlayer === 0 ? 1 : 0;
  players[previousActivePlayer].playerElement.classList.toggle(
    'player--active'
  );
  players[activePlayer].playerElement.classList.toggle('player--active');
};

const rollDice = function () {
  // 1. Generate result
  let result = Math.floor(Math.random() * (rollMax - rollMin + 1) + rollMin);

  // 2. Display dice
  diceElement.setAttribute('src', `dice-${result}.png`);
  if (diceElement.classList.contains('hidden'))
    diceElement.classList.remove('hidden');

  // 3. If result is 1, switch player and reset current, else add to current
  if (result !== 1) {
    currentScore += result;
    players[activePlayer].currentElement.textContent = currentScore;
  } else {
    switchActivePlayer();
  }
};

const holdScore = function () {
  let active = players[activePlayer];
  active.score += currentScore;
  active.scoreElement.textContent = active.score;
  switchActivePlayer();
};

const startNewGame = function () {
  players.forEach(function (player) {
    player.score = 0;
    player.scoreElement.textContent = 0;
    player.currentElement.textContent = 0;
    player.playerElement.classList.remove('player--active');
  });

  currentScore = 0;
  activePlayer = 0;
  diceElement.classList.add('hidden');
  players[0].playerElement.classList.add('player--active');
};

// Add event handlers to buttons
btnRollElement.addEventListener('click', rollDice);
btnHoldElement.addEventListener('click', holdScore);
btnNewElement.addEventListener('click', startNewGame);
startNewGame();

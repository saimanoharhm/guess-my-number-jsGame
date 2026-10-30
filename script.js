'use strict';
// INITIAL GAME VARIABLES
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
// FEATURE 1: GET SAVED HIGHSCORE FROM LOCAL STORAGE
let highScore = Number(localStorage.getItem('highScore')) || 0;
// GAME STATE
let gameOver = false;

// SELECTING HTML ELEMENTS
const messageEl = document.querySelector('.message');
const numberEl = document.querySelector('.number');
const scoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.highscore');
const guessEl = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');

// DISPLAY INITIAL HIGHSCORE
highScoreEl.textContent = highScore;

// DISPLAY MESSAGE FUNCTION
const displayMessage = function (message) {
  messageEl.textContent = message;
};

// CHECK GUESS FUNCTION
const checkGuess = function () {
  // Prevent playing after game ends
  if (gameOver) return;
  const guess = Number(guessEl.value);
  // WHEN THERE IS NO INPUT
  if (!guessEl.value.trim()) {
    displayMessage('⛔ No Number!');
    return;
  }
  // VALIDATE INPUT
  if (!Number.isInteger(guess) || guess < 1 || guess > 20) {
    displayMessage('⚠️ Enter a number between 1 and 20!');
    return;
  }
  // WHEN PLAYER WINS
  if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    numberEl.textContent = secretNumber;
    document.body.style.backgroundColor = '#60b347';
    numberEl.style.width = '30rem';
    gameOver = true;
    checkBtn.disabled = true;
    // UPDATE HIGHSCORE
    if (score > highScore) {
      highScore = score;
      highScoreEl.textContent = highScore;
      // SAVE HIGHSCORE IN LOCAL STORAGE
      localStorage.setItem('highScore', highScore);
    }
  }
  // WHEN GUESS IS WRONG
  else {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too High!' : '📉 Too Low!');
      score--;
      scoreEl.textContent = score;
    }
    // WHEN PLAYER LOSES
    else {
      displayMessage('💥 You lost the game!');
      score = 0;
      scoreEl.textContent = score;
      numberEl.textContent = secretNumber;
      gameOver = true;
      checkBtn.disabled = true;
    }
  }

  // else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📈 Too High!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = '💥You lost the game!';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
  // // When guess is too low
  // else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📉 Too Low!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = '💥You lost the game!';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
};

// CHECK BUTTON EVENT
checkBtn.addEventListener('click', checkGuess);

// FEATURE 2: ENTER KEY SUPPORT
guessEl.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    checkGuess();
  }
});

// AGAIN BUTTON EVENT
againBtn.addEventListener('click', function () {
  // RESET GAME VARIABLES
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  gameOver = false;
  // RESET HTML CONTENT
  displayMessage('Start guessing...');
  scoreEl.textContent = score;
  numberEl.textContent = '?';
  guessEl.value = '';
  guessEl.focus();
  // RESET STYLES
  document.body.style.backgroundColor = '#222';
  numberEl.style.width = '';
  checkBtn.disabled = false;
});

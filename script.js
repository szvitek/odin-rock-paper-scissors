// map to nicely format choices in the messages
const choices = {
  rock: 'Rock',
  paper: 'Paper',
  scissors: 'Scissors',
};

// get a random
function computerPlay() {
  const answers = Object.keys(choices);
  const index = Math.floor(Math.random() * answers.length);

  return answers[index];
}

let playerScore = 0;
let computerScore = 0;
const playerScoreSpan = document.querySelector('#player-score');
const computerScoreSpan = document.querySelector('#computer-score');
const images = document.querySelectorAll('img');
images.forEach((img) => {
  img.addEventListener('click', game);
});

// ask the player to input a choice
// if the choice is not valid ask again
function humanPlay() {
  let userInput;
  while (!Object.keys(choices).includes(userInput)) {
    userInput = (
      prompt('Type your anser: Rock / Paper / Scissors') || ''
    ).toLowerCase();
  }

  return userInput;
}

// compose a user friendly message
function composeMessage(condition, playerSelection, computerSelection) {
  if (condition === 'win') {
    return `You Win! ${choices[playerSelection]} beats ${choices[computerSelection]}`;
  } else if (condition === 'lose') {
    return `You Lose! ${choices[computerSelection]} beats ${choices[playerSelection]}`;
  } else {
    return `Tie! ${choices[playerSelection]} - ${choices[computerSelection]}`;
  }
}

// checks the round's winned and returns a formatted message
function playRound(playerSelection, computerSelection) {
  let result = 'draw';

  if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    result = 'win';
  } else if (
    (computerSelection === 'rock' && playerSelection === 'scissors') ||
    (computerSelection === 'paper' && playerSelection === 'rock') ||
    (computerSelection === 'scissors' && playerSelection === 'paper')
  ) {
    result = 'lose';
  }

  return composeMessage(result, playerSelection, computerSelection);
}

function updateScore(player) {
  if (player === 'player') {
    playerScoreSpan.textContent = playerScore;
  }

  if (player === 'computer') {
    computerScoreSpan.textContent = computerScore;
  }
}

function removeMessageAndButton() {
  const previousMessage = document.querySelector('#message');
  const reset = document.querySelector('#reset');
  if (previousMessage) {
    document.body.removeChild(previousMessage);
  }
  if (reset) {
    document.body.removeChild(reset);
  }
}

function displayMessage(result) {
  removeMessageAndButton();
  const el = document.createElement('h2');
  el.id = 'message';
  el.textContent = result;
  el.style.marginTop = '50px';
  document.body.appendChild(el);
}

function showResetButton() {
  const btn = document.createElement('button');
  btn.id = 'reset';
  btn.onclick = resetGame;
  btn.textContent = 'Play again?';
  document.body.appendChild(btn);
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  updateScore('player');
  updateScore('computer');
  removeMessageAndButton();
}

function game(e) {
  const playerSelection = e.target.id;
  const computerSelection = computerPlay();
  const result = playRound(playerSelection, computerSelection);

  if (result.includes('Win')) {
    playerScore++;
    updateScore('player');
  }
  if (result.includes('Lose')) {
    computerScore++;
    updateScore('computer');
  }
  displayMessage(result);
  if (playerScore === 5 || computerScore === 5) {
    let finalResult;
    if (playerScore > computerScore) {
      finalResult = `You Win`;
    } else if (playerScore < computerScore) {
      finalResult = 'You Lose';
    } else {
      finalResult = 'Tie';
    }

    const playAgain = confirm(
      `Game Over!, Results: ${playerScore} : ${computerScore} - ${finalResult}! Play again?`
    );

    playAgain ? resetGame() : showResetButton();
  }
}

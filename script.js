// map to nicely format choices in the console
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

// check the round's winned and returns a formatted message
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

function game() {
  let games = 0;
  let playerScore = 0;
  let computerScore = 0;
  while (games < 5) {
    games++;
    const playerSelection = humanPlay();
    const computerSelection = computerPlay();

    const result = playRound(playerSelection, computerSelection);
    if (result.includes('Win')) {
      playerScore++;
    }
    if (result.includes('Lose')) {
      computerScore++;
    }
    console.log(result);
  }

  let finalResult;
  if (playerScore > computerScore) {
    finalResult = `You Win`;
  } else if (playerScore < computerScore) {
    finalResult = 'You Lose';
  } else {
    finalResult = 'Tie';
  }

  console.log(
    `Game Over!, Results: ${playerScore} : ${computerScore} - ${finalResult}! Reload the page to play again`
  );
}

// start the game
game();

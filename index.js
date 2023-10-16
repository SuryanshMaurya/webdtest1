// Remove a CSS class from the document body
document.body.classList.remove("main_body");

// Select DOM elements using descriptive variable names
const rulesButton = document.querySelector(".button_rules");
const closeButton = document.querySelector(".button_close");
const rulesModal = document.querySelector(".rules");

// Define the available choices for the game
const GAME_CHOICES = [
  { name: "paper", beats: "rock" },
  { name: "scissors", beats: "paper" },
  { name: "rock", beats: "scissors" },
];

// Select choice buttons and other game elements
const choiceButtons = document.querySelectorAll(".picking_btn");
const gameContainer = document.querySelector(".picking");
const resultsContainer = document.querySelector(".result_page");
const resultContainers = document.querySelectorAll(".result_page__result");

const winnerContainer = document.querySelector(".result_page__winner");
const resultText1 = document.querySelector(".result_page__text1");
const resultText2 = document.querySelector(".result_page__text2");

const playAgainButton = document.querySelector(".play_again");
const replayButton = document.querySelector(".replay");

const scorePlayer = document.querySelector(".score1");
const scoreComputer = document.querySelector(".score2");

const nextButton = document.querySelector(".button_next");

// Initialize score variables and retrieve from local storage
let playerScore;
let computerScore;

if (localStorage.getItem("score1")) {
  playerScore = JSON.parse(localStorage.getItem("score1"));
  scorePlayer.innerText = playerScore;
} else {
  playerScore = 0;
  localStorage.setItem("score1", playerScore);
}

if (localStorage.getItem("score2")) {
  computerScore = JSON.parse(localStorage.getItem("score2"));
  scoreComputer.innerText = computerScore;
} else {
  computerScore = 0;
  localStorage.setItem("score2", computerScore);
}

// Add event listeners for choice buttons
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const userChoice = GAME_CHOICES.find((choice) => choice.name === choiceName);
    playRound(userChoice);
  });
});

// Function to play a round of the game
function playRound(userChoice) {
  const computerChoice = getComputerChoice();
  displayChoices([userChoice, computerChoice]);
  displayResult([userChoice, computerChoice]);
}

// Function to get a random computer choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * GAME_CHOICES.length);
  return GAME_CHOICES[randomIndex];
}

// Function to display the choices made by the player and computer
function displayChoices(choices) {
  resultContainers.forEach((resultContainer, idx) => {
    const choice = choices[idx];
    resultContainer.innerHTML = `
      <div class="choice ${choice.name} ${resultContainer.classList.contains('winner') ? 'winner' : ''}">
        <img src="${choice.name}.png" alt="${choice.name}" />
      </div>
    `;
  });

  gameContainer.classList.toggle("hidden");
  resultsContainer.classList.toggle("hidden");
}

// Function to display the result of the game
function displayResult(choices) {
  const playerWins = isWinner(choices);
  const computerWins = isWinner(choices.reverse());

  if (playerWins) {
    resultText1.innerText = "YOU WIN";
    resultText2.innerText = "AGAINST PC";
    resultContainers[0].classList.toggle("winner");
    updateScore(1, "player");
    nextButton.style.opacity = "1";
    playAgainButton.style.opacity = "1";
    replayButton.style.opacity = "0";
  } else if (computerWins) {
    resultText1.innerText = "YOU LOST";
    resultText2.innerText = "AGAINST PC";
    resultContainers[1].classList.toggle("winner");
    updateScore(1, "computer");
    playAgainButton.style.opacity = "1";
    replayButton.style.opacity = "0";
  } else {
    resultText1.innerText = "TIE UP";
    resultText2.innerText = "";
    playAgainButton.style.opacity = "0";
    replayButton.style.opacity = "1";
  }

  winnerContainer.classList.toggle("hidden");
  resultsContainer.classList.toggle("show-winner");
}

// Function to check if the player wins
function isWinner(choices) {
  return choices[0].beats === choices[1].name;
}

// Function to update the score and store it in local storage
function updateScore(points, player) {
  if (player === "player") {
    playerScore += points;
    localStorage.setItem("score1", playerScore);
    scorePlayer.innerText = playerScore;
  } else {
    computerScore += points;
    localStorage.setItem("score2", computerScore);
    scoreComputer.innerText = computerScore;
  }
}

// Event listener for the "Play Again" button
playAgainButton.addEventListener("click", () => {
  gameContainer.classList.toggle("hidden");
  resultsContainer.classList.toggle("hidden");
  nextButton.style.opacity = "0";

  resultContainers.forEach((resultContainer) => {
    resultContainer.innerHTML = "";
    resultContainer.classList.remove("winner");
  });

  resultText1.innerText = "";
  winnerContainer.classList.toggle("hidden");
  resultsContainer.classList.toggle("show-winner");
});

// Event listeners to show/hide the rules
rulesButton.addEventListener("click", () => {
  rulesModal.classList.toggle("show-rules");
});

closeButton.addEventListener("click", () => {
  rulesModal.classList.toggle("show-rules");
});

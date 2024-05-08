// Move icons
var playerMove = document.querySelector("#playerMove");
var computerMove = document.querySelector("#computerMove");

// Text
var result = document.querySelector(".result");
var roundDisplay = document.querySelector(".round");

// Scoreboard
const playerScoreboard = document.querySelector(".playerScore");
var playerScoreDisplay = playerScoreboard.querySelector(".score");
const computerScoreboard = document.querySelector(".computerScore");
var computerScoreDisplay = computerScoreboard.querySelector(".score");

// Buttons
const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");
const newGameButton = document.querySelector("#newGame");

// Moves
const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;
const MOVE_ICONS = ["icon-hand-grab-o", "icon-hand-paper-o", "icon-hand-scissors-o"];

// Game variables and constants
const TIE_MSG = ["It's a tie!"];
const WIN_MSG = ["Nice work!", "Keep it up!"];
const LOSE_MSG = ["So close!", "Try again!", "Nice try!"];

let playerScore = 0;
let computerScore = 0;
let playerChoice = ROCK;
let computerChoice = ROCK;
const MAX_ROUNDS = 5;
let round = 1;

// Event listeners
const handleRockClick = () => handleInput(ROCK);
const handlePaperClick = () => handleInput(PAPER);
const handleScissorsClick = () => handleInput(SCISSORS);

function enableListeners() {
    rockButton.addEventListener("click", handleRockClick);
    paperButton.addEventListener("click", handlePaperClick);
    scissorsButton.addEventListener("click", handleScissorsClick);
    newGameButton.addEventListener("click", resetGame);
    document.body.addEventListener("keypress", handleKeyPress);
}

function disableListeners() {
    rockButton.removeEventListener("click", handleRockClick);
    paperButton.removeEventListener("click", handlePaperClick);
    scissorsButton.removeEventListener("click", handleScissorsClick);
    document.body.removeEventListener("keypress", handleKeyPress);
}

function handleKeyPress(event) {
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "r") {
        handleInput(ROCK);
    } else if (keyPressed === "p") {
        handleInput(PAPER);
    } else if (keyPressed === "s") {
        handleInput(SCISSORS);
    };
};

function handleInput(choice) {
    playerMove.className = MOVE_ICONS[choice];
    playerChoice = choice;
    playRound();
};

function resetGame() {
    round = 1;
    playerScore = 0;
    computerScore = 0;
    result.textContent = "Can you beat a computer?";
    playerMove.className = MOVE_ICONS[ROCK];
    enableListeners();
    playGame();
};

function updateScore() { 
    computerScoreDisplay.textContent = computerScore; 
    playerScoreDisplay.textContent = playerScore;
};

function playRound() {
    // Update round
    roundDisplay.textContent = `ROUND ${round++}`;

    // Get choices
    computerChoice = Math.floor(Math.random() * MOVE_ICONS.length);
    computerMove.className = MOVE_ICONS[computerChoice];

    if (playerChoice === computerChoice) {
        result.textContent = TIE_MSG[Math.floor(Math.random() * TIE_MSG.length)];
    } else if ((playerChoice === ROCK && computerChoice === SCISSORS) ||
    (playerChoice === PAPER && computerChoice === ROCK) ||
    (playerChoice === SCISSORS && computerChoice === PAPER)) {
        result.textContent = LOSE_MSG[Math.floor(Math.random() * LOSE_MSG.length)];
        computerScore++;
    } else {
        result.textContent = WIN_MSG[Math.floor(Math.random() * WIN_MSG.length)];
        playerScore++;
    };

    if (round == MAX_ROUNDS + 2) {
        getWinner();
        return;
    };
    updateScore();
    
};

function getWinner() {
    disableListeners();
    roundDisplay.textContent = "GAME OVER";
    if (playerScore > computerScore) {
        result.textContent = ("You win!");
    } else if (playerScore < computerScore) {
        result.textContent = ("You lose!");
    } else {
        result.textContent = ("You tied!")
    };
    
};

function playGame() {
    roundDisplay.textContent = `ROUND ${round++}`;
    enableListeners();
    updateScore();
};

playGame();
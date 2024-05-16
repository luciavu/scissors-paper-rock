// Game variables and constants
const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;
const MOVE_ICONS = ["icon-hand-grab-o", "icon-hand-paper-o", "icon-hand-scissors-o"];
const TIE_MSG = ["It's a tie!"];
const WIN_MSG = ["Great job!", "You won again! Nice work!", "Another win! Keep it up!", "One more point!"];
const LOSE_MSG = ["You lose. So close!", "Unlucky :(", "Nice try!", "You can still make it!"];
const MAX_ROUNDS = 5;

// Defaults
playerChoice = ROCK;
computerChoice = ROCK;

// Event listeners
const handleRockClick = () => handleInput(ROCK);
const handlePaperClick = () => handleInput(PAPER);
const handleScissorsClick = () => handleInput(SCISSORS);

function enableListeners() {
    const rockButton = document.querySelector("#rock");
    const paperButton = document.querySelector("#paper");
    const scissorsButton = document.querySelector("#scissors");
    const newGameButton = document.querySelector("#newGame");

    rockButton.addEventListener("click", handleRockClick);
    paperButton.addEventListener("click", handlePaperClick);
    scissorsButton.addEventListener("click", handleScissorsClick);
    newGameButton.addEventListener("click", resetGame);
    document.body.addEventListener("keypress", handleKeyPress);
}

function disableListeners() {
    const rockButton = document.querySelector("#rock");
    const paperButton = document.querySelector("#paper");
    const scissorsButton = document.querySelector("#scissors");
    const newGameButton = document.querySelector("#newGame");

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
    var playerMove = document.querySelector("#playerMove");
    playerMove.className = MOVE_ICONS[choice];
    playerChoice = choice;
    playRound();
};

function resetGame() {
    var playerMove = document.querySelector("#playerMove");
    var result = document.querySelector(".result");
    round = 1;
    playerScore = 0;
    computerScore = 0;
    result.textContent = "Can you beat a computer?";
    playerMove.className = MOVE_ICONS[ROCK];
    enableListeners();
    playGame();
};

function updateScore() { 
    const playerScoreboard = document.querySelector(".playerScore");
    var playerScoreDisplay = playerScoreboard.querySelector(".score");
    const computerScoreboard = document.querySelector(".computerScore");
    var computerScoreDisplay = computerScoreboard.querySelector(".score");

    computerScoreDisplay.textContent = computerScore; 
    playerScoreDisplay.textContent = playerScore;
};

function playRound() {
    var result = document.querySelector(".result");
    var computerMove = document.querySelector("#computerMove");
    var roundDisplay = document.querySelector(".round");

    // Update round
    roundDisplay.textContent = `ROUND ${round++}`;

    // Get choices
    computerChoice = Math.floor(Math.random() * MOVE_ICONS.length);
    computerMove.className = MOVE_ICONS[computerChoice];

    if (playerChoice === computerChoice) {
        result.textContent = TIE_MSG[0];
    } else if ((playerChoice === ROCK && computerChoice === SCISSORS) ||
    (playerChoice === PAPER && computerChoice === ROCK) ||
    (playerChoice === SCISSORS && computerChoice === PAPER)) {
        result.textContent = WIN_MSG[playerScore];
        playerScore++;
    } else {
        result.textContent = LOSE_MSG[computerScore];
        computerScore++;
    };

    updateScore();
    
    if (playerScore === 5 || computerScore === 5) {
        getWinner();
        return;
    };
    
};

function getWinner() {
    var result = document.querySelector(".result");
    var roundDisplay = document.querySelector(".round");

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
    var roundDisplay = document.querySelector(".round");
    roundDisplay.textContent = `ROUND ${round++}`;
    enableListeners();
    updateScore();
};

resetGame();
playGame();
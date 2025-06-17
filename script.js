let score = 0;
let moleCount = 0;
let gameRunning = false;

const GAME_DURATION = 15000;
const MIN_PEEP_TIME = 500;
const MAX_PEEP_TIME = 1000;


// DOM SELECT ELEMENTS
const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const moleCountDisplay = document.getElementById('moleCount');
const startButton = document.getElementById('startButton');

// Initialize game board
function initializeGame() {
  holes.forEach((hole) => {
    const mole = document.createElement('div');
    mole.className = 'mole';
    hole.appendChild(mole);
    hole.addEventListener('click', whack);
  });
}

// Make a mole appear
function showMole() {
  if (!gameRunning) return;

  const peepDuration = getRandomTime(MIN_PEEP_TIME, MAX_PEEP_TIME);
  const hole = getRandomHole(holes);

  hole.classList.add('up');
  moleCount++;
  moleCountDisplay.textContent = moleCount;

  setTimeout(() => {
    hole.classList.remove('up');
    if (gameRunning) showMole();
  }, peepDuration);
}

// Handle whacking a mole
function whack(e, hole = null) {
  if (!e.isTrusted) return; // Prevent fake events

  const targetHole = hole || e.currentTarget;
  if (!targetHole.classList.contains('up')) return;

  score++;
  targetHole.classList.remove('up');
  scoreDisplay.textContent = score;
}

// Start the game
function startGame() {
  score = 0;
  moleCount = 0;
  gameRunning = true;

  scoreDisplay.textContent = score;
  moleCountDisplay.textContent = moleCount;
  startButton.disabled = true;

  showMole();

  setTimeout(() => {
    gameRunning = false;
    startButton.disabled = false;
  }, GAME_DURATION);
}

// Keyboard support for whacking moles
function handleKeyPress(e) {
  const keyNumber = parseInt(e.key);
  if (keyNumber >= 1 && keyNumber <= 9) {
    const hole = holes[keyNumber - 1];
    whack(e, hole);
  }
}

// Event listeners
startButton.addEventListener('click', startGame);
document.addEventListener('keydown', handleKeyPress);

// Initialize the game when loaded
initializeGame();
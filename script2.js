const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
  [0, 4, 8], [2, 4, 6]              // Diagonals
];

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = cell.getAttribute('data-index');

  if (board[cellIndex] !== '' || !gameActive) return;

  board[cellIndex] = currentPlayer;
  cell.innerText = currentPlayer;
  
  checkResult();
  switchPlayer();
}

function checkResult() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.innerText = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (!board.includes('')) {
    statusText.innerText = 'It\'s a Draw!';
    gameActive = false;
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (gameActive) {
    statusText.innerText = `Player ${currentPlayer}'s turn`;
  }
}

function restartGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusText.innerText = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.innerText = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

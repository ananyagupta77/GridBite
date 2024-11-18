const gameBoard = document.getElementById('gameBoard');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const friendMode = document.getElementById('friendMode');
const computerMode = document.getElementById('computerMode');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = false;
let againstComputer = false;

// Initialize Game
function initializeGame() {
    gameBoard.innerHTML = '';
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    resetButton.classList.remove('hidden');

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
}

// Handle Cell Click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        statusText.textContent = `It's a tie!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;

    if (againstComputer && currentPlayer === 'O') {
        computerMove();
    }
}

// Computer Move
function computerMove() {
    const emptyCells = board.map((cell, index) => (cell ? null : index)).filter(index => index !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = currentPlayer;

    const cell = gameBoard.children[randomIndex];
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        statusText.textContent = `It's a tie!`;
        gameActive = false;
        return;
    }

    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Check Win
function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === currentPlayer)
    );
}

// Reset Game
resetButton.addEventListener('click', () => {
    initializeGame();
});

// Modes
friendMode.addEventListener('click', () => {
    againstComputer = false;
    initializeGame();
});

computerMode.addEventListener('click', () => {
    againstComputer = true;
    initializeGame();
});

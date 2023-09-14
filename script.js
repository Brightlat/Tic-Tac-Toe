let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let playerXScore = 0;
let playerOScore = 0;
let drawScore = 0;

function makeMove(row, col) {
    if (!gameActive || gameBoard[row * 3 + col] !== '') return;

    gameBoard[row * 3 + col] = currentPlayer;
    document.getElementById('board').children[row * 3 + col].innerText = currentPlayer;

    if (checkWin()) {
        document.getElementById('status').innerText = `${currentPlayer} wins!`;
        updateScore(currentPlayer);
        gameActive = false;
    } else if (gameBoard.indexOf('') === -1) {
        document.getElementById('status').innerText = "It's a draw!";
        drawScore++;
        document.getElementById('drawScore').innerText = drawScore;
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
    }
}


function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function updateScore(player) {
    if (player === 'X') {
        playerXScore++;
        document.getElementById('playerXScore').innerText = playerXScore;
    } else {
        playerOScore++;
        document.getElementById('playerOScore').innerText = playerOScore;
    }
}

document.getElementById('newGameBtn').addEventListener('click', () => {
    // Reset the game state
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
    resetBoard();
});

function resetBoard() {
    // Clear the board cells
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerText = '';
    });
}

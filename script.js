const Gameboard = (() => {
  const board = Array(9).fill(null);

  const setCell = (index, marker) => {
    if (!board[index]) {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const getBoard = () => board;

  const resetBoard = () => board.fill(null);

  return { setCell, getBoard, resetBoard };
})();

const Player = (name, marker) => {
  return { name, marker };
};

const GameController = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameOver = false;

  const switchPlayer = () => {
    currentPlayerIndex = 1 - currentPlayerIndex;
    return players[currentPlayerIndex];
  };

  const handleClick = (index) => {
    if (gameOver || !Gameboard.setCell(index, players[currentPlayerIndex].marker)) {
      return;
    }

    DisplayController.renderBoard();

    if (checkWinner(players[currentPlayerIndex].marker)) {
      gameOver = true;
      DisplayController.setMessage(`${players[currentPlayerIndex].name} wins!`);
    } else if (isTie()) {
      gameOver = true;
      DisplayController.setMessage(`It's a tie!`);
    } else {
      const nextPlayer = switchPlayer();
      DisplayController.setMessage(`${nextPlayer.name}'s turn (${nextPlayer.marker})`);
    }
  };

  const checkWinner = (marker) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    return winningCombinations.some(combination =>
      combination.every(index => Gameboard.getBoard()[index] === marker)
    );
  };

  const isTie = () => {
    return Gameboard.getBoard().every(cell => cell !== null);
  };

  const startGame = (player1name, player2name) => {
    players = [Player(player1name, "X"), Player(player2name, "O")];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.resetBoard();
    DisplayController.renderBoard();
    DisplayController.setMessage(`${players[0].name}'s turn (X)`);
  };

  return { startGame, handleClick };
})();

const DisplayController = (() => {
  const gameBoardElement = document.getElementById('gameBoard');
  const messageElement = document.getElementById('message');

  const renderBoard = () => {
    gameBoardElement.innerHTML = '';

    Gameboard.getBoard().forEach((cell, index) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add("cell");
      if (cell) {
        cellElement.textContent = cell;
        cellElement.classList.add("taken")
      }
      cellElement.addEventListener('click', () => GameController.handleClick(index));
      gameBoardElement.appendChild(cellElement);
    })
  }

  const setMessage = (message) => {
    messageElement.textContent = message;
  };
  return { renderBoard, setMessage };
})();


document.getElementById('startGame').addEventListener('click', () => {
  const player1Name = document.getElementById('player1').value || 'Player 1';
  const player2Name = document.getElementById('player2').value || 'Player 2';
  GameController.startGame(player1Name, player2Name);
});

document.getElementById('restartGame').addEventListener('click', () => {
  // window.location.reload()
  Gameboard.resetBoard();
  DisplayController.renderBoard()
  //
});

document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const results = document.querySelector(".results");
  const restartBtn = document.querySelector(".restart");
  let currentPlayer = "X";
  let gameActive = true;
  let gameState = ["", "", "", "", "", "", "", "", ""];

  // Выигрышные комбинации
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Горизонтальные
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Вертикальные
    [0, 4, 8],
    [2, 4, 6], // Диагональные
  ];

  // Обработчик клика по клетке
  function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== "" || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    checkResult();
    togglePlayer();
  }

  // Проверка на победу или ничью
  function checkResult() {
    let roundWon = false;

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      results.textContent = `Player "${currentPlayer}" wins!`;
      gameActive = false;
      return;
    }

    if (!gameState.includes("")) {
      results.textContent = "Its a tie!";
      gameActive = false;
    }
  }

  // Смена игрока
  function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  // Перезапуск игры
  function handleRestart() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    results.textContent = "";
    cells.forEach((cell) => (cell.textContent = ""));
  }

  // Добавление обработчиков событий
  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  restartBtn.addEventListener("click", handleRestart);
});

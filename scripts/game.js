class Game {
  static renderBoard() {
    const boardContainer = document.createElement("div");
    boardContainer.id = "board-container";

    const label = document.createElement("h2");
    label.className = "section-label";
    label.innerText = "PICK A SQUARE";

    const squaresGrid = document.createElement("div");
    squaresGrid.id = "squares-grid";

    const GameSquares = 25;

    for (let i = 0; i < GameSquares; i++) {
      let square = document.createElement("div");
      square.classList.add("square", "animate__animated", "animate__bounceIn");
      setTimeout(() => square.classList.remove("animate__bounceIn"), 300);

      i % 2 == 0
        ? square.classList.add("sq-black")
        : square.classList.add("sq-red");
      squaresGrid.appendChild(square);
    }

    boardContainer.append(label, squaresGrid);
    APP.container.append(boardContainer);
  }
}

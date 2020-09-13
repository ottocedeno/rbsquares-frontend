class Game {
  static renderBoard() {
    const boardContainer = document.createElement("div");
    boardContainer.id = "board-container";

    const boardLabel = this.createSectionLabel("PICK A SQUARE");

    const squaresGrid = document.createElement("div");
    squaresGrid.id = "squares-grid";

    const GameSquares = 30;

    for (let i = 0; i < GameSquares; i++) {
      let square = document.createElement("div");
      square.classList.add("square", "animate__animated", "animate__bounceIn");
      square.dataset.number = i + 1;
      square.dataset.userSelection = false;
      setTimeout(() => square.classList.remove("animate__bounceIn"), 300);

      i % 2 == 0
        ? square.classList.add("sq-black")
        : square.classList.add("sq-red");

      square.addEventListener("click", (e) => {
        e.preventDefault();

        let allSquares = Array.from(document.getElementsByClassName("square"));
        let currentUserSquare = allSquares.find(
          (sq) => sq.dataset.userSelection == "true"
        );

        if (!!currentUserSquare) {
          currentUserSquare.dataset.userSelection = false;
        }

        e.target.dataset.userSelection = true;
      });
      squaresGrid.appendChild(square);
    }

    boardContainer.append(boardLabel, squaresGrid);
    APP.container.append(boardContainer);
  }

  static renderBetting() {
    const betContainer = document.createElement("div");
    betContainer.id = "bet-container";
    betContainer.classList.add("animate__animated", "animate__fadeInUp");

    const betLabel = this.createSectionLabel("MAKE A BET");

    const betSelectors = document.createElement("div");
    betSelectors.id = "bet-selectors";

    const betAmounts = [10, 25, 50, 100];

    for (let i = 0; i < betAmounts.length; i++) {
      let betButton = document.createElement("div");
      betButton.className = "btn-bet";
      betButton.innerText = betAmounts[i];

      betSelectors.appendChild(betButton);
    }

    const spinButton = document.createElement("button");
    spinButton.className = "btn-primary";
    spinButton.setAttribute("disabled", true);
    spinButton.innerText = "SPIN";

    betContainer.append(betLabel, betSelectors, spinButton);
    APP.container.append(betContainer);
  }

  static createSectionLabel(labelText) {
    const label = document.createElement("h2");
    label.className = "section-label";
    label.innerText = labelText;
    return label;
  }
}

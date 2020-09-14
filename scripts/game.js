class Game {
  constructor(userSquareNumber, userColor, userBet) {
    this.userSquareNumber = userSquareNumber;
    this.userColor = userColor;
    this.userBet = userBet;
  }

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

      if (i % 2 == 0) {
        square.classList.add("sq-black");
        square.dataset.color = "black";
      } else {
        square.classList.add("sq-red");
        square.dataset.color = "red";
      }

      square.addEventListener("click", (e) => {
        e.preventDefault();

        if (!!this.userSquare()) {
          this.userSquare().dataset.userSelection = false;
        }

        e.target.dataset.userSelection = true;
        this.enableSpin();
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

      betButton.dataset.userBet = false;
      betButton.dataset.betAmount = betAmounts[i];

      betButton.addEventListener("click", (e) => {
        e.preventDefault();

        if (!!this.userBet()) {
          this.userBet().dataset.userBet = false;
        }

        e.target.dataset.userBet = true;
        this.enableSpin();
      });
      betSelectors.appendChild(betButton);
    }

    const spinButton = document.createElement("button");
    spinButton.className = "btn-primary";
    spinButton.setAttribute("disabled", true);
    spinButton.innerText = "SPIN";

    betContainer.append(betLabel, betSelectors, spinButton);
    APP.container.append(betContainer);
  }

  static enableSpin() {
    if (!!this.userSquare() && !!this.userBet()) {
      if (this.spinButton().hasAttribute("disabled")) {
        this.spinButton().attributes.removeNamedItem("disabled");
        this.spinButton().addEventListener("click", (e) => {
          e.preventDefault();
          this.spin();
        });
      }
    }
  }

  static userSquare() {
    return Array.from(document.getElementsByClassName("square")).find(
      (square) => square.dataset.userSelection == "true"
    );
  }

  static userSquareNumber() {
    return this.userSquare().dataset.number;
  }
  static userSquareColor() {
    return this.userSquare().dataset.color;
  }

  static userBet() {
    return Array.from(document.getElementsByClassName("btn-bet")).find(
      (btn) => btn.dataset.userBet == "true"
    );
  }

  static userBetAmount() {
    return this.userBet().dataset.betAmount;
  }

  static spinButton() {
    return document.querySelector("div#bet-container button");
  }

  static spin() {
    const newGame = new Game(
      this.userSquareNumber(),
      this.userSquareColor(),
      this.userBetAmount()
    );
    console.log(newGame);
  }

  static createSectionLabel(labelText) {
    const label = document.createElement("h2");
    label.className = "section-label";
    label.innerText = labelText;
    return label;
  }
}

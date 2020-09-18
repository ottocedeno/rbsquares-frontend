class GameLayout {
  static renderLayout() {
    APP.clearDOM();
    APP.container.classList.remove("flex-center");

    Nav.renderNav();
    this.renderBoard();
    this.renderBetting();
  }

  static renderBoard() {
    const boardContainer = document.createElement("div");
    boardContainer.id = "board-container";

    const boardLabel = Utility.createSectionLabel("PICK A SQUARE");

    const squaresGrid = document.createElement("div");
    squaresGrid.id = "squares-grid";

    for (let i = 0; i < 30; i++) {
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

    const betLabel = Utility.createSectionLabel("MAKE A BET");

    const betSelectors = document.createElement("div");
    betSelectors.id = "bet-selectors";

    const betAmounts = [10, 25, 50, 100];

    for (let i = 0; i < betAmounts.length; i++) {
      let betBtn = document.createElement("div");
      betBtn.className = "btn-bet";
      betBtn.innerText = betAmounts[i];

      betBtn.dataset.userBet = false;
      betBtn.dataset.betAmount = betAmounts[i];

      betBtn.addEventListener("click", (e) => {
        e.preventDefault();

        if (!!this.userBet()) {
          this.userBet().dataset.userBet = false;
        }

        e.target.dataset.userBet = true;
        this.enableSpin();
      });
      betSelectors.appendChild(betBtn);
    }

    const spinButton = document.createElement("button");
    spinButton.className = "btn-primary";
    spinButton.setAttribute("disabled", true);
    spinButton.innerText = "SPIN";

    betContainer.append(betLabel, betSelectors, spinButton);
    APP.container.append(betContainer);
  }

  static userSquare() {
    return this.allSquares().find(
      (square) => square.dataset.userSelection == "true"
    );
  }

  static userBet() {
    return Array.from(document.getElementsByClassName("btn-bet")).find(
      (btn) => btn.dataset.userBet == "true"
    );
  }

  static allSquares() {
    return Array.from(document.getElementsByClassName("square"));
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

  static spinButton() {
    return document.querySelector("div#bet-container button");
  }
}

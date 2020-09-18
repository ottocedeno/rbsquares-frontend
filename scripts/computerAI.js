class ComputerAI {
  constructor() {
    this.winningNumber = this.GenerateWinningNumber();
    this.winningSquare = this.findWinningSquare();
  }
  GenerateWinningNumber() {
    return Math.ceil(Math.random() * 30);
  }

  findWinningSquare() {
    const allSquares = Game.allSquares();
    const winningSquare = allSquares.find(
      (square) => parseInt(square.dataset.number) == this.winningNumber
    );
    return winningSquare;
  }

  matchingSquare(gameTurn) {
    return (
      parseInt(this.winningSquare.dataset.number) == gameTurn.userSquareNumber
    );
  }

  matchingColor(gameTurn) {
    return this.winningSquare.dataset.color == gameTurn.userColor;
  }

  renderWinningSquare() {
    this.winningSquare.classList.add("winning-square", "animate__tada");
  }

  payoutTotal(gameTurn) {
    let payout = 0;
    if (this.matchingColor(gameTurn)) {
      payout += gameTurn.userBet;
    }
    if (this.matchingSquare(gameTurn)) {
      payout += gameTurn.userBet * 30;
    }
    return payout;
  }

  sendGameToServer() {
    fetch("http://localhost:3000/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt_token")}`,
      },
      body: JSON.stringify({
        game: {
          bet_amount: 50,
          matching_square: false,
          matching_color: true,
          payout: 50,
        },
      }),
    })
      .then((r) => r.json())
      .then((obj) => {
        console.log(obj);
      });
  }
}

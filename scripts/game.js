class Game {
  constructor() {
    this.userSquareNumber = this.findUserSquareNumber();
    this.userColor = this.findUserSquareColor();
    this.userBet = this.findUserBetAmount();
    this.winningSquareNumber = ComputerAI.generateWinningNumber();
    this.winningSquare = this.findWinningSquare();
    this.winningColor = this.findWinningColor();
    this.payout = this.calculatePayout();
  }

  static createGame() {
    const game = new Game();
    GameLayout.renderWinningSquare(game.winningSquare);
    game.saveGameToServer();
  }

  findUserSquareNumber() {
    return parseInt(GameLayout.userSquare().dataset.number);
  }

  findUserSquareColor() {
    return GameLayout.userSquare().dataset.color;
  }

  findUserBetAmount() {
    return parseInt(GameLayout.userBet().dataset.betAmount);
  }

  findWinningSquare() {
    return GameLayout.allSquares().find(
      (square) => parseInt(square.dataset.number) == this.winningSquareNumber
    );
  }

  findWinningColor() {
    return this.winningSquare.dataset.color;
  }

  matchingSquare() {
    return this.winningSquareNumber == this.userSquareNumber;
  }

  matchingColor() {
    return this.winningColor == this.userColor;
  }

  calculatePayout() {
    let payout = 0;
    if (this.matchingColor()) {
      payout += this.userBet;
    }
    if (this.matchingSquare()) {
      payout += this.userBet * 30;
    }
    return payout;
  }

  saveGameToServer() {
    fetch("http://localhost:3000/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt_token")}`,
      },
      body: JSON.stringify({
        game: {
          bet_amount: this.userBet,
          matching_square: this.matchingSquare(),
          matching_color: this.matchingColor(),
          payout: this.calculatePayout(),
        },
      }),
    })
      .then((resp) => resp.json())
      .then((userObj) => {
        if (userObj.user) {
          GameLayout.updateUserBalance(userObj.user.data.attributes.balance);
          setTimeout(() => {
            GameLayout.renderResultCard(this);
          }, 1100);
        }
      });
  }
}

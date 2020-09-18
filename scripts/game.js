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

  static spin() {
    const game = new Game();
    console.log(game);
    debugger;
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
}

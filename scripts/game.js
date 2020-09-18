class Game {
  constructor() {
    this.userSquareNumber = this.userSquareNumber();
    this.userColor = this.userSquareColor();
    this.userBet = this.userBetAmount();
    this.winningSquareNumber = ComputerAI.generateWinningNumber();
    this.winningSquare = this.findWinningSquare();
    this.winningColor = this.winningColor();
  }

  userSquareNumber() {
    return parseInt(GameLayout.userSquare().dataset.number);
  }

  userSquareColor() {
    return GameLayout.userSquare().dataset.color;
  }

  userBetAmount() {
    return parseInt(GameLayout.userBet().dataset.betAmount);
  }

  findWinningSquare() {
    return GameLayout.allSquares().find(
      (square) => parseInt(square.dataset.number) == this.winningSquareNumber
    );
  }

  winningColor() {
    return this.winningSquare.dataset.color;
  }

  static spin() {
    const game = new Game();
    console.log(game);
  }
}

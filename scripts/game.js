class Game {
  constructor(userSquareNumber, userColor, userBet) {
    this.userSquareNumber = userSquareNumber;
    this.userColor = userColor;
    this.userBet = userBet;
  }

  static userSquareNumber() {
    return parseInt(this.userSquare().dataset.number);
  }
  static userSquareColor() {
    return this.userSquare().dataset.color;
  }

  static userBetAmount() {
    return parseInt(this.userBet().dataset.betAmount);
  }

  static spin() {
    const gameTurn = new Game(
      this.userSquareNumber(),
      this.userSquareColor(),
      this.userBetAmount()
    );
    const AI = new ComputerAI();

    AI.renderWinningSquare();
    AI.sendGameToServer();
  }
}

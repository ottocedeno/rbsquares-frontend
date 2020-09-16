class ComputerAI {
  constructor() {
    this.winningNumber = this.GenerateWinningNumber();
    this.squareIndexes = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
    ];
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
      parseInt(this.findWinningSquare().dataset.number) ==
      gameTurn.userSquareNumber
    );
  }

  matchingColor(gameTurn) {
    return this.findWinningSquare().dataset.color == gameTurn.userColor;
  }
}

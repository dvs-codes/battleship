import Ship from './ship';

class Gameboard {
  constructor() {
    this.board = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];
    this.shipCounter = 5;
    this.shipPosition = 'horizontal';
  }

  shipPositionToggler() {
    if (this.shipPosition === 'horizontal') {
      this.shipPosition = 'vertical';
    } else {
      this.shipPosition = 'horizontal';
    }
  }

  placeShip(verticalIndex, horizontalIndex) {
    // for horizontal placement
    if (this.shipPosition === 'horizontal') {
      const newShip = this.shipMaker();
      // checking for out of bound ship placement
      if (horizontalIndex + newShip.length < 10) {
        this.shipCounter -= 1;
        for (let i = 0; i < newShip.length; i += 1) {
          this.board[verticalIndex][horizontalIndex + i] = newShip;
        }
      }
    } else {
      const newShip = this.shipMaker();
      // checking for out of bound ship placement
      if (verticalIndex + newShip.length < 10) {
        this.shipCounter -= 1;
        for (let i = 0; i < newShip.length; i += 1) {
          this.board[verticalIndex + i][horizontalIndex] = newShip;
        }
      }
    }
  }

  shipPlacer() {
    if (horizontalIndex + newShip.length < 10) {
      this.shipCounter -= 1;
      for (let i = 0; i < newShip.length; i += 1) {
        this.board[verticalIndex][horizontalIndex + i] = newShip.length;
      }
    }
  }

  shipMaker() {
    let ship;
    switch (this.shipCounter) {
      case 5:
        ship = new Ship(5);
        break;
      case 4:
        ship = new Ship(4);
        break;
      case 3 || 2:
        ship = new Ship(3);
        break;
      case 1:
        ship = new Ship(2);
        break;
      // no default
    }
    return ship;
  }

  receiveAttack(verticalIndex, horizontalIndex) {
    // attack on undiscovered only, 1 means already discovered cell
    let cordinates = this.board[verticalIndex][horizontalIndex];
    if (cordinates !== 1) {
      cordinates.length -= 1;
      cordinates = 1;
    }
  }
}

export default Gameboard;

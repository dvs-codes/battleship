import Ship from './ship';

class Gameboard {
  constructor() {
    // here null is undiscoverd cell
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
    this.ships = [];
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
        // checkin for empy cells
        let isEmpty = true;
        for (let i = 0; i < newShip.length; i += 1) {
          if (this.board[verticalIndex][horizontalIndex + i] != null) {
            isEmpty = false;
            break;
          }
        }
        if (isEmpty) {
          for (let i = 0; i < newShip.length; i += 1) {
            this.board[verticalIndex][horizontalIndex + i] = newShip;
          }
          this.ships.push(newShip);
        } else {
          return 'occupied cell';
        }
      }
      return 'out of bound';
    }

    const newShip = this.shipMaker();
    // checking for out of bound ship placement
    if (verticalIndex + newShip.length < 10) {
      // checking for empty cells
      let isEmpty = true;
      for (let i = 0; i < newShip.length; i += 1) {
        if (this.board[verticalIndex + i][horizontalIndex] != null) {
          isEmpty = false;
          break;
        }
      }
      if (isEmpty) {
        for (let i = 0; i < newShip.length; i += 1) {
          this.board[verticalIndex + i][horizontalIndex] = newShip;
        }
        this.ships.push(newShip);
      } else {
        return 'occupied cell';
      }
    }
    return 'out of bound';
  }

  shipMaker() {
    let ship;
    switch (this.ships.length) {
      case 0:
        ship = new Ship(5);
        break;
      case 1:
        ship = new Ship(4);
        break;
      case 2 || 3:
        ship = new Ship(3);
        break;
      case 4:
        ship = new Ship(2);
        break;
      // no default
    }
    return ship;
  }

  receiveAttack(verticalIndex, horizontalIndex) {
    // attack on undiscovered only, 1 means already discovered cell
    const currentShip = this.board[verticalIndex][horizontalIndex];
    if (currentShip !== 1) {
      currentShip.length -= 1;
      this.board[verticalIndex][horizontalIndex] = 1;
    }
    if (currentShip.length === 0) {
      currentShip.sinkStatus = true;
    }
    if (this.ships.every((ship) => ship.sinkStatus === true)) {
      return 'gameover';
    }
    return undefined;
  }
}

export default Gameboard;

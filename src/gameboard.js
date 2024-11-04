import Ship from './ship';

class Gameboard {
  constructor() {
    // here null is undiscoverd cell
    // a 5,5,5,5,5 series of cell indicates a horizontally placed ship with 5 length
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.ships = [this.shipMaker(5), this.shipMaker(4), this.shipMaker(3), this.shipMaker(3), this.shipMaker(2)];
    this.currentShipIndex = 0;
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
    //only place ship if cell is 0
    
    let currentShipLength = this.ships[this.currentShipIndex].length
    //variable must be true for entering the placement loop
    let isCellValid = false
    for (let i=0; i<currentShipLength; i++) {
      //conditional for horizontal
      if (this.shipPosition==='horizontal') {
        if (horizontalIndex+i<10 && this.board[verticalIndex][horizontalIndex+i] ===0) {
          isCellValid = true         
      } else {
        isCellValid = false
        break
      }
     } else {
      //conditional for vertical
        if (verticalIndex+i<10 && this.board[verticalIndex+i][horizontalIndex]===0) {
          isCellValid = true
        } else {
          isCellValid = false
          break
        }
      }
    }
    
    if (isCellValid) {
      for (let i=0; i<currentShipLength; i++) {
        //for horizontal
        if (this.shipPosition==='horizontal') {
          this.board[verticalIndex].splice(horizontalIndex+i,1,currentShipLength)
        } else {
          this.board[verticalIndex+i].splice(horizontalIndex,1,currentShipLength)
        }
      }
      this.currentShipIndex++
    } 
  }



  shipMaker(length) {
    let ship = new Ship(length);
    return ship
  }

  receiveAttack(verticalIndex, horizontalIndex) {
    //if the target cordinate is empty, mark it as '1' so that it is recognised as discovered cell
    if (this.board[verticalIndex][horizontalIndex]===0) {
      this.board[verticalIndex].splice(horizontalIndex,1,1)
    } else {
      //before changing the cell take the info and store the hit on that specific ship
      
      let indexOfShip = 5 - this.board[verticalIndex][horizontalIndex]
      this.ships[indexOfShip].hit()
      //change the target cordinate to 'x' so that it is marked as a damaged ship, 
      this.board[verticalIndex].splice(horizontalIndex,1,'x')
      if (this.ships[indexOfShip].isSunk()) {
        return 'ship sunk'
      }
    }
  }
}

export default Gameboard;

import Gameboard from './gameboard';

class Player {
  constructor() {
    this.gameboard = new Gameboard();
    this.winStatus = false;
    this.isComputer = false
  }
}

export default Player;

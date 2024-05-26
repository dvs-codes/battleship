class Ship {
  // a ship shall have lenght and a sink status
  constructor(length, sinkStatus = false) {
    this.length = length;
    this.sinkStatus = sinkStatus;
  }

  // if length becomes zero it shall return true
  isSunk() {
    return this.length === 0;
  }

  // every hit reduces the length by 1
  hit() {
    this.length -= 1;
    if (this.isSunk()) {
      this.sinkStatus = true;
    }
  }
}

export default Ship;

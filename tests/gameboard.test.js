import Gameboard from '../src/gameboard';

describe('testing the placeShip method ', () => {
  let gameboard1;

  // before each test we run this
  beforeEach(() => {
    gameboard1 = new Gameboard();
  });

  // skip attack on discovered cell
  test('place the ship in valid cells', () => {
    // first ship to have a 5 length
    gameboard1.placeShip(2, 2);
    expect(gameboard1.board[2][2]).toBe(5);
    expect(gameboard1.board[2][3]).toBe(5);
    expect(gameboard1.board[2][4]).toBe(5);
    expect(gameboard1.board[2][5]).toBe(5);
    expect(gameboard1.board[2][6]).toBe(5);
    expect(gameboard1.shipCounter).toBe(4);
    console.log(gameboard1.board);
  });

  //
});

describe('testing the receiveAttack method for discovered attack', () => {
  let gameboard1;

  // before each test we run this
  beforeEach(() => {
    gameboard1 = new Gameboard();
    gameboard1.receiveAttack(3, 9);
  });

  // skip attack on discovered cell
  test('check attack on discovered cell', () => {
    gameboard1.receiveAttack(3, 9);
    expect(gameboard1.board[3][9]).toBe(1);
  });

  //
});

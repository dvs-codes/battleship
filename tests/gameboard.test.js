import Gameboard from '../src/gameboard';

describe('testing the gameBoard class', () => {
  let gameboard1;

  // before all test we create gameboard object
  beforeAll(() => {
    gameboard1 = new Gameboard();
  });

  test('place the 5 length ship in valid cells', () => {
    // first ship to have a 5 length
    gameboard1.placeShip(2, 2);
    expect(gameboard1.shipPosition).toBe('horizontal');
    expect(gameboard1.shipCounter).toBe(4);
    expect(gameboard1.board[2][2].length).toBe(5);
    expect(gameboard1.board[2][3].length).toBe(5);
    expect(gameboard1.board[2][4].length).toBe(5);
    expect(gameboard1.board[2][5].length).toBe(5);
    expect(gameboard1.board[2][6].length).toBe(5);
  });

  test('place the 4 length ship in valid cells but in vertical position', () => {
    // second ship will have 4 length
    gameboard1.shipPositionToggler();
    expect(gameboard1.shipPosition).toBe('vertical');
    gameboard1.placeShip(3, 3);
    expect(gameboard1.board[3][3].length).toBe(4);
    expect(gameboard1.board[4][3].length).toBe(4);
    expect(gameboard1.board[5][3].length).toBe(4);
    expect(gameboard1.board[6][3].length).toBe(4);
  });

  test('testing receiveAttack method on ship place', () => {
    // attacking the first position
    gameboard1.receiveAttack(2, 2);
    expect(gameboard1.board[2][2].length).toBe(4);
  });
});

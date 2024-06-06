import Gameboard from '../src/gameboard';

describe('testing the gameBoard class', () => {
  let gameboard1;

  // before all test we create gameboard object
  beforeAll(() => {
    gameboard1 = new Gameboard();
  });

  test('checking for placing ship out of bound', () => {
    // first ship to have a 5 length
    expect(gameboard1.placeShip(8, 8)).toBe('out of bound');
  });

  test('place the 5 length ship', () => {
    // first ship will have 5 length
    gameboard1.placeShip(3, 3);
    expect(gameboard1.board[3][3].length).toBe(5);
    expect(gameboard1.board[3][4].length).toBe(5);
    expect(gameboard1.board[3][5].length).toBe(5);
    expect(gameboard1.board[3][6].length).toBe(5);
    expect(gameboard1.board[3][7].length).toBe(5);
    expect(gameboard1.ships.length).toBe(1);
  });

  test('check for placing in occipied cells', () => {
    // the ships array should still be 1 length

    expect(gameboard1.placeShip(3, 3)).toBe('occupied cell');
    expect(gameboard1.ships.length).toBe(1);
  });

  test('placing second ship in vetical position', () => {
    // the ships array should still be 1 length
    gameboard1.shipPositionToggler();
    gameboard1.placeShip(2, 2);
    console.log(gameboard1.board);
    expect(gameboard1.shipPosition).toBe('vertical');
    expect(gameboard1.board[2][2].length).toBe(4);
    expect(gameboard1.board[3][2].length).toBe(4);
    expect(gameboard1.board[4][2].length).toBe(4);
    expect(gameboard1.board[5][2].length).toBe(4);
  });

  test('testing receiveAttack method gameboard on ship at ', () => {
    // attacking the ship with 5 length, it is placed at 0th index
    gameboard1.receiveAttack(3, 3);
    gameboard1.receiveAttack(3, 4);
    gameboard1.receiveAttack(3, 5);
    gameboard1.receiveAttack(3, 6);
    gameboard1.receiveAttack(3, 7);

    // attacking the ship with 4 length, placed at 1st index
    gameboard1.receiveAttack(2, 2);
    gameboard1.receiveAttack(3, 2);
    gameboard1.receiveAttack(4, 2);

    expect(gameboard1.board[3][3]).toBe(1);
    expect(gameboard1.board[4][2]).toBe(1);
    expect(gameboard1.ships[0].length).toBe(0);
    expect(gameboard1.ships[0].sinkStatus).toBe(true);

    expect(gameboard1.ships[1].length).toBe(1);
    expect(gameboard1.ships[1].sinkStatus).toBe(false);
  });

  test('test gameover or not', () => {
    expect(gameboard1.receiveAttack(5, 2)).toBe('gameover');
  });
});

import { experiments } from 'webpack';
import Gameboard from '../src/gameboard';

describe('testing the gameBoard class', () => {
  let gameboard1;

  // before all test we create gameboard object
  beforeAll(() => {
    gameboard1 = new Gameboard();
    //placing dummy ships of length, all horizontal 
    gameboard1.placeShip(0, 1)
    gameboard1.shipPositionToggler()
    gameboard1.placeShip(0, 9)
    // gameboard1.placeShip(3, 3)
    // gameboard1.placeShip(4, 4)

  });

  test('testing if ships are in the array ', () => {

    // checking lengths of the ships
    expect(gameboard1.ships[0].length).toBe(5);
    expect(gameboard1.ships[1].length).toBe(4);
    expect(gameboard1.ships[2].length).toBe(3);
    expect(gameboard1.ships[3].length).toBe(3);
    expect(gameboard1.ships[4].length).toBe(2);
  });

  test('testing placing of horizontal ship on the board', () => {
    //length 5 ship
    expect(gameboard1.board[0][1]).toBe(5);
    expect(gameboard1.board[0][2]).toBe(5);
    expect(gameboard1.board[0][3]).toBe(5);
    expect(gameboard1.board[0][4]).toBe(5);
    expect(gameboard1.board[0][5]).toBe(5);

  });

  test('testing placing of vertical ship on the board', () => {
    //length 4 ship
    expect(gameboard1.board[0][9]).toBe(4);
    expect(gameboard1.board[1][9]).toBe(4);
    expect(gameboard1.board[2][9]).toBe(4);
    expect(gameboard1.board[3][9]).toBe(4);
  });

  test('testing receiveAttack method', () => {
    //on ship
    gameboard1.receiveAttack(0,9)
    gameboard1.receiveAttack(1,9)
    gameboard1.receiveAttack(2,9)

    expect(gameboard1.ships[1].length).toBe(1)
    expect(gameboard1.board[1][9]).toBe('x')
    expect(gameboard1.receiveAttack(3,9)).toBe('ship sunk')
    gameboard1.receiveAttack(2,3)
    expect(gameboard1.board[2][3]).toBe(1)
    console.log(gameboard1.board)
  })
});

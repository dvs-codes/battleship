import Ship from '../src/ship';

describe.skip('testing the Ship class', () => {
  let ship1;

  // before each test we run this
  beforeEach(() => {
    ship1 = new Ship(4);
  });

  test('check hit function so that it reduces length by 1', () => {
    // ship1 example has a 4 length
    ship1.hit();
    expect(ship1.length).toBe(3);
  });

  test('check the sink status method of ship to be false', () => {
    // ship1 example has a 4 length
    ship1.hit();
    // first should return false as length is 3 after a hit
    expect(ship1.isSunk()).toBeFalsy();
  });

  test('check the sink status method of ship to be truthy', () => {
    // ship1 example has a 4 length
    ship1.hit();
    ship1.hit();
    ship1.hit();
    ship1.hit();

    // first should return true as length is 0 after a hit
    expect(ship1.isSunk()).toBeTruthy();
  });
});

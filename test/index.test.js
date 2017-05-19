import Big from 'big-integer';
import _ from 'lodash';
import { Shuffler } from '../src';

const [MULTIPLIER, INCREMENT, MODULUS] = [13, 5, 100]

const rs = new Shuffler({
  a: Big(MULTIPLIER), // prime number
  c: Big(INCREMENT),
  m: Big(MODULUS),
});

describe('random integer generator', () => {
  test('lcg()', () => {
    const plain = Big.randBetween(0, rs.M);
    expect(
        rs.lcg(plain)
      ).toEqual(
        Big((MULTIPLIER * plain + INCREMENT) % MODULUS)
      );
  });
});

describe('reversible', () => {
  test('r_lcg()', () => {
    const plain = Big.randBetween(0, rs.M);
    const cipher = rs.lcg(plain);
    expect(
        rs.r_lcg(cipher)
      ).toEqual(
        plain
      );
  });
});

describe('unduplicated', () => {
  test(`scan between 0 to ${MODULUS}`, () => {
    const domino = _.times(MODULUS, _.constant(0));
    for (const plain of _.range(MODULUS)) {
      domino[rs.lcg(plain)] = 1;
    }
    expect(
        domino
      ).toEqual(
        _.times(MODULUS, _.constant(1))
      );
  });
});

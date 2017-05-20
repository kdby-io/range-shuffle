import Big from 'big-integer';
import _ from 'lodash';
import { Shuffler } from '../src';

describe('small integer', () => {
  const [MULTIPLIER, INCREMENT, MODULUS] = [
    13, // prime number
    5,
    100
  ];

  describe('with Number inputs', () => {
    const rs = new Shuffler({
      a: MULTIPLIER,
      c: INCREMENT,
      m: MODULUS,
    });

    describe('random', () => {
      test('lcg()', () => {
        const plain = _.random(MODULUS - 1);
        const cipher = (MULTIPLIER * plain + INCREMENT) % MODULUS;

        expect(rs.lcg(plain)).toEqual(cipher);
      });
    });

    describe('reversible', () => {
      test('r_lcg()', () => {
        const plain = _.random(MODULUS - 1);
        const cipher = rs.lcg(plain);

        expect(rs.r_lcg(cipher)).toEqual(plain);
      });
    });

    describe('unduplicated', () => {
      test(`scan between 0 to ${MODULUS}`, () => {
        const domino = _.times(MODULUS, _.constant(0));
        for (const plain of _.range(MODULUS)) {
          domino[rs.lcg(plain)] = 1;
        }

        expect(domino).toEqual(_.times(MODULUS, _.constant(1)));
      });
    });
  });

  describe('with String inputs', () => {
    const rs = new Shuffler({
      a: MULTIPLIER.toString(),
      c: INCREMENT.toString(),
      m: MODULUS.toString(),
    });

    describe('random', () => {
      test('lcg()', () => {
        const plain = _.random(MODULUS - 1).toString();
        const cipher = (MULTIPLIER * plain + INCREMENT) % MODULUS;

        expect(rs.lcg(plain)).toEqual(cipher);
      });
    });

    describe('reversible', () => {
      test('r_lcg()', () => {
        const plain = _.random(MODULUS - 1).toString();
        const cipher = rs.lcg(plain);

        expect(rs.r_lcg(cipher).toString()).toEqual(plain);
      });
    });

    describe('unduplicated', () => {
      test(`scan between 0 to ${MODULUS}`, () => {
        const domino = _.times(MODULUS, _.constant(0));
        for (const plain of _.range(MODULUS)) {
          domino[rs.lcg(plain)] = 1;
        }

        expect(domino).toEqual(_.times(MODULUS, _.constant(1)));
      });
    });
  });
});

describe('large integer', () => {
  describe('with Number inputs', () => {
    const [MULTIPLIER, INCREMENT, MODULUS] = [
      13, // prime number
      5,
      9007199254740992 // Number.MAX_SAFE_INTEGER + 1
    ];

    test('throw error', () => {
      const setupNewShuffler = () => {
        new Shuffler({
          a: MULTIPLIER,
          c: INCREMENT,
          m: MODULUS,
        });
      };

      expect(setupNewShuffler).toThrow('Use String type for large number');
    });
  });

  describe('with String inputs', () => {
    const [MULTIPLIER, INCREMENT, MODULUS] = [
      13, // prime number
      5,
      '9007199254740999999999999999999992' // over Number.MAX_SAFE_INTEGER
    ];

    const rs = new Shuffler({
      a: MULTIPLIER.toString(),
      c: INCREMENT.toString(),
      m: MODULUS,
    });

    describe('random', () => {
      test('lcg()', () => {
        const plain = Big.randBetween(0, Big(MODULUS)).toString();
        const cipher = Big(MULTIPLIER).times(
            Big(plain)
          ).add(
            Big(INCREMENT)
          ).mod(
            Big(MODULUS)
          ).toString();

        expect(rs.lcg(plain)).toEqual(cipher);
      });
    });

    describe('reversible', () => {
      test('r_lcg()', () => {
        const plain = Big.randBetween(0, Big(MODULUS)).toString();
        const cipher = rs.lcg(plain);

        expect(rs.r_lcg(cipher)).toEqual(plain);
      });
    });
  });
})

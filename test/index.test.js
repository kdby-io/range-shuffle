import Big from 'big-integer';
import _ from 'lodash';
import Shuffler from '../src';

describe('small integer', () => {
  const [MULTIPLIER, INCREMENT, MODULUS] = [
    13, // prime number
    5,
    100,
  ];

  describe('with Number inputs', () => {
    const rs = new Shuffler({
      MULTIPLIER,
      INCREMENT,
      MODULUS,
    });

    describe('random', () => {
      test('LCG()', () => {
        const plain = _.random(MODULUS - 1);
        const cipher = ((MULTIPLIER * plain) + INCREMENT) % MODULUS;

        expect(rs.LCG(plain)).toEqual(cipher);
      });
    });

    describe('reversible', () => {
      test('reverseLCG()', () => {
        const plain = _.random(MODULUS - 1);
        const cipher = rs.LCG(plain);

        expect(rs.reverseLCG(cipher)).toEqual(plain);
      });
    });

    describe('unduplicated', () => {
      test(`scan between 0 to ${MODULUS}`, () => {
        const domino = _.times(MODULUS, _.constant(0));
        _.range(MODULUS).forEach(
          plain => (domino[rs.LCG(plain)] = 1),
        );

        expect(domino).toEqual(_.times(MODULUS, _.constant(1)));
      });
    });
  });


  describe('with String inputs', () => {
    const rs = new Shuffler({
      MULTIPLIER: MULTIPLIER.toString(),
      INCREMENT: INCREMENT.toString(),
      MODULUS: MODULUS.toString(),
    });

    describe('random', () => {
      test('LCG()', () => {
        const plain = _.random(MODULUS - 1).toString();
        const cipher = ((MULTIPLIER * plain) + INCREMENT) % MODULUS;

        expect(rs.LCG(plain)).toEqual(cipher);
      });
    });

    describe('reversible', () => {
      test('reverseLCG()', () => {
        const plain = _.random(MODULUS - 1).toString();
        const cipher = rs.LCG(plain);

        expect(rs.reverseLCG(cipher).toString()).toEqual(plain);
      });
    });

    describe('unduplicated', () => {
      test(`scan between 0 to ${MODULUS}`, () => {
        const domino = _.times(MODULUS, _.constant(0));
        _.range(MODULUS).forEach(
          plain => (domino[rs.LCG(plain)] = 1),
        );

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
      9007199254740992, // Number.MAX_SAFE_INTEGER + 1
    ];

    test('throw error', () => {
      const setupNewShuffler = () => {
        // eslint-disable-next-line no-new
        new Shuffler({
          MULTIPLIER,
          INCREMENT,
          MODULUS,
        });
      };

      expect(setupNewShuffler).toThrow('Use String type for large integer.');
    });
  });


  describe('with String inputs', () => {
    const [MULTIPLIER, INCREMENT, MODULUS] = [
      13, // prime number
      5,
      '9007199254740999999999999999999992', // over Number.MAX_SAFE_INTEGER
    ];

    const rs = new Shuffler({
      MULTIPLIER: MULTIPLIER.toString(),
      INCREMENT: INCREMENT.toString(),
      MODULUS: MODULUS.toString(),
    });

    describe('random', () => {
      test('LCG()', () => {
        const plain = Big.randBetween(0, Big(MODULUS)).toString();
        const cipher = Big(MULTIPLIER)
          .times(Big(plain))
          .add(Big(INCREMENT))
          .mod(Big(MODULUS))
          .toString();

        expect(rs.LCG(plain)).toEqual(cipher);
      });
    });

    describe('reversible', () => {
      test('reverseLCG()', () => {
        const plain = Big.randBetween(0, Big(MODULUS)).toString();
        const cipher = rs.LCG(plain);

        expect(rs.reverseLCG(cipher)).toEqual(plain);
      });
    });
  });
});

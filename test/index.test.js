import Big from 'big-integer';
import _ from 'lodash';
import Shuffler from '../src';

describe('with a Number small integer', () => {
  const [MULTIPLIER, INCREMENT, MODULUS] = [
    13, // prime number
    5,
    100,
  ];

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

describe('with a String small integer', () => {
  const [MULTIPLIER, INCREMENT, MODULUS] = [
    13, // prime number
    5,
    100,
  ];

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

describe('with a Number type large integer', () => {
  test('throw error', () => {
    const setupNewShuffler = () => {
      // eslint-disable-next-line no-new
      new Shuffler({
        MULTIPLIER: 13,
        INCREMENT: 5,
        MODULUS: 9007199254740992, // Number.MAX_SAFE_INTEGER + 1
      });
    };

    expect(setupNewShuffler).toThrow('Use String type for large integer.');
  });
});

describe('with a String large integer', () => {
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

describe('with a negative integer', () => {
  test('throw error', () => {
    const setupNewShuffler = () => {
      // eslint-disable-next-line no-new
      new Shuffler({
        MULTIPLIER: 13,
        INCREMENT: -5,
        MODULUS: 100
      });
    };

    expect(setupNewShuffler).toThrow('-5 is not a positive integer.');
  });
});

describe('with a non-prime MULTIPLIER', () => {
  test('throw error', () => {
    const setupNewShuffler = () => {
      // eslint-disable-next-line no-new
      new Shuffler({
        MULTIPLIER: 12,
        INCREMENT: 5,
        MODULUS: 100
      });
    };

    expect(setupNewShuffler).toThrow('12 is not a prime number.');
  });
});

describe('with a larger than MODULUS integer', () => {
  test('throw error', () => {
    const rs = new Shuffler({
      MULTIPLIER: 13,
      INCREMENT: 5,
      MODULUS: 100,
    });

    expect(() => { rs.LCG(101); }).toThrow('ss');
  });
});

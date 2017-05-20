import Big from 'big-integer';

const validateInput = ({ a, c, m }) => {
  [a, c, m].forEach((input) => {
    if (Big(input) < 0) {
      throw new Error(`${input} is not a positive integer.`);
    }
    if (typeof input === 'number' && !Number.isSafeInteger(input)) {
      throw new Error('Use String type for large integer.');
    }
  });

  if (!Big(a).isPrime()) {
    throw new Error(`${a} is not a prime number`);
  }
};

const convertForResult = int =>
  (
    Number.isSafeInteger(int.toJSNumber()) ?
    int.toJSNumber() :
    int.toString()
  );

const extendedEuclidX = (a, b) =>
  // eslint-disable-next-line no-use-before-define
  (b.eq(0) ? Big(1) : extendedEuclidY(b, a.mod(b)));

const extendedEuclidY = (a, b) =>
  (
    b.eq(0) ?
    Big(0) :
    extendedEuclidX(b, a.mod(b))
    .minus(extendedEuclidY(b, a.mod(b))
    .times(a.divide(b)))
  );

export {
  validateInput,
  convertForResult,
  extendedEuclidX,
};

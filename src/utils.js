import Dough from 'big-integer';

const _validateInteger = (int) => {
  if (Dough(int) < 0) {
    throw new Error(`${int} is not a positive integer.`);
  }
  if (typeof int === 'number' && !Number.isSafeInteger(int)) {
    throw new Error('Use String type for large integer.');
  }
};

const validateFactors = ({ MULTIPLIER, INCREMENT, MODULUS }) => {
  [MULTIPLIER, INCREMENT, MODULUS].forEach(
    factor => _validateInteger(factor)
  );

  if (!Dough(MULTIPLIER).isPrime()) {
    throw new Error(`${MULTIPLIER} is not a prime number`);
  }
};

const validateInput = (int, factors) => {
  const { MODULUS } = factors;
  _validateInteger(int);

  if (Dough(int).compare(MODULUS) !== -1) {
    throw new Error('A input integer must be less than MODULUS');
  }
};

const convertForResult = int =>
  (
    Number.isSafeInteger(int.toJSNumber()) ?
    int.toJSNumber() :
    int.toString()
  );

export {
  Dough,
  validateFactors,
  validateInput,
  convertForResult,
};

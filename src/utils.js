import Dough from 'big-integer';

const _validateInteger = (int) => {
  if (Dough(int) < 0) {
    throw new Error(`${int} is not a positive integer.`);
  }
  if (typeof int === 'number' && !Number.isSafeInteger(int)) {
    throw new Error('Use String type for large integer.');
  }
};

const validateConstants = ({ MULTIPLIER, INCREMENT, MODULUS }) => {
  [MULTIPLIER, INCREMENT, MODULUS].forEach(
    constant => _validateInteger(constant)
  );

  if (!Dough(MULTIPLIER).isPrime()) {
    throw new Error(`${MULTIPLIER} is not a prime number`);
  }
};

const validateInput = (int, constants) => {
  const { MODULUS } = constants;
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
  validateConstants,
  validateInput,
  convertForResult,
};

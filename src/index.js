import {
  Dough,
  validateFactors,
  validateInput,
  convertForResult,
} from './utils';


export default class Shuffler {
  constructor(factors) {
    validateFactors(factors);

    const { MULTIPLIER, INCREMENT, MODULUS } = factors;
    this.factors = {
      MULTIPLIER: Dough(MULTIPLIER),
      INCREMENT: Dough(INCREMENT),
      MODULUS: Dough(MODULUS),
    };
  }

  // after = ((A * before) + C) % M
  LCG(int) {
    validateInput(int, this.factors);
    const { MULTIPLIER, INCREMENT, MODULUS } = this.factors;
    const before = Dough(int);

    const after = MULTIPLIER.times(before).add(INCREMENT).mod(MODULUS);
    return convertForResult(after);
  }

  // before = ((after - C) * inverse) % M
  reverseLCG(int) {
    validateInput(int, this.factors);
    const { MULTIPLIER, INCREMENT, MODULUS } = this.factors;
    const INVERSE = MULTIPLIER.modInv(MODULUS);
    const after = Dough(int);

    let before = after.minus(INCREMENT).times(INVERSE).mod(MODULUS);
    if (before < 0) {
      before = before.add(MODULUS);
    }
    return convertForResult(before);
  }
}

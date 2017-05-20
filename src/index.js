import {
  Dough,
  validateConstants,
  validateInput,
  convertForResult,
} from './utils';


export default class Shuffler {
  constructor(constants) {
    validateConstants(constants);

    const { MULTIPLIER, INCREMENT, MODULUS } = constants;
    this.constants = {
      MULTIPLIER: Dough(MULTIPLIER),
      INCREMENT: Dough(INCREMENT),
      MODULUS: Dough(MODULUS),
    };
  }

  // after = ((A * before) + C) % M
  LCG(int) {
    validateInput(int, this.constants);
    const { MULTIPLIER, INCREMENT, MODULUS } = this.constants;
    const before = Dough(int);

    const after = MULTIPLIER.times(before).add(INCREMENT).mod(MODULUS);
    return convertForResult(after);
  }

  // before = ((after - C) * inverse) % M
  reverseLCG(int) {
    validateInput(int, this.constants);
    const { MULTIPLIER, INCREMENT, MODULUS } = this.constants;
    const INVERSE = MULTIPLIER.modInv(MODULUS);
    const after = Dough(int);

    let before = after.minus(INCREMENT).times(INVERSE).mod(MODULUS);
    if (before < 0) {
      before = before.add(MODULUS);
    }
    return convertForResult(before);
  }
}

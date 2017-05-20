import Big from 'big-integer';
import {
  validateInput,
  convertForResult,
  extendedEuclidX,
} from './utils';


export default class Shuffler {
  constructor({ a, c, m }) {
    validateInput({ a, c, m });
    this.factors = {
      A: Big(a),
      C: Big(c),
      M: Big(m),
    };
  }

  LCG(before) {
    const { A, C, M } = this.factors;
    const after = A.times(Big(before)).add(C).mod(M);
    return convertForResult(after);
  }

  reverseLCG(after) {
    const { A, C, M } = this.factors;
    const inverse = extendedEuclidX(A, M);
    let before = Big(after).minus(C).times(inverse).mod(M);
    if (before.compare(0) === -1) {
      before = before.add(M);
    }
    return convertForResult(before);
  }
}

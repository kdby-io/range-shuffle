import Big from 'big-integer';
import _ from 'lodash';

export class Shuffler {
  constructor({ a, c, m }) {
    this._validateInput([a, c, m]);
    this.factors = {
      A: Big(a),
      C: Big(c),
      M: Big(m),
    };
  }

  _validateInput(inputs) {
    _.map(inputs, input => {
      if (Big(input) < 0)
        throw `${input} is not a positive integer.`;
      if (typeof input === 'number' && !Number.isSafeInteger(input))
        throw 'Use String type for large integer.';
    });
  }


  lcg(before) {
    const {A, C, M} = this.factors;
    const after = A.times(Big(before)).add(C).mod(M);
    return this._convertForResult(after);
  }

  r_lcg(after) {
    const {A, C, M} = this.factors;
    const inverse = this._extendedEuclidX(A, M);
    let before = Big(after).minus(C).times(inverse).mod(M);
    if (before.compare(0) === -1)
      before = before.add(M);
    return this._convertForResult(before);
  }

  _makeDivisible(a, b) {
    return a.divide(b).times(b);
  }

  _extendedEuclidX(a, b) {
    if (b.compare(0) === 0)
      return Big(1);
    else
      return this._extendedEuclidY(
        b, a.minus(this._makeDivisible(a, b))
      );
  }

  _extendedEuclidY(a, b) {
    if (b.compare(0) === 0)
      return Big(0);
    else
      return this._extendedEuclidX(
        b, a.minus(this._makeDivisible(a, b))
      ).minus(this._extendedEuclidY(
        b, a.minus(this._makeDivisible(a, b))
      ).times(a.divide(b)));
  }

  _convertForResult(int) {
    return Number.isSafeInteger(int.toJSNumber()) ? int.toJSNumber() : int.toString();
  }
}

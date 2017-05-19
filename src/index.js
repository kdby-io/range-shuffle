import Big from 'big-integer';

export class Shuffler {
  constructor({ a, c, m }) {
    [this.A, this.C, this.M] = [a, c, m];
  }

  lcg(before) {
    const after = this.A.times(before).add(this.C).mod(this.M);
    return after;
  }

  r_lcg(after) {
    const inverse = this._extendedEuclidX(this.A, this.M);
    let before = after.minus(this.C).times(inverse).mod(this.M);
    if (before.compare(0) === -1)
      before = before.add(this.M);
    return before;
  }

  _makeDivisible(a, b) {
    return this._makeDivisible(a, b);
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
}

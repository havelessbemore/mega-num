import {Integer} from '../type/integer';

export function setOne<T extends Integer>(A: T): T {
  A.precision = 1;
  A.digits.length = 1;
  A.digits[0] = 1;
  A.isNegative = false;
  return A;
}

export function setZero<T extends Integer>(A: T): T {
  A.precision = 0;
  A.digits.length = 0;
  A.isNegative = false;
  return A;
}

export function share<T extends Integer>(to: T, from: T): T {
  to.base = from.base;
  to.digits = from.digits;
  to.precision = from.precision;
  to.isNegative = from.isNegative;
  return to;
}

export function copy<T extends Integer>(to: T, from: T): T {
  share(to, from);
  to.digits = to.digits.slice(0, to.precision);
  return to;
}

import {Integer} from '../integer';

export function negate(A: Integer): Integer {
  A.isNegative = A.precision > 0 && !A.isNegative;
  return A;
}

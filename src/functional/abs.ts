import {Integer} from '../integer';

export function abs(A: Integer): Integer {
  A.isNegative = false;
  return A;
}

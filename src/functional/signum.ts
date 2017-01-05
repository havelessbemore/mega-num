import {Integer} from '../integer';

export function signum(A: Integer): number {
  return A.isNegative ? -1 : A.precision === 0 ? 0 : 1;
}

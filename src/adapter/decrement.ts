import Integer from '../type/integer';
import {decrement as algo} from '../algorithm/decrement';

export function decrement(A: Integer): Integer {
  A.precision = algo(A.digits, 0, A.precision, A.base);
  return A;
}

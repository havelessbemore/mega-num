import Integer from '../type/integer';
import {increment as algo} from '../algorithm/increment';

export function increment(A: Integer): Integer {
  A.precision = algo(A.digits, 0, A.precision, A.base);
  return A;
}

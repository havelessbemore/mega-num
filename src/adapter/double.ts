import {Integer} from '../type/integer';
import {double as algo} from '../algorithm/double';

export function double(A: Integer): Integer {
  A.precision = algo(A.digits, 0, A.precision, A.base);
  return A;
}

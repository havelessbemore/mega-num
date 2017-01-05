import {Integer} from '../integer';
import {double as _double} from '../algorithm/double';

export function double(A: Integer): Integer {
  A.precision = _double(A.digits, 0, A.precision, A.base);
  return A;
}

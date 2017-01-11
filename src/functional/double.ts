import {Integer} from '../integer';
import {double as _double} from '../algorithm/double';
import {tryMutable} from '../util/intUtils';

export function double(A: Integer, isMutable?: boolean): Integer {
  A = tryMutable(A, isMutable);
  A.precision = _double(A.digits, 0, A.precision, A.base);
  return A;
}

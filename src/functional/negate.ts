import {Integer} from '../integer';
import {tryMutable} from '../util/intUtils';

export function negate(A: Integer, isMutable?: boolean): Integer {
  A = tryMutable(A, isMutable);
  A.isNegative = A.precision > 0 && !A.isNegative;
  return A;
}

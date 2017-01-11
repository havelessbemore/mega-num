import {Integer} from '../integer';
import {tryMutable} from '../util/intUtils';

export function abs(A: Integer, isMutable?: boolean): Integer {
  A = tryMutable(A, isMutable);
  A.isNegative = false;
  return A;
}

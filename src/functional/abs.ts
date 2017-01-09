import {Integer} from '../integer';
import {clone} from '../functional/clone';

export function abs(A: Integer, isMutable: boolean = false): Integer {
  A = (isMutable) ? A : clone(A);
  A.isNegative = false;
  return A;
}

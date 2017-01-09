import {Integer} from '../integer';
import {clone} from './clone';

export function negate(A: Integer, isMutable: boolean = false): Integer {
  A = (isMutable) ? A : clone(A);
  A.isNegative = A.precision > 0 && !A.isNegative;
  return A;
}

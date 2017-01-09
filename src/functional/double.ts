import {Integer} from '../integer';
import {clone} from './clone';
import {double as _double} from '../algorithm/double';

export function double(A: Integer, isMutable: boolean = false): Integer {
  A = (isMutable) ? A : clone(A);
  A.precision = _double(A.digits, 0, A.precision, A.base);
  return A;
}

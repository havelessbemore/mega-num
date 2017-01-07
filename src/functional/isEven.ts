import {Integer} from '../integer';
import {isEven as _isEven} from '../algorithm/isEven';

export function isEven(A: Integer): boolean {
  return _isEven(A.digits, 0, A.precision, A.base);
}

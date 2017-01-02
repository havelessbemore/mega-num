import {Integer} from '../type/integer';
import {reverseSubtraction as algo} from '../algorithm/reverseSubtraction';

export function reverseSubtraction(A: Integer, B: Integer): Integer {
  A.precision = algo(
    A.digits, 0, A.precision, B.digits, 0, B.precision, A.base
  );
  return A;
}

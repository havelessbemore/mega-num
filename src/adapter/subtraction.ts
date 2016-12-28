import Integer from '../type/integer';
import {subtraction as algo} from '../algorithm/subtraction';

export function subtraction(A: Integer, B: Integer): Integer {
  A.precision = algo(
    A.digits, 0, A.precision, B.digits, 0, B.precision, A.base
  );
  return A;
}

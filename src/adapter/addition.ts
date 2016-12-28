import Integer from '../type/integer';
import {addition as algo} from '../algorithm/addition';

export function addition(A: Integer, B: Integer): Integer {
  A.precision = algo(
    A.digits, 0, A.precision, B.digits, 0, B.precision, A.base
  );
  return A;
}

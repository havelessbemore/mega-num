import Integer from '../type/integer';
import {reverseAddition as algo} from '../algorithm/reverseAddition';

export function reverseAddition(A: Integer, B: Integer): Integer {
  A.precision = algo(
    A.digits, 0, A.precision, B.digits, 0, B.precision, A.base
  );
  return A;
}

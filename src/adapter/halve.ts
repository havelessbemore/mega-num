import Integer from '../type/integer';
import {halve as algo} from '../algorithm/halve';

export function halve(A: Integer): Integer {
  let precision: number;
  let remainder: number;
  [precision, remainder] = algo(A.digits, 0, A.precision, A.base);
  A.precision = precision;
  return {
    base: A.base,
    digits: (remainder === 0) ? [] : [1],
    precision: remainder,
    isNegative: false
  };
}

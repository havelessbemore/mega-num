import {Integer} from '../integer';
import {compare} from './compare';
import {toInteger} from './toInteger';
import {toNumber} from './toNumber';
import {shiftDown} from '../util/arrayUtils';
import {setZero} from '../util/intUtils';

export function shiftRight(A: Integer, B: Integer): Integer {

  // If shifting by a negative number
  if (B.isNegative) {
    throw new EvalError('Cannot make negative right shifts');
  }

  // If shifting 0 or shifting by 0
  if (A.precision === 0 || B.precision === 0) {
    return A;
  }

  // If shifting down to 0
  const C = toInteger(A.precision, B.base);
  if (compare(B, C) >= 0) {
    return setZero(A);
  }

  // Convert B to number
  const b = toNumber(B);

  // Shift A right by b
  shiftDown(A.digits, 0, A.precision, b);
  A.digits.length = A.precision = A.precision - b;

  // Return result
  return A;
}

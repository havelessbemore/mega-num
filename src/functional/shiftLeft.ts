import {Globals} from '../globals';
import {Integer} from '../integer';
import {toNumber} from './toNumber';
import {safeShiftUp, unsafeShiftUp} from '../util/arrayUtils';
import {zero} from '../util/numUtils';

export function shiftLeft(A: Integer, B: Integer): Integer {

  // If shifting by a negative number
  if (B.isNegative) {
    throw new EvalError('Cannot make negative left shifts');
  }
  
  // If shifting 0 or shifting by 0
  if (A.precision === 0 || B.precision === 0) {
    return A;
  }

  // Convert B to number
  const b = toNumber(B);

  // Check if shift too large
  if (b > Globals.MAX_PRECISION - A.precision) {
    throw new RangeError(
      `Left shift result larger than max precision ${Globals.MAX_PRECISION}`
    );
  }

  // Shift A left by b
  A.digits.length = A.precision + b;
  if (b >= A.precision) {
    unsafeShiftUp(A.digits, 0, A.precision, b);
  } else {
    safeShiftUp(A.digits, 0, A.precision, b);
  }
  zero(A.digits, 0, b);
  A.precision = A.precision + b;

  // Return result
  return A;
}

import {Integer} from '../integer';
import {decrement as _decrement} from '../algorithm/decrement';
import {increment} from '../algorithm/increment';
import {setOne, tryMutable} from '../util/intUtils';

export function decrement(A: Integer, isMutable?: boolean): Integer {
  A = tryMutable(A, isMutable);

  //If negative
  if(A.isNegative){
    A.precision = increment(A.digits, 0, A.precision, A.base);

  //If zero
  } else if (A.precision === 0){
    setOne(A);
    A.isNegative = true;

  //If positive
  } else {
    A.precision = _decrement(A.digits, 0, A.precision, A.base);
  }

  return A;
}

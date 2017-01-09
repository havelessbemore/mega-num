import {Integer} from '../integer';
import {clone} from './clone';
import {decrement as _decrement} from '../algorithm/decrement';
import {increment} from '../algorithm/increment';
import {setOne} from '../util/intUtils';

export function decrement(A: Integer, isMutable: boolean = false): Integer {
  A = (isMutable) ? A : clone(A);
  
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

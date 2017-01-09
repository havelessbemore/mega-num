import {Integer} from '../integer';
import {clone} from './clone';
import {decrement} from '../algorithm/decrement';
import {increment as _increment} from '../algorithm/increment';


export function increment(A: Integer, isMutable: boolean = false): Integer {
  A = (isMutable) ? A : clone(A);

  //If negative
  if(A.isNegative){
    A.precision = decrement(A.digits, 0, A.precision, A.base);

    //If now zero
    if(A.precision === 0){
      A.isNegative = false;
    }

  //If positive
  } else {
    A.precision = _increment(A.digits, 0, A.precision, A.base);
  }

  return A;
}

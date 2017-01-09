import {Integer} from '../integer';
import {clone} from './clone';
import {karatsubaSquare} from '../algorithm/karatsubaSquare';
import {longSquare} from '../algorithm/longSquare';

export function square(A: Integer, isMutable: boolean = false): Integer {
  A = (isMutable) ? A : clone(A);

  //If zero
  if(A.precision === 0){
    return A;
  }

  //Make positive
  A.isNegative = false;

  //Make minimum room for squaring
  const maxNewLen: number = 2*A.precision - 1;
  if(A.digits.length < maxNewLen){
    A.digits.length = maxNewLen;
  }

  //Choose best performing algorithm
  if(A.precision < 500){
    A.precision = longSquare(A.digits, 0, A.precision, A.base);
  } else {
    A.precision = karatsubaSquare(A.digits, 0, A.precision, A.base);
  }

  return A;
}

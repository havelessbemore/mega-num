import {Integer} from '../integer';

export function negate(A: Integer): Integer {
  if(A.precision > 0){
    A.isNegative = !A.isNegative;
  }
  return A;
}

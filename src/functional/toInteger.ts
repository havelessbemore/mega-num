import {DEFAULT_BASE} from '../constants';
import {Integer} from '../integer';
import {setBase} from './setBase';
import {isInteger} from './isInteger';
import {setZero} from '../util/intUtils';
import {strToDigits} from '../util/numUtils';

export function toInteger(A: Integer | number | string, base: number = DEFAULT_BASE): Integer {

  //If already an integer
  if(isInteger(A)){
    return A;
  }

  //Convert numbers to string
  if(typeof A === "number"){
    A = '' + A;

  //If not an expected type
  } else if(typeof A !== "string"){
    throw TypeError("Expecting type Integer | string | number");
  }

  //Convert string to base 10
  const B: Integer = setZero({base: 10});
  [B.digits, B.isNegative] = strToDigits(A);
  B.precision = B.digits.length;

  //Convert to chosen base
  setBase(B, base);

  return B;
}

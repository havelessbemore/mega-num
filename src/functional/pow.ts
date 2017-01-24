import {Integer} from '../integer';
import {isEven} from './isEven';
import {exponentiation} from '../algorithm/exponentiation';
import {growArray} from '../util/arrayUtils';
import {setOne, setZero, tryMutable} from '../util/intUtils';

export function pow(A: Integer, B: Integer, isMutable?: boolean): Integer {
  A = tryMutable(A, isMutable);

  //C^0 = 1
  if(B.precision === 0){
    return setOne(A);
  }

  //If power is negative
  if(B.isNegative){

    //If 1 / 0
    if(A.precision === 0){
      throw new EvalError("Divide by zero");
    }

    return setZero(A);
  }

  //0^B = zero
  if(A.precision === 0){
    return A;
  }

  //If negative base and even power
  A.isNegative = A.isNegative && !isEven(B);

  //1^B = 1
  if(A.precision === 1 && A.digits[0] === 1){
    return A;
  }

  //Set new size
  growArray(A.digits,

    //Min new size
    (A.precision - 1) * (B.base ** (B.precision - 1)) + 1,

    //Max new size
    A.precision * ((B.base ** B.precision) - 1)
  );

  //C = C^B
  A.precision = exponentiation(
    A.digits, 0, A.precision, A.base, B.digits.slice(0,B.precision), 0, B.precision, B.base
  );

  return A;
}

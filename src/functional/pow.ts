import {Integer} from '../integer';
import {isEven} from './isEven';
import {exponentiation} from '../algorithm/exponentiation';
import {growArray} from '../util/arrayUtils';
import {setOne, setZero, tryMutable} from '../util/intUtils';

export function pow(A: Integer, B: Integer, isMutable?: boolean): Integer {
  const C: Integer = tryMutable(A, isMutable);

  //C^0 = 1
  if(B.precision === 0){
    return setOne(C);
  }

  //If power is negative
  if(B.isNegative){

    //If 1 / 0
    if(C.precision === 0){
      throw new EvalError("Divide by zero");
    }

    return setZero(C);
  }

  //0^B = zero
  if(C.precision === 0){
    return C;
  }

  //If negative base and even power
  C.isNegative = C.isNegative && !isEven(B);

  //1^B = 1
  if(C.precision === 1 && C.digits[0] === 1){
    return C;
  }

  //Set new size
  growArray(A.digits,

    //Min new size
    (A.precision - 1) * (B.base ** (B.precision - 1)) + 1,

    //Max new size
    A.precision * ((B.base ** B.precision) - 1)
  );

  //C = C^B
  C.precision = exponentiation(
    C.digits, 0, C.precision, C.base, B.digits.slice(0,B.precision), 0, B.precision, B.base
  );

  return C;
}

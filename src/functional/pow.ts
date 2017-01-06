import {Integer} from '../integer';
import {copy} from './copy';
import {isEven} from './isEven';
import {exponentiation} from '../algorithm/exponentiation';
import {setOne, setZero} from '../util/intUtils';

export function pow(A: Integer, B: Integer): Integer {

  //A^0 = 1
  if(B.precision === 0){
    return setOne(A);
  }

  //If negative power
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
  if(A.isNegative && isEven(B)){
    A.isNegative = false;
  }

  //1^B = 1
  if(A.precision === 1 && A.digits[0] === 1){
    return A;
  }

  //Copy B
  B = copy({}, B);

  //A = A^B
  A.precision = exponentiation(
    A.digits, 0, A.precision, A.base, B.digits, 0, B.precision, B.base
  );

  return A;
}
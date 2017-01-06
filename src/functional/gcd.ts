import {Integer} from '../integer';
import {copy} from './copy';
import {steinGCD} from '../algorithm/steinGCD';
import {changeBase} from '../util/intUtils';

export function gcd(A: Integer, B: Integer): Integer {

  //Make A positive
  A.isNegative = false;

  //If GCD of self or B = 0
  if(A === B || B.precision === 0){
    return A;
  }

  const base: number = A.base;

  //If A = 0
  if(A.precision === 0){
    copy(A, B);
    A.isNegative = false;

  //If |A| > 0 && |B| > 0
  } else {

    //Normalize the bases
    changeBase(A, B.base);

    //Calculate GCD
    [A.digits,,A.precision] = steinGCD(
      A.digits, 0, A.precision, B.digits, 0, B.precision, A.base
    );
  }

  //Return A to original base
  return changeBase(A, base);
}

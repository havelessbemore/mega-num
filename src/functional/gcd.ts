import {Integer} from '../integer';
import {compare} from './compare';
import {copy} from './copy';
import {setBase} from './setBase';
import {steinGCD} from '../algorithm/steinGCD';

export function gcd(A: Integer, B: Integer): Integer {

  //Make A positive
  A.isNegative = false;

  //If GCD of self or B = 0
  if(A === B || B.precision === 0){
    return A;
  }

  //If A = 0
  if(A.precision === 0){
    copy(A, B);
    A.isNegative = false;
    return A;
  }

  //If |A| > 0 && |B| > 0
  const base: number = A.base;

  //Normalize the bases
  setBase(A, B.base);

  //If A != B
  if(compare(A, B) !== 0){

    //Calculate GCD
    [A.digits,,A.precision] = steinGCD(
      A.digits, 0, A.precision,
      B.digits.slice(0, B.precision), 0, B.precision,
      A.base
    );
  }

  //Return A to original base
  return setBase(A, base);
}

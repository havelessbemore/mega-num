import {Integer} from '../integer';
import {clone} from './clone';
import {copy} from './copy';
import {steinGCD} from '../algorithm/steinGCD';
import {changeBase} from '../util/intUtils';

export function gcd(A: Integer, B: Integer, isMutable: boolean = false): Integer {
  const C: Integer = (isMutable) ? A : clone(A);

  //Make C positive
  C.isNegative = false;

  //If GCD of self or B = 0
  if(A === B || B.precision === 0){
    return C;
  }

  const base: number = C.base;

  //If C = 0
  if(C.precision === 0){
    copy(C, B);
    C.isNegative = false;

  //If |C| > 0 && |B| > 0
  } else {

    //Normalize the bases
    changeBase(C, B.base);

    //Calculate GCD
    [C.digits,,C.precision] = steinGCD(
      C.digits, 0, C.precision, B.digits.slice(0, B.precision), 0, B.precision, C.base
    );
  }

  //Return C to original base
  return changeBase(C, base);
}

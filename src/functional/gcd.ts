import {Integer} from '../integer';
import {compare} from './compare';
import {copy} from './copy';
import {steinGCD} from '../algorithm/steinGCD';
import {changeBase, tryMutable} from '../util/intUtils';

export function gcd(A: Integer, B: Integer, isMutable?: boolean): Integer {
  const C: Integer = tryMutable(A, isMutable);

  //Make C positive
  C.isNegative = false;

  //If GCD of self or B = 0
  if(A === B || B.precision === 0){
    return C;
  }

  //If C = 0
  if(C.precision === 0){
    copy(C, B);
    C.isNegative = false;
    return C;
  }

  //If |C| > 0 && |B| > 0
  const base: number = C.base;

  //Normalize the bases
  changeBase(C, B.base);

  //If C != B
  if(compare(C, B) !== 0){

    //Calculate GCD
    [C.digits,,C.precision] = steinGCD(
      C.digits, 0, C.precision,
      B.digits.slice(0, B.precision), 0, B.precision,
      C.base
    );
  }

  //Return C to original base
  return changeBase(C, base);
}

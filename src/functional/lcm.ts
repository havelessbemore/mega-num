import {Integer} from '../integer';
import {copy} from './copy';
import {setBase} from './setBase';
import {lcm as _lcm} from '../algorithm/lcm';
import {setZero, tryMutable} from '../util/intUtils';

//See: https://en.wikipedia.org/wiki/Least_common_multiple
export function lcm(A: Integer, B: Integer, isMutable?: boolean): Integer {
  const C: Integer = tryMutable(A, isMutable);

  //Make C positive
  C.isNegative = false;

  //If LCM of self or A = 0 or B = 1
  if(A === B || A.precision === 0 || (B.precision === 1 && B.digits[0] === 1)){
    return C;
  }

  //If B is zero
  if(B.precision === 0){
    setZero(C);
    return C;
  }

  const base: number = C.base;

  //If C = 1
  if(C.precision === 1 && C.digits[0] === 1){
    copy(C, B);
    C.isNegative = false;

  //If C > 1 and B > 1
  } else {

    //Normalize bases
    setBase(C, B.base, true);

    //Calculate LCM
    [C.digits, C.precision] = _lcm(
      C.digits, 0, C.precision, B.digits, 0, B.precision, C.base
    );
  }

  //Change C to original base
  setBase(C, base, true);
  return C;
}

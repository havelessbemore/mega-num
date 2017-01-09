import {Integer} from '../integer';
import {clone} from './clone';
import {copy} from './copy';
import {lcm as _lcm} from '../algorithm/lcm';
import {changeBase, setZero} from '../util/intUtils';

export function lcm(A: Integer, B: Integer, isMutable: boolean = false): Integer {
  const C: Integer = (isMutable) ? A : clone(A);

  //Make C positive
  C.isNegative = false;

  //If LCM of self or A = 0 or B = 1
  if(A === B || A.precision === 0 || (B.precision === 1 && B.digits[0] === 1)){
    return C;
  }

  //If B is zero
  if(B.precision === 0){
    return setZero(C);
  }

  const base: number = C.base;

  //If C = 1
  if(C.precision === 1 && C.digits[0] === 1){
    copy(C, B);
    C.isNegative = false;

  //If C > 1 and B > 1
  } else {

    //Normalize bases
    changeBase(C, B.base);

    //Calculate LCM
    [C.digits, C.precision] = _lcm(
      C.digits, 0, C.precision, B.digits, 0, B.precision, C.base
    );
  }

  //Change C to original base
  return changeBase(C, base);
}

import {Integer} from '../integer';
import {copy} from './copy';
import {lcm as _lcm} from '../algorithm/lcm';
import {changeBase, setZero} from '../util/intUtils';

export function lcm(A: Integer, B: Integer): Integer {

  //Make A positive
  A.isNegative = false;

  //If LCM of self or A = 0 or B = 1
  if(A === B || A.precision === 0 || (B.precision === 1 && B.digits[0] === 1)){
    return A;
  }

  //If B is zero
  if(B.precision === 0){
    return setZero(A);
  }

  const base: number = A.base;

  //If A = 1
  if(A.precision === 1 && A.digits[0] === 1){
    copy(A, B);
    A.isNegative = false;

  //If A > 1 and B > 1
  } else {

    //Normalize bases
    changeBase(A, B.base);

    //Calculate LCM
    [A.digits, A.precision] = _lcm(
      A.digits, 0, A.precision, B.digits, 0, B.precision, A.base
    );
  }

  //Change A to original base
  return changeBase(A, base);
}

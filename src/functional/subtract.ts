import {Integer} from '../integer';
import {add} from './add';
import {compare} from './compare';
import {copy} from './copy';
import {negate} from './negate';
import {setBase} from './setBase';
import {reverseSubtraction} from '../algorithm/reverseSubtraction';
import {subtraction} from '../algorithm/subtraction';
import {setZero} from '../util/intUtils';

export function subtract(A: Integer, B: Integer): Integer {

  //If subtracting itself
  if(A === B){
    return setZero(A);
  }

  //If B is zero
  if(B.precision === 0){
    return A;
  }

  const base: number = A.base;

  //If A is zero
  if(A.precision === 0){

    //Copy B
    copy(A, B);
    negate(A);
    return setBase(A, base);
  }

  //If signs differ
  if(A.isNegative !== B.isNegative){

    //Change sign, add, change sign again
    negate(A);
    add(A, B);
    return negate(A);
  }

  //Normalize to B's base
  setBase(A, B.base);

  //Compare A and B
  const c: number = compare(A, B);

  //If A == B
  if(c === 0){
    A.base = base;
    return setZero(A);
  }

  //If A < B
  if(c < 0){

    //Switch sign
    negate(A);

    //Make room for subtraction
    if(A.digits.length < B.precision){
      A.digits.length = B.precision;
    }

    //Subtract
    A.precision = reverseSubtraction(
      A.digits, 0, A.precision,
      B.digits, 0, B.precision,
      A.base
    );

  //If A > B
  } else {
    A.precision = subtraction(
      A.digits, 0, A.precision,
      B.digits, 0, B.precision,
      A.base
    );
  }

  return setBase(A, base);
}

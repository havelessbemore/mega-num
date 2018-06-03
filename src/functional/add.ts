import {Integer} from '../integer';
import {copy} from './copy';
import {double} from './double';
import {negate} from './negate';
import {setBase} from './setBase';
import {subtract} from './subtract';
import {addition} from '../algorithm/addition';
import {reverseAddition} from '../algorithm/reverseAddition';
import {growArray} from '../util/arrayUtils';

//A = toInteger([3], 1, false, 10);
//B = toInteger([1], 1, true, 10);
export function add(A: Integer, B: Integer): Integer {

  //If self
  if(A === B){
    return double(A);
  }

  //If B is zero
  if(B.precision === 0){
    return A;
  }

  const base: number = A.base;

  //If A is zero
  if(A.precision === 0){
    copy(A, B);
    return setBase(A, base);
  }

  //If signs differ
  if(A.isNegative !== B.isNegative){

    //Change sign, subtract, change sign again
    negate(A);
    subtract(A, B);
    return negate(A);
  }

  //Normalize to B's base
  setBase(A, B.base);

  //If C < B
  if(A.precision < B.precision){

    //Update C's digit array to minimum result size
    growArray(A.digits, B.precision, B.precision + 1);

    //Add
    A.precision = reverseAddition(
      A.digits, 0, A.precision,
      B.digits, 0, B.precision,
      A.base
    );

  //If A >= B
  } else {

    //Add
    A.precision = addition(
      A.digits, 0, A.precision,
      B.digits, 0, B.precision,
      A.base
    );
  }

  //Change A back to original base
  return setBase(A, base);
}

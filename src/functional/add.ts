import {Integer} from '../integer';
import {copy} from './copy';
import {double} from './double';
import {negate} from './negate';
import {setBase} from './setBase';
import {subtract} from './subtract';
import {addition} from '../algorithm/addition';
import {reverseAddition} from '../algorithm/reverseAddition';
import {growArray} from '../util/arrayUtils';
import {tryMutable} from '../util/intUtils';

export function add(A: Integer, B: Integer, isMutable?: boolean): Integer {
  A = tryMutable(A, isMutable);

  //If self
  if(A === B){
    double(A, true);
    return A;
  }

  //If B is zero
  if(B.precision === 0){
    return A;
  }

  const base: number = A.base;

  //If C is zero
  if(A.precision === 0){
    copy(A, B);
    setBase(A, base, true);
    return A;
  }

  //If signs differ
  if(A.isNegative !== B.isNegative){

    //Change sign, subtract, change sign again
    negate(A, true);
    subtract(A, B, true);
    negate(A, true);
    return A;
  }

  //Normalize to B's base
  setBase(A, B.base, true);

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
  setBase(A, base, true);
  return A;
}

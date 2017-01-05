import {Integer} from '../integer';
import {double} from './double';
import {negate} from './negate';
import {subtract} from './subtract';
import {addition} from '../algorithm/addition';
import {reverseAddition} from '../algorithm/reverseAddition';
import {changeBase, copy} from '../util/intUtils';

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
    return changeBase(A, base);
  }

  //Normalize to B's base
  changeBase(A, B.base);

  //If signs differ
  if(A.isNegative !== B.isNegative){

    //Change sign, subtract, change sign again
    negate(A);
    subtract(A, B);
    negate(A);

  //If A < B
} else if(A.precision < B.precision){

    //Make room for addition
    if(A.digits.length <= B.precision){
      A.digits.length = B.precision + 1;
    }

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
  return changeBase(A, base);
}

import {Integer} from '../integer';
import {setBase} from './setBase';
import {square} from './square';
import {karatsubaMultiplication} from '../algorithm/karatsubaMultiplication';
import {longMultiplication} from '../algorithm/longMultiplication';
import {singleDigitMultiplication} from '../algorithm/singleDigitMultiplication';
import {setZero, tryMutable} from '../util/intUtils';

export function multiply(A: Integer, B: Integer, isMutable?: boolean): Integer {

  //If self
  if(A === B){
    return square(A, isMutable);
  }

  A = tryMutable(A, isMutable);

  //If A is zero
  if(A.precision === 0){
    return A;
  }

  //If B is zero
  if(B.precision === 0){
    return setZero(A);
  }

  //Multiply signs
  A.isNegative = A.isNegative !== B.isNegative;

  //Normalize to B's base
  const base: number = A.base;
  setBase(A, B.base, true);

  //If B is single digit
  if(B.precision === 1){
    A.precision = singleDigitMultiplication(
      A.digits, 0, A.precision, B.digits[0], A.base
    );
    return setBase(A, base, true);
  }

  //If C is single digit
  if(A.precision === 1){
    const multiplicand: number = A.digits[0];
    A.digits = B.digits.slice(0, B.precision);
    A.precision = singleDigitMultiplication(
      A.digits, 0, B.precision, multiplicand, A.base
    );
    return setBase(A, base, true);
  }

  //Make minimum room for multiplication
  const maxNewLen: number = A.precision + B.precision - 1;
  if(A.digits.length < maxNewLen){
    A.digits.length = maxNewLen;
  }

  //Choose best performing algorithm
  if(A.precision < 100 && B.precision < 100){
    A.precision = longMultiplication(
      A.digits, 0, A.precision, B.digits, 0, B.precision, A.base
    );
  } else {
    A.precision = karatsubaMultiplication(
      A.digits, 0, A.precision, B.digits, 0, B.precision, A.base
    );
  }

  return setBase(A, base, true);
}

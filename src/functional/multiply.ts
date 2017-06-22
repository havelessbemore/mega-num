import {Integer} from '../integer';
import {setBase} from './setBase';
import {square} from './square';
import {double} from '../algorithm/double';
import {karatsubaMultiplication} from '../algorithm/karatsubaMultiplication';
import {longMultiplication} from '../algorithm/longMultiplication';
import {singleDigitMultiplication} from '../algorithm/singleDigitMultiplication';
import {growArray} from '../util/arrayUtils';
import {setZero} from '../util/intUtils';

export function multiply(A: Integer, B: Integer): Integer {

  //If self
  if(A === B){
    return square(A);
  }

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
  setBase(A, B.base);

  //If B is single digit
  if(B.precision === 1){
    const multiplicand: number = B.digits[0];

    //If more than doubling
    if(multiplicand > 2){
      A.precision = singleDigitMultiplication(
        A.digits, 0, A.precision, multiplicand, A.base
      );

    //If doubling
    } else if(multiplicand === 2){
      A.precision = double(A.digits, 0, A.precision, A.base);
    }

  //If A is single digit
  } else if(A.precision === 1){
    const multiplicand: number = A.digits[0];

    //Copy B to A
    A.precision = B.precision;
    A.digits = B.digits.slice(0, B.precision);

    //If more than doubling
    if(multiplicand > 2){
      A.precision = singleDigitMultiplication(
        A.digits, 0, A.precision, multiplicand, A.base
      );
    } else if(multiplicand === 2){
      A.precision = double(A.digits, 0, A.precision, A.base);
    }

  } else {

    //Make room for multiplication
    const maxNewLen: number = A.precision + B.precision;
    growArray(A.digits, maxNewLen - 1, maxNewLen);

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
  }

  return setBase(A, base);
}

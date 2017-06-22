import {Integer} from '../integer';
import {setBase} from './setBase';
import {basicDivision} from '../algorithm/basicDivision';
import {singleDigitDivision} from '../algorithm/singleDigitDivision';
import {assign, setOne, setZero} from '../util/intUtils';

export function divideAndRemainder(A: Integer, B: Integer): [Integer, Integer] {

  //If A / 0
  if(B.precision === 0){
    throw new EvalError("Divide by zero");
  }

  //If self
  if(A === B){
    return [setOne(A), setZero({base: A.base})];
  }

  //Divide signs
  A.isNegative = A.isNegative !== B.isNegative;

  //If 0 / B or B = 1
  if(A.precision === 0 || (B.precision === 1 && B.digits[0] === 1)){
    return [A, setZero({base: A.base})];
  }

  //If A = 1
  if(A.precision === 1 && A.digits[0] === 1){
    return [setZero(A), setOne({base: A.base})];
  }

  //If different bases
  const base: number = A.base;
  if(base !== B.base){

    //If A's max length in B's base < B's length
    const ratio: number = Math.log(base) / Math.log(B.base);
    if(Math.ceil(A.precision * ratio) < B.precision){
      const remainder: Integer = assign({}, A);
      return [setZero(A), remainder];
    }

    //Normalize bases
    setBase(A, B.base);
  }

  //If A's length < B's length
  if(A.precision < B.precision){
    setBase(A, base);
    const remainder: Integer = assign({}, A);
    return [setZero(A), remainder];
  }

  //Choose best algorithm
  const R: Integer = setOne({base: A.base});
  if(B.precision < 2){
    [A.precision, R.digits[0]] = singleDigitDivision(
      A.digits, 0, A.precision, B.digits[0], A.base
    );
    if(R.digits[0] === 0){
      setZero(R);
    }
  } else {
    [
      A.digits, R.digits, A.precision, R.precision
    ] = basicDivision(
      A.digits, 0, A.precision, B.digits, 0, B.precision, A.base
    );
  }

  //Return A and R
  setBase(A, base);
  setBase(R, base);
  return [A, R];
}

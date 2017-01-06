import {Integer} from '../integer';
import {basicDivision} from '../algorithm/basicDivision';
import {singleDigitDivision} from '../algorithm/singleDigitDivision';
import {assign, changeBase, setOne, setZero} from '../util/intUtils';

export function divideAndRemainder(A: Integer, B: Integer): [Integer, Integer] {

  //If A / 0
  if(B.precision === 0){
    throw new EvalError("Divide by zero");
  }

  //If self
  if(A === B){
    return [setOne(A), setZero({base: A.base})];
  }

  //If 0 / B
  if(A.precision === 0){
    return [A, setZero({base: A.base})];
  }

  //Divide signs
  A.isNegative = A.isNegative !== B.isNegative;

  //If B = 1
  if(B.precision === 1 && B.digits[0] === 1){
    return [A, setZero({base: A.base})];
  }

  //If A = 1
  if(A.precision === 1 && A.digits[0] === 1){
    return [setZero(A), setOne({base: A.base})];
  }

  //If different bases
  const base: number = A.base;
  if(base !== B.base){

    //If A's length < the least possible length of B if converted to A's base
    const ratio: number = Math.log(B.base) / Math.log(base);
    if(A.precision < Math.ceil(B.precision * ratio)){
      const remainder: Integer = assign({}, A);
      return [setZero(A), remainder];
    }

    //Normalize bases
    changeBase(A, B.base);
  }

  //If A's length < B's length
  if(A.precision < B.precision){
    changeBase(A, base);
    const remainder: Integer = assign({}, A);
    return [setZero(A), remainder];
  }

  //Choose best algorithm
  let R: Integer = setOne({base: A.base});
  if(B.precision < 2){
    let r: number;
    [A.precision, R.digits[0]] = singleDigitDivision(
      A.digits, 0, A.precision, B.digits[0], A.base
    );
    if(r === 0){
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
  changeBase(A, base);
  changeBase(R, base);
  return [A, R];
}

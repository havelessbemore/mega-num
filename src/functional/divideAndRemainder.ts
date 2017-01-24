import {Integer} from '../integer';
import {setBase} from './setBase';
import {basicDivision} from '../algorithm/basicDivision';
import {singleDigitDivision} from '../algorithm/singleDigitDivision';
import {assign, setOne, setZero, tryMutable} from '../util/intUtils';

export function divideAndRemainder(A: Integer, B: Integer, isMutable?: boolean): [Integer, Integer] {

  //If A / 0
  if(B.precision === 0){
    throw new EvalError("Divide by zero");
  }

  let C: Integer = tryMutable(A, isMutable);

  //If self
  if(A === B){
    return [setOne(C), setZero({base: C.base})];
  }

  //Divide signs
  C.isNegative = C.isNegative !== B.isNegative;

  //If 0 / B or B = 1
  if(C.precision === 0 || (B.precision === 1 && B.digits[0] === 1)){
    return [C, setZero({base: C.base})];
  }

  //If C = 1
  if(C.precision === 1 && C.digits[0] === 1){
    return [setZero(C), setOne({base: C.base})];
  }

  //If different bases
  const base: number = C.base;
  if(base !== B.base){

    //If C's max length in B's base < B's length
    const ratio: number = Math.log(base) / Math.log(B.base);
    if(Math.ceil(C.precision * ratio) < B.precision){
      const remainder: Integer = assign({}, C);
      return [setZero(C), remainder];
    }

    //Normalize bases
    setBase(C, B.base, true);
  }

  //If C's length < B's length
  if(C.precision < B.precision){
    setBase(C, base, true);
    const remainder: Integer = assign({}, C);
    return [setZero(C), remainder];
  }

  //Choose best algorithm
  let R: Integer = setOne({base: C.base});
  if(B.precision < 2){
    [C.precision, R.digits[0]] = singleDigitDivision(
      C.digits, 0, C.precision, B.digits[0], C.base
    );
    if(R.digits[0] === 0){
      setZero(R);
    }
  } else {
    [
      C.digits, R.digits, C.precision, R.precision
    ] = basicDivision(
      C.digits, 0, C.precision, B.digits, 0, B.precision, C.base
    );
  }

  //Return C and R
  setBase(C, base, true);
  setBase(R, base, true);
  return [C, R];
}

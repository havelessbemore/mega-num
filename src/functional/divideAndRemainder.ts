import {Integer} from '../integer';
import {copy} from './copy';
import {basicDivision} from '../algorithm/basicDivision';
import {singleDigitDivision} from '../algorithm/singleDigitDivision';
import {changeBase, setOne, setZero, tryMutable} from '../util/intUtils';

export function divideAndRemainder(A: Integer, B: Integer, isMutable: boolean = false): [Integer, Integer] {

  //If A / 0
  if(B.precision === 0){
    throw new EvalError("Divide by zero");
  }

  let C: Integer = tryMutable(A, isMutable);

  //If self
  if(A === B){
    return [C, setZero({base: C.base})];
  }

  //If 0 / B
  if(C.precision === 0){
    return [C, setZero({base: C.base})];
  }

  //Divide signs
  C.isNegative = C.isNegative !== B.isNegative;

  //If B = 1
  if(B.precision === 1 && B.digits[0] === 1){
    return [C, setZero({base: C.base})];
  }

  //If C = 1
  if(C.precision === 1 && C.digits[0] === 1){
    return [setZero(C), setOne({base: C.base})];
  }

  //If different bases
  const base: number = C.base;
  if(base !== B.base){

    //If C's length < the least possible length of B if converted to C's base
    const ratio: number = Math.log(B.base) / Math.log(base);
    if(C.precision < Math.ceil(B.precision * ratio)){
      const remainder: Integer = (isMutable) ? copy({}, C) : C;
      return [setZero({base: C.base}), remainder];
    }

    //Normalize bases
    changeBase(C, B.base);
  }

  //If C's length < B's length
  if(C.precision < B.precision){
    C.base = base;
    const remainder: Integer = (isMutable) ? copy({}, C) : C;
    return [setZero({base: C.base}), remainder];
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
  changeBase(C, base);
  changeBase(R, base);
  return [C, R];
}

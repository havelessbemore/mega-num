import {Integer} from '../integer';
import {setBase} from './setBase';
import {compare as _compare} from '../algorithm/compare';

export function compare(A: Integer, B: Integer): number {

  //If self
  if(A === B){
    return 0;
  }

  //Check if different signs
  if(A.isNegative !== B.isNegative){
    return (A.isNegative) ? -1 : 1;
  }

  const base: number = A.base;

  //If not same base
  if(A.base !== B.base){

    //Estimate number of digits of A if converted to B's base
    const ratio: number = Math.log(A.base) / Math.log(B.base);
    if(Math.ceil(A.precision * ratio) < B.precision){
      return -1;
    }
    if(Math.ceil((A.precision - 1) * ratio) > B.precision){
      return 1;
    }

    //Convert A to B's base
    setBase(A, B.base);
  }

  //Compare A and B
  const out: number = _compare(
    A.digits, 0, A.precision,
    B.digits, 0, B.precision
  );

  //Change A back to original base (if needed)
  setBase(A, base);

  //Return result
  return out;
}

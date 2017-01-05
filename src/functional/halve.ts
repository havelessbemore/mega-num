import {Integer} from '../integer';
import {decrement} from './decrement';
import {halve as _halve} from '../algorithm/halve';
import {setZero, setOne} from '../util/intUtils';

export function halve(A: Integer): [Integer, Integer] {
  const remainder: Integer = <Integer>{base: A.base};

  //If zero
  if(A.precision === 0){
    return [A, setZero(remainder)];
  }

  //Halve
  [A.precision, remainder.precision] = _halve(A.digits, 0, A.precision, A.base);

  //If no remainder
  if(remainder.precision === 0){
    return [A, setZero(remainder)];
  }

  //If remainder and A is negative
  if(A.isNegative){

    //Round down (e.g. Math.floor(-49.5) = -50)
    decrement(A);
  }

  return [A, setOne(remainder)];
}

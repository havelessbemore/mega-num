import {Integer} from '../integer';
import {setBase} from '../algorithm/setBase';

export function changeBase(A: Integer, base: number): Integer {
  [A.digits, A.precision] = setBase(
    A.digits, 0, A.precision, A.base, base
  );
  A.base = base;
  return A;
}

export function setOne(A: any): Integer {
  A.precision = 1;
  A.digits = [1];
  A.isNegative = false;
  return A;
}

export function setZero(A: any): Integer {
  A.precision = 0;
  A.digits = [];
  A.isNegative = false;
  return A;
}

import {Integer} from '../integer';
import {changeBase as _changeBase} from './numUtils';

export function assign(to: any, from: Integer): Integer {
  to.base = from.base;
  to.digits = from.digits;
  to.precision = from.precision;
  to.isNegative = from.isNegative;
  return to;
}

export function changeBase(A: Integer, base: number): Integer {
  if(A.base !== base){
    [A.digits, A.precision] = _changeBase(
      A.digits, 0, A.precision, A.base, base
    );
    A.base = base;
  }
  return A;
}

export function copy(to: any, from: Integer): Integer {
  assign(to, from);
  to.digits = to.digits.slice(0, to.precision);
  return to;
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

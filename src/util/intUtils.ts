import {Globals} from '../globals';
import {Integer} from '../integer';
import {setBase} from '../algorithm/setBase';

export function tryMutable(A: Integer, isMutable: boolean = Globals.DEFAULT_IS_MUTABLE): Integer {
  return (isMutable) ? A : copy({}, A);
}

export function assign(target: any, source: Integer): Integer {
  target.base = source.base;
  target.digits = source.digits;
  target.precision = source.precision;
  target.isNegative = source.isNegative;
  return target;
}

export function copy(target: any, source: Integer): Integer {
  const A: Integer = assign(target, source);
  A.digits = A.digits.slice(0, A.precision);
  return A;
}

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

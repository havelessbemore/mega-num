import {Integer} from '../integer';

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

export function toInteger(
  digits: number[],
  precision: number,
  isNegative: boolean,
  base: number
): Integer {
  return {
    base: base,
    digits: digits,
    precision: precision,
    isNegative: isNegative
  };
}

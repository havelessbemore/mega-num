import {Integer} from '../integer';
import {compare} from './compare';
import {toInteger} from './toInteger';

export function toNumber(A: Integer): number {

  // If A is too large to be represented as a number
  const B = toInteger(Number.MAX_SAFE_INTEGER, A.base);
  B.isNegative = A.isNegative;
  const comparison = A.isNegative ? compare(B, A) : compare(A, B);
  if (comparison > 0) {
    throw new RangeError("Value too large for number conversion");
  }

  // Convert A to a number
  const arr = A.digits;
  const base = A.base;
  let a = 0;
  for (let i = A.precision; i > 0; a = a * base + arr[--i]) {
  }

  // Return result
  return A.isNegative ? -a : a;
}

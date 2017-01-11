import {basicDivision} from './basicDivision';
import {karatsubaMultiplication} from './karatsubaMultiplication';
import {steinGCD} from './steinGCD';

/*
  f(A, B) = lcm(A, B)
  Overwrites A
  Asumes A > 0, B > 0
  See: https://en.wikipedia.org/wiki/Least_common_multiple
*/
export function lcm(
  A: number[], minA: number, maxA: number,
  B: number[], minB: number, maxB: number,
  base: number
): [number[], number] {

  //Copy A
  let C: number[] = A.slice(minA, maxA);
  let maxC: number = C.length;

  //Copy B
  const D: number[] = B.slice(minB, maxB);
  const maxD: number = D.length;

  //Get gcd(A, B)
  [C,,maxC] = steinGCD(C, 0, maxC, D, 0, maxD, base);
  [C,,maxC] = basicDivision(A, minA, maxA, C, 0, maxC, base);
  maxC = karatsubaMultiplication(C, 0, maxC, B, minB, maxB, base);
  return [C, maxC];
}

import {basicDivision} from './basicDivision';
import {copy} from '../util/arrayUtils';
import {karatsubaMultiplication} from './karatsubaMultiplication';
import {steinGCD} from './steinGCD';

/*
  f(A, B) = lcm(A, B)
  Overwrites A
  Asumes A > 0, B > 0
  See: https://en.wikipedia.org/wiki/Least_common_multiple
*/
export function lcm(A: number[], minA: number, maxA: number, B: number[], minB: number, maxB: number, base: number): [number[], number] {

  //Copy A
  let maxC: number = maxA - minA;
  let C: number[] = new Array(maxC);
  copy(C, 0, A, minA, maxA);

  //Copy B
  const maxD: number = maxB - minB;
  const D: number[] = new Array(maxD);
  copy(D, 0, B, minB, maxB);

  //Get gcd(A, B)
  [C,,maxC] = steinGCD(C, 0, maxC, D, 0, maxD, base);
  [C,,maxC] = basicDivision(A, minA, maxA, C, 0, maxC, base);
  maxC = karatsubaMultiplication(C, 0, maxC, B, minB, maxB, base);
  return [C, maxC];
}

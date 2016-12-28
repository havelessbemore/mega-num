import {copy} from '../util/arrayUtils';
import {halve} from './halve';
import {karatsubaSquare} from './karatsubaSquare';
import {karatsubaMultiplication} from './karatsubaMultiplication';

/*
  f(A, B) = A^B
  Overwrites A
  Assumes A > 0
  Assumes B > 0
*/
export function exponentiation(A: number[], minA: number, maxA: number, baseA: number, B: number[], minB: number, maxB: number, baseB: number): number {

  //If power is 1
  if(minB + 1 === maxB && B[minB] === 1){
    return maxA;
  }

  //Divide the power in half
  let remainder: number;
  [maxB, remainder] = halve(B, minB, maxB, baseB);

  //If no remainder
  if(remainder === 0){
    maxA = karatsubaSquare(A, minA, maxA, baseA);
    return exponentiation(A, minA, maxA, baseA, B, minB, maxB, baseB);
  }

  //If remainder
  const lenC: number = maxA - minA;
  const C: number[] = new Array(lenC);
  copy(C, 0, A, minA, maxA);
  maxA = karatsubaSquare(A, minA, maxA, baseA);
  maxA = exponentiation(A, minA, maxA, baseA, B, minB, maxB, baseB);
  return karatsubaMultiplication(A, minA, maxA, C, 0, lenC, baseA);
}

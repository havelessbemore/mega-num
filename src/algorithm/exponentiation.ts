import {halve} from './halve';
import {karatsubaSquare} from './karatsubaSquare';
import {karatsubaMultiplication} from './karatsubaMultiplication';

/*
  f(A, B) = A^B = Math.pow(A, B)
  Overwrites A
  Overwrites B
  Assumes A > 0
  Assumes B > 0
*/
export function exponentiation(A: number[], minA: number, maxA: number, baseA: number, B: number[], minB: number, maxB: number, baseB: number): number {
  let maxC: number = 1;
  const C: number[] = [1];

  //Until power is 1
  while(minB + 1 < maxB || B[minB] > 1){

    //Divide the power in half
    let remainder: number;
    [maxB, remainder] = halve(B, minB, maxB, baseB);

    //If remainder
    if(remainder > 0){
      C.length = maxC + maxA;
      maxC = karatsubaMultiplication(C, 0, maxC, A, minA, maxA, baseA);
    }

    //Square the base
    maxA = karatsubaSquare(A, minA, maxA, baseA);
  }

  if(C.length > 1){
    maxA = karatsubaMultiplication(A, minA, maxA, C, 0, maxC, baseA);
  }

  return maxA;
}

import {addition} from './addition';

/*
  f(A, B) = A + B
  Overwrites A
  Assumes
    A < B
    A and B not overlapping array segments
*/
export function reverseAddition(A: number[], minA: number, maxA: number, B: ReadonlyArray<number>, minB: number, maxB: number, base: number): number{

  //Add extra digits to A
  const newMaxB: number = minB - minA + maxA;
  for(let b: number = newMaxB; b < maxB; A[maxA++] = B[b++]){
  }

  //Do normal addition
  return addition(A, minA, maxA, B, minB, newMaxB, base);
}

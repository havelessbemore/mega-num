import {increment} from './increment';

/*
  f(A, B) = A + B
  Overwrites A
  Assumes
    A.length >= B.length
    A and B not same array or non-intersecting segments
*/
export function addition(A: number[], minA: number, maxA: number, B: ReadonlyArray<number>, minB: number, maxB: number, base: number): number{
  let carry: number = 0;

  //Add common digits
  while (minB < maxB){
    let v: number = A[minA] + B[minB++] + carry;
    if(v < base){
      carry = 0;
    } else {
      carry = 1;
      v = v - base;
    }
    A[minA++] = v;
  }

  //Return length
  return (carry > 0) ? increment(A, minA, maxA, base) : maxA;
}

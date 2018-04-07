import {decrement} from './decrement';

/*
  f(A, B) = A - B
  Assumes
     A >= B
  Note
     Overwrites A
*/
export function subtraction(
  A: number[], minA: number, maxA: number,
  B: ReadonlyArray<number>, minB: number, maxB: number,
  base: number
): number {
  let a: number = minA;
  let borrow = 0;

  //Subtract common digits
  while(minB < maxB){
    let v: number = A[a] - borrow - B[minB++];
    if(v < 0){
      borrow = 1;
      v = v + base;
    } else {
      borrow = 0;
    }
    A[a++] = v;
  }

  //Subtract borrow
  if(borrow > 0){
    return decrement(A, a, maxA, base);
  }

  //Find new length
  if(a === maxA){
    while(a-- > minA && A[a] === 0){
    }
    maxA = a + 1;
  }

  //Return length
  return maxA;
}

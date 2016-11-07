import BasicAdditionMethod from './basicAdditionMethod';

/*
  f(A, B) = A + B
  Overwrites A
  Assumes
    A < B
    A and B not same array or non-intersecting segments
*/
export default function ReverseAdditionMethod(A: Iterable<number>, minA: number, maxA: number, B: Iterable<number>, minB: number, maxB: number, base: number): number{

  //Add extra digits to A
  const newMaxB: number = minB - minA + maxA;
  for(let b: number = newMaxB; b < maxB; A[maxA++] = B[b++]){
  }

  //Do normal addition
  return BasicAdditionMethod(A, minA, maxA, B, minB, newMaxB, base);
}

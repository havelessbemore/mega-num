/*
  f(A) = A - 1
  Overwrites A
  Assumes A > 0
*/
export function decrement(A: number[], minA: number, maxA: number, base: number): number {

  //Deal with any borrows
  for(const borrow = base - 1; A[minA] === 0; A[minA++] = borrow){
  }

  //Subtract one
  A[minA] = A[minA] - 1;

  //Return length
  return (minA+1 === maxA && A[minA] === 0) ? maxA - 1 : maxA;
}

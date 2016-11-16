/*
  f(A, B) = A - B
  Overwrites A
  Assumes B > A
*/
export default function reverseSubtractionMethod(A: Iterable<number>, lenA: number, B: Iterable<number>, lenB: number, base: number): number {

  //Subtract common digits
  let i: number = 0;
  for(let borrow: number = 0; i < lenA; ++i){
    A[i] = B[i] - borrow - A[i];
    if (A[i] < 0){
      A[i] = A[i] + base;
      borrow = 1;
    } else {
      borrow = 0;
    }
  }

  //Subtract borrow and copy extra digits
  for(let j: number = base - 1; i < lenB && B[i] === 0; A[i++] = j){
  }
  for(A[i] = B[i] - 1; ++i < lenB; A[i] = B[i]){
  }

  //Return new length
  return (B[lenB - 1] === 0) ? lenB - 1: lenB;
}

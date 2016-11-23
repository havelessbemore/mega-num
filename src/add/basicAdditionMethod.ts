/*
  f(A, B) = A + B
  Overwrites A
  Assumes
    A.length >= B.length
    A and B not same array or non-intersecting segments
*/
export default function BasicAdditionMethod(A: number[], minA: number, maxA: number, B: number[], minB: number, maxB: number, base: number): number{
  let carry: number = 0;

  //Add common digits
  for(; minB < maxB; ++minA, ++minB){
    A[minA] = A[minA] + B[minB] + carry;
    if(A[minA] < base){
      carry = 0;
    } else {
      A[minA] = A[minA] - base;
      carry = 1;
    }
  }

  //Add carry
  if(carry > 0){
    for(carry = base - 1; minA < maxA && A[minA] === carry; A[minA++] = 0){
    }
    if(minA === maxA){
      A[maxA++] = 1;
    } else {
      A[minA] = A[minA] + 1;
    }
  }

  //Return length
  return maxA;
}

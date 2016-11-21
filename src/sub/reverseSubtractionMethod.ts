/*
  f(A, B) = A - B
  Overwrites A
  Assumes B > A
*/
export default function reverseSubtractionMethod(A: Iterable<number>, minA: number, maxA: number, B: Iterable<number>, minB: number, maxB: number, base: number): number {

  //Subtract common digits
  let borrow: number = 0;
  for(; minA < maxA; ++minA){
    A[minA] = B[minA] - borrow - A[minA];
    if (A[minA] < 0){
      A[minA] = A[minA] + base;
      borrow = 1;
    } else {
      borrow = 0;
    }
  }

  //Subtract borrow
  if(borrow > 0){
    for(borrow = base - 1; B[minA] === 0; A[minA++] = borrow){
    }
    A[minA] = B[minA] - 1;
    ++minA;
  }

  //Copy extra digits
  while(minA < maxB){
    A[minA] = B[minA];
    ++minA;
  }

  //Check for new length
  while(A[minA-1] === 0){
    --minA;
  }

  return minA;
}

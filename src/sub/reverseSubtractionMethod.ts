/*
  f(A, B) = A - B
  Overwrites A
  Assumes B > A
*/
export default function reverseSubtractionMethod(A: number[], minA: number, maxA: number, B: number[], minB: number, maxB: number, base: number): number {

  //Subtract common digits
  let borrow: number = 0;
  for(; minA < maxA; ++minA){
    let v: number = B[minB++] - borrow - A[minA];
    if (v < 0){
      v = v + base;
      borrow = 1;
    } else {
      borrow = 0;
    }
    A[minA] = v;
  }

  //Subtract borrow
  if(borrow > 0){
    for(borrow = base - 1; B[minB] === 0; ++minB){
      A[minA++] = borrow;
    }
    A[minA++] = B[minB++] - 1;
  }

  //Copy extra digits
  if(minB < maxB){
    do {
      A[minA++] = B[minB++];
    } while (minB < maxB);

  //Check for new length
  } else {
    while(A[minA-1] === 0){
      --minA;
    }
  }

  return minA;
}

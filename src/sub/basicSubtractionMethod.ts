/*
  f(A, B) = A - B
  Assumes
     A >= B
  Note
     Overwrites A
*/
export default function BasicSubtractionMethod(A: number[], minA: number, maxA: number, B: number[], minB: number, maxB: number, base: number): number {
  let a: number = minA;
  let borrow: number = 0;

  //Subtract common digits
  for(; minB < maxB; ++a, ++minB){
    A[a] = A[a] - borrow - B[minB];
    if(A[a] < 0){
      A[a] = A[a] + base;
      borrow = 1;
    } else {
      borrow = 0;
    }
  }

  //Subtract borrow
  if(borrow > 0){
    for(borrow = base - 1; A[a] === 0; A[a++] = borrow){
    }
    A[a] = A[a] - 1;
    ++a;
  }

  //Find new length
  if(a === maxA){
    for(; maxA > minA && A[maxA-1] === 0; --maxA){
    }
  }

  //Return length
  return maxA;
}

/*
  f(A, B) = A - B
  Overwrites A
  Assumes A >= B
*/
export default function BasicSubtractionMethod(A: number[], lenA: number, B: number[], lenB: number, base: number): number {

  //Subtract common digits
  let i: number = 0;
  let borrow: number = 0;
  for(; i < lenB; ++i){
    A[i] = A[i] - borrow - B[i];
    if(A[i] < 0){
      A[i] = A[i] + base;
      borrow = 1;
    } else {
      borrow = 0;
    }
  }

  //Subtract borrow
  if(borrow > 0){
    for(borrow = base - 1; i < lenA && A[i] === 0; A[i++] = borrow){
    }
    A[i] = A[i] - 1;
  }

  //Find the new length
  if (i === lenA){
    for(; A[lenA - 1] === 0; --lenA){
    }
  }

  return lenA;
}

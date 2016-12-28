/*
  f(A, B) = A / B
  Overwrites A
  Assumes B > 0
  Assumes A > 0
  Assumes no leading zeros
*/
export function singleDigitDivision(A: number[], minA: number, maxA: number, B: number, base: number): [number[], number[], number, number] {

  let remainder: number = 0;
  for(let a: number = maxA; a-- > minA; A[a] = 0 | (A[a] / B)){
    A[a] = A[a] + remainder * base;
    remainder = A[a] % B;
  }

  //Get new length
  if(A[maxA - 1] === 0){
    --maxA;
  }

  return [A, [remainder], maxA, remainder === 0 ? 0 : 1];
}

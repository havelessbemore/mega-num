/*
  f(A, B) = A / B
  Overwrites A
  Assumes B > 0
  Assumes A > 0
  Assumes no leading zeros
*/
export function singleDigitDivision(A: number[], minA: number, maxA: number, B: number, base: number): [number, number] {
  let remainder: number = 0;
  for(let a: number = maxA; a-- > minA; remainder = remainder % B){
    remainder = remainder * base + A[a];
    A[a] = 0 | (remainder / B);
  }

  //Get new length
  if(A[maxA - 1] === 0){
    --maxA;
  }

  return [maxA, remainder];
}

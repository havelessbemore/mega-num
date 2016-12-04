/*
  f(A, B) = A / B
  Overwrites A
  Assumes B > 0
  Assumes A.length > 0
  Assumes no leading zeros
*/
export default function SimpleDivisionMethod(A: number[], lenA: number, B: number, base: number): [number[], number[], number, number] {

  let remainder: number = 0;
  for(let a: number = lenA; a-- > 0; A[a] = 0 | (A[a] / B)){
    A[a] = A[a] + remainder * base;
    remainder = A[a] % B;
  }

  return [A, [remainder], (A[lenA-1] === 0) ? lenA - 1 : lenA, remainder === 0 ? 0 : 1];
}

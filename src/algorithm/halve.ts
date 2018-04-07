/*
  f(A) = A / 2
  Overwrites A
  Assumes A > 0
*/
export function halve(
  A: number[], minA: number, maxA: number, base: number
): [number, number] {

  //Halve
  let remainder = 0;
  for(let i: number = maxA; i-- > minA; A[i] = A[i] >>> 1){
    A[i] = A[i] + (base & -remainder);
    remainder = A[i] & 1;
  }

  //Get new length
  if(A[maxA - 1] === 0){
    --maxA;
  }

  return [maxA, remainder];
}

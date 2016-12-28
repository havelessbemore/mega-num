/*
  f(A) = A + 1
  Overwrites A
  Assumes A >= 0
*/

export function increment(A: number[], minA: number, maxA: number, base: number): number {

  //Deal with any carries
  for(--base; minA < maxA && A[minA] === base; A[minA++] = 0){
  }

  //Add one
  if(minA === maxA){
    A[maxA++] = 1;
  } else {
    A[minA] = A[minA] + 1;
  }

  //Return length
  return maxA;
}

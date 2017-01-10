//Assumes valid inputs
//Assumes numbers are in same base
export function compare(A: ReadonlyArray<number>, minA: number, maxA: number, B: ReadonlyArray<number>, minB: number, maxB: number): number {

  //Compare number of digits
  const d: number = maxA - minA - maxB + minB;
  if(d !== 0){
    return d < 0 ? -1 : 1;
  }

  //Compare digits
  while(maxA > minA){
    if(A[--maxA] !== B[--maxB]){
      return A[maxA] < B[maxB] ? -1 : 1;
    }
  }

  //Numbers are equal
  return 0;
}

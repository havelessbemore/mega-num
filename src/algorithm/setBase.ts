//Assumes valid inputs
export function setBase(A: number[], minA: number, maxA: number, curBase: number, newBase: number): [number[], number] {

  //If zero or same base
  if(maxA === minA || curBase === newBase){
    return [A, maxA];
  }

  //Create new array
  let maxB: number = 0;
  const B: number[] = new Array(Math.ceil(
    (maxA - minA) * Math.log(curBase) / Math.log(newBase)
  ));

  //Return number in newBase
  do {
    let remainder: number = 0;
    for(let i: number = maxA; i > minA; remainder = remainder % newBase){
      remainder = remainder*curBase + A[--i];
      A[i] = 0 | (remainder / newBase);
    }
    B[maxB++] = remainder;
    while(A[maxA - 1] === 0){
      if(--maxA === minA){
        return [B, maxB];
      }
    }
  } while(true);
}

/*
  f(A) = A / 2
  Overwrites A
*/
export default function basicHalfMethod(A: number[], minA: number, maxA: number, base: number, isNegative: boolean): [number, number] {

  //Halve
  let remainder: number = 0;
  for(let i: number = maxA; i-- > minA; A[i] = A[i] >>> 1){
    A[i] = A[i] + (base & -remainder);
    remainder = A[i] & 1;
  }

  //If there is a remainder (fraction) and number is negative
  if(remainder !== 0 && isNegative){

    //Round "up"
    //e.g. Math.floor(-99 / 2) = -50
    let i: number = 0;
    for(--base; A[i] === base; A[i++] = 0){
    }
    A[i] = A[i] + 1;
  }

  //Return new length
  return [(A[maxA - 1] === 0) ? maxA - 1 : maxA, remainder];
};

/*
  f(A) = A / 2
  Overwrites A
*/
export default function basicHalfMethod(integer: number[], len: number, base: number, isNegative: boolean){

  //Halve
  let remainder: number = 0;
  for(let i: number = len; i-- > 0; integer[i] = integer[i] >>> 1){
    integer[i] = integer[i] + remainder;
    remainder = base & -(integer[i] & 1);
  }

  //If there is a remainder (fraction) and number is negative
  if(remainder !== 0 && isNegative){

    //Round "up"
    //e.g. Math.floor(-99 / 2) = -50
    let i: number = 0;
    for(remainder = base - 1; integer[i] === remainder; integer[i++] = 0){
    }
    integer[i] = integer[i] + 1;
  }

  //Return new length
  return (integer[len - 1] === 0) ? len - 1 : len;
};

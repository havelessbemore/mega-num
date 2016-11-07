/*
  f(A) = A / 2
  Overwrites A
*/
export default function basicHalfMethod(integer: Iterable<number>, digits: number, base: number, isNegative: boolean){

  //Halve
  let remainder: number = 0;
  for(let i: number = digits; i-- > 0; integer[i] = integer[i] >> 1){
    remainder = (remainder === 0) ? 0 : base;
    integer[i] = integer[i] + remainder;
    remainder = integer[i] & 1;
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
  return (integer[digits - 1] === 0) ? digits - 1 : digits;
};

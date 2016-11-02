/*
f(A) = A + A
Overwrites A
*/
export default function basicDoubleMethod(integer: number[], digits: number, base: number): number {
  let carry: number = 0;

  //Double
  for(let i: number = 0; i < digits; ++i){
    integer[i] = (integer[i] << 1) + carry;
    if(integer[i] < base){
      carry = 0;
    } else {
      carry = 1;
      integer[i] = integer[i] - base;
    }
  }

  //Add carry
  if (carry > 0){
    integer[digits++] = 1;
  }

  //Return new length
  return digits;
}

/*
  f(A,B) = A*B
  Overwrites A
  Assumes B > 0
*/
export function singleDigitMultiplication(A: number[], minA: number, maxA: number, multiplier: number, base: number): number {

  //Multiply multiplicand by multiplier
  let carry: number = 0;
  while(minA < maxA){
    let v: number = (A[minA] * multiplier) + carry;
    if(v < base){
      carry = 0;
    } else {
      carry = 0 | (v / base);
      v = v % base;
    }
    A[minA++] = v;
  }

  //Add remaining carry
  if(carry > 0){
    A[minA++] = carry;
  }

  //Return length
  return minA;
}

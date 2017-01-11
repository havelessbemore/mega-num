/*
f(A) = A + A
Overwrites A
*/
export function double(
  A: number[], minA: number, maxA: number, base: number
): number {

  //Double
  let carry: number = 0;
  while(minA < maxA){
    let v: number = (A[minA] << 1) + carry;
    if(v < base){
      carry = 0;
    } else {
      carry = 1;
      v = v - base;
    }
    A[minA++] = v;
  }

  //Add carry
  if (carry > 0){
    A[minA++] = 1;
  }

  //Return length
  return minA;
}

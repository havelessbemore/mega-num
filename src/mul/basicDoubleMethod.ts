/*
f(A) = A + A
Overwrites A
*/
export default function basicDoubleMethod(A: number[], len: number, base: number): number {
  let carry: number = 0;

  //Double
  for(let i: number = 0; i < len; ++i){
    A[i] = (A[i] << 1) + carry;
    if(A[i] < base){
      carry = 0;
    } else {
      carry = 1;
      A[i] = A[i] - base;
    }
  }

  //Add carry
  if (carry > 0){
    A[len++] = 1;
  }

  //Return length
  return len;
}

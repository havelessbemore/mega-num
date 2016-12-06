export default function SimpleMultiplicationMethod(A: number[], minA: number, maxA: number, multiplier: number, base: number, B: number[] = A, minB: number = minA): number {

  //Multiply multiplicand by multiplier
  let carry: number = 0;
  while(minA < maxA){
    let v: number = (A[minA++] * multiplier) + carry;
    if(v < base){
      carry = 0;
    } else {
      carry = 0 | (v / base);
      v = v % base;
    }
    B[minB++] = v;
  }

  //Add remaining carry
  if(carry > 0){
    B[minB++] = carry;
  }

  //Return length
  return minB;
}

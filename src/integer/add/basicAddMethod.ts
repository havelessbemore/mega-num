/*
f(A, B) = A + B
Overwrites A
*/
export default function BasicAddMethod(A: number[], lenA: number, B: number[], lenB: number, base: number): number {
  let minLen: number = lenB;

  //Add extra digits to A
  if (lenA < lenB){
    minLen = lenA;
    do {
      A[lenA] = B[lenA];
    } while (++lenA < lenB);
  }

  //Add common digits
  let i: number;
  let carry: number = 0;
  for(i = 0; i < minLen; ++i){
    A[i] = A[i] + B[i] + carry;
    if (A[i] < base){
      carry = 0;
    } else {
      carry = 1;
      A[i] = A[i] - base;
    }
  }

  //Add carries
  if (carry > 0){
    for (carry = base - 1; i < lenA && A[i] === carry; A[i++] = 0){
    }
    A[i] = (0 | A[i]) + 1;
    ++i;
  }

  //Return length
  return (i < lenA) ? lenA : i;
}

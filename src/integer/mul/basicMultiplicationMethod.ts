/*
  f(A, B) = A * B
  Overwrites A
  Assumes A and B are not the same array


  Explanation:
      a  b  c  _  _  _
    *
      d  e  f
    ------------------
              cd ce cf
           bd be bf
        ad ae af
    ------------------
      g  h  i  j  k  l

*/
export default function BasicMultiplicationMethod(A: number[], lenA: number, B: number[], lenB: number, base: number): number {
  let lenC: number = lenA + lenB;

  //Shift A to the left
  for(let i: number = lenA - lenB, j: number = lenA; i < lenA; A[j++] = A[i++]){
  }
  for(let i: number = 0, j: number = lenB; j < lenA; A[j++] = A[i++]){
  }

  //Zero original A
  for(let i: number = 0; i < lenB; A[i++] = 0){
  }

  //For each digit in multiplicand
  for(let a: number = lenB; a < lenC; ++a){
    let carry: number = 0;
    let i: number = a - lenB;

    //Multiply by multiplier
    for(let b: number = 0; b < lenB; ++b){
      let result: number = A[a] * B[b] + A[i] + carry;
      if(result < base){
        carry = 0;
      } else {
        carry = 0 | (result / base);
        result = result % base;
      }
      A[i++] = result;
    }

    //Add remaining carry
    A[i] = carry;
  }

  //Return new length
  return (A[lenC - 1] === 0) ? lenC - 1 : lenC;
}

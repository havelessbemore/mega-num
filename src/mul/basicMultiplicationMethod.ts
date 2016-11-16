//import {print} from '../util';
/*
  f(A, B) = A * B
  Overwrites A
  Assumes A > 0 and B > 0
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
export default function BasicMultiplicationMethod(A: Iterable<number>, lenA: number, B: Iterable<number>, lenB: number, base: number): number {
  const lenC: number = lenA + lenB;
  //console.log("A: ", print(A, 0, lenA), "B: ", print(B, 0, lenB));

  //Shift A to the left
  for(let a: number = lenA, c: number = lenC; a > 0; A[--c] = A[--a]){
  }
  for(let i: number = 0; i < lenB; A[i++] = 0){
  }
  //console.log("Shift A: ", print(A, 0, lenC));

  //For each digit in multiplicand
  for(let a: number = lenB; a < lenC; ++a){
    //console.log(A[a] + "*" + print(B, 0, lenB) + ": ");
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
    //console.log(print(A, 0, i+1, i+1, lenC));
  }

  //Return new length
  return (A[lenC - 1] === 0) ? lenC - 1 : lenC;
  //console.log("Out: ", print(A, 0, lenC), "" + lenC);
}

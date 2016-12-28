import {set} from '../util/arrayUtils';
import {safeShiftUp} from '../util/arrayUtils';

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
export function basicMultiplication(A: number[], lenA: number, B: number[], lenB: number, base: number): number {

  //Shift A to the left
  safeShiftUp(A, 0, lenA, lenB);
  set(A, 0, lenB, 0);

  //For each digit in multiplicand
  const lenC: number = lenA + lenB;
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

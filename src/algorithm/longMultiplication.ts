import {safeShiftUp} from '../util/arrayUtils';
import {zero} from '../util/numUtils';

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
export function longMultiplication(A: number[], minA: number, maxA: number, B: ReadonlyArray<number>, minB: number, maxB: number, base: number): number {

  //Shift A to the left
  const lenB: number = maxB - minB;
  const minC: number = minA + lenB;
  safeShiftUp(A, minA, maxA, lenB);
  zero(A, minA, minC);

  //For each digit in multiplicand
  const maxC: number = maxA + lenB;
  for(let a: number = minC; a < maxC; ++a){
    let carry: number = 0;
    let i: number = a - lenB;

    //Multiply by multiplier
    for(let b: number = minB; b < maxB; ++b){
      let v: number = A[a] * B[b] + A[i] + carry;
      if(v < base){
        carry = 0;
      } else {
        carry = 0 | (v / base);
        v = v % base;
      }
      A[i++] = v;
    }

    //Add remaining carry
    A[i] = carry;
  }

  //Return new length
  return (A[maxC - 1] === 0) ? maxC - 1 : maxC;
}

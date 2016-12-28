import {set} from '../util/arrayUtils';
import {unsafeShiftUp} from '../util/arrayUtils';

/*
  f(A) = A * A
  Overwrites A

  Explanation:
      a   b   c   d   e   f   g   _   _   _   _   _   _   _
    *
      a   b   c   d   e   f   g
    -------------------------------------------------------
                                 ag  bg  cg  dg  eg  fg  gg
                             af  bf  cf  df  ef  ff  fg
                         ae  be  ce  de  ee  ef  eg
                     ad  bd  cd  dd  de  df  dg
                 ac  bc  cc  cd  ce  cf  cg
             ab  bb  bc  bd  be  bf  bg
         aa  ab  ac  ad  ae  af  ag
    -------------------------------------------------------
                                2ag 2bg 2cg 2dg 2eg 2fg  gg
                            2af 2bf 2cf 2df 2ef  ff
                        2ae 2be 2ce 2de  ee
                    2ad 2bd 2cd  dd
                2ac 2bc  cc
            2ab  bb
         aa
    -------------------------------------------------------
      h   i   j   k   l   m   n   o   p   q   r   s   t   u
*/
export function longSquare(A: number[], min: number, max: number, base: number): number {

  //Move digits to the left
  let newMax: number = max - min;
  unsafeShiftUp(A, min, max, newMax);
  set(A, min, max, 0);

  //For every digit
  newMax = newMax + max;
  for(let d: number = min, s: number = max; d < newMax; d = d + 2){
    const digit: number = A[s++];

    //Square the digit
    let carry: number = 0;
    A[d] = A[d] + digit * digit;
    if(A[d] >= base){
      carry = 0 | (A[d] / base);
      A[d] = A[d] % base;
    }

    //Multiply by higher digits twice
    let o: number = d + 1;
    for(let m: number = s; m < newMax; ++o){

      //Multiply
      let quotient: number = 0;
      let product: number = A[m++] * digit;
      if(product >= base){
        quotient = 0 | (product / base);
        product = product % base;
      }

      //Double
      quotient = quotient << 1;
      product = product << 1;

      //Add
      A[o] = A[o] + product + carry;
      carry = quotient;
      if(A[o] >= base){
        carry = carry + (0 | (A[o] / base));
        A[o] = A[o] % base;
      }
    }

    //Place remaining carry
    A[o] = carry;
  }

  //Return new length
  return A[newMax - 1] === 0 ? newMax - 1 : newMax;
}

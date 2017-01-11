import {compare} from './compare';
import {double} from './double';
import {halve} from './halve';
import {isEven} from './isEven';
import {subtraction} from './subtraction';

/*
f(A, B) = GCD(A, B)
Overwrites A, B
Expects A > 0, B > 0
//Assumes A != B
See: https://en.wikipedia.org/wiki/Binary_GCD_algorithm
*/
export function steinGCD(
  A: number[], minA: number, maxA: number,
  B: number[], minB: number, maxB: number,
  base: number
): [number[], number, number] {

  //Count and remove common factors of 2
  let shifts: number = 0;
  while(isEven(A, minA, maxA, base) && isEven(B, minB, maxB, base)){
    [maxA] = halve(A, minA, maxA, base);
    [maxB] = halve(B, minB, maxB, base);
    ++shifts;
  }

  //Remove extra factors of 2 in A
  while(isEven(A, minA, maxA, base)){
    [maxA] = halve(A, minA, maxA, base);
  }

  //Remove extra factors of 2 in B
  while(isEven(B, minB, maxB, base)){
    [maxB] = halve(B, minB, maxB, base);
  }

  //A will always be odd from now on
  //While A != B
  let c: number;
  while((c = compare(A, minA, maxA, B, minB, maxB)) !== 0){

    //Switch A and B iff A > B
    if(c > 0){
      const C: number[] = A;
      A = B;
      B = C;
      c = minA;
      minA = minB;
      minB = c;
      c = maxA;
      maxA = maxB;
      maxB = c;
    }

    //B = B - A
    maxB = subtraction(B, minB, maxB, A, minA, maxA, base);

    //B is now even so halve it at least once
    do {
      [maxB] = halve(B, minB, maxB, base);
    } while (isEven(B, minB, maxB, base));
  }

  //Restore common factors of 2 (A = A << shifts)
  while(shifts-- > 0){
    maxA = double(A, minA, maxA, base);
  }

  return [A, minA, maxA];
}

import {double} from './double';
import {halve} from './halve';
import {subtraction} from './subtraction';
import {compare, isEven} from '../util/numUtils';

/*
f(A, B) = GCD(A, B)
Overwrites A, B
Expects A > 0, B > 0
See: https://en.wikipedia.org/wiki/Binary_GCD_algorithm
*/
export function steinGCD(A: number[], minA: number, maxA: number, B: number[], minB: number, maxB: number, base: number): [number[], number, number] {

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

  //While B !== A
  do {

    //Remove extra factors of 2 in B
    while(isEven(B, minB, maxB, base)){
      [maxB] = halve(B, minB, maxB, base);
    }

    //Compare A and B
    let c: number = compare(A, minA, maxA, B, minB, maxB);

    //End loop iff B - A === 0
    if(c === 0){
      break;
    }

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
  } while (true);

  //Restore common factors of 2 (A = A << shifts)
  while(shifts-- > 0){
    maxA = double(A, minA, maxA, base);
  }

  return [A, minA, maxA];
}

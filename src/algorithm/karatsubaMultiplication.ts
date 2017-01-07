import {addition} from './addition';
import {reverseAddition} from './reverseAddition';
import {subtraction} from './subtraction';
import {min, max} from '../util/numUtils';
import {copy, set, unsafeShiftUp} from '../util/arrayUtils';

/*
  f(A) = A * B
  Overwrites A
  Assumes A > 0 and B > 0
  Assumes A and B are not the same array
  Explanation: https://en.wikipedia.org/wiki/Karatsuba_algorithm
*/
export function karatsubaMultiplication(A: number[], minA: number, maxA: number, B: number[], minB: number, maxB: number, base: number): number {
  let halfLen: number = max(maxA - minA, maxB - minB);

  //Base case
  if(halfLen < 2){
    halfLen = A[minA] * B[minB];
    if(halfLen < base){
      A[maxA] = 0;
    } else {
      A[maxA++] = 0 | (halfLen / base);
      halfLen = halfLen % base;
    }
    A[minA] = halfLen;
    return maxA;
  }

  //Split the numbers in half
  halfLen = (halfLen + 1) >>> 1;
  const halfA: number = minA + halfLen;
  const midA: number = min(halfA, maxA);
  const midB: number = min(minB + halfLen, maxB);

  //mediumB = lowB + highB
  const mediumB: number[] = new Array(midB - minB + 1);
  copy(mediumB, 0, B, minB, midB);
  const mediumMaxB: number = addition(mediumB, 0, midB - minB, B, midB, maxB, base);

  //medium = lowA + highA
  const medium: number[] = new Array(midA - minA + 1 + mediumMaxB);
  copy(medium, 0, A, minA, midA);
  let mediumMax: number = addition(medium, 0, midA - minA, A, midA, maxA, base);

  //medium = medium * mediumB
  mediumMax = karatsubaMultiplication(medium, 0, mediumMax, mediumB, 0, mediumMaxB, base);

  //Shift highA left
  A[maxA] = 0;
  unsafeShiftUp(A, midA, maxA, halfLen);

  //lowA = lowA * lowB
  const lowMax: number = karatsubaMultiplication(A, minA, midA, B, minB, midB, base);

  //medium = medium - lowA
  mediumMax = subtraction(medium, 0, mediumMax, A, minA, lowMax, base);

  //A = medium*(base^halfLen) + lowA
  if(midA === maxA || midB === maxB){
    if(lowMax <= halfA){
      maxA = halfA + mediumMax;
      set(A, lowMax, halfA, 0);
      copy(A, halfA, medium, 0, mediumMax);
    } else if(mediumMax > lowMax - halfA){
      maxA = reverseAddition(A, halfA, lowMax, medium, 0, mediumMax, base);
    } else {
      maxA = addition(A, halfA, lowMax, medium, 0, mediumMax, base);
    }
    return maxA;
  }

  //Fill unused space with zero
  set(A, lowMax, maxA, 0);

  //highA = highA * highB
  const highMin: number = midA + halfLen;
  maxA = karatsubaMultiplication(A, highMin, maxA + halfLen, B, midB, maxB, base);

  //medium = medium - highA
  mediumMax = subtraction(medium, 0, mediumMax, A, highMin, maxA, base);

  //A = highA*(base^len) + medium*(base^halfLen) + lowA
  maxA = addition(A, halfA, maxA, medium, 0, mediumMax, base);
  return maxA;
}

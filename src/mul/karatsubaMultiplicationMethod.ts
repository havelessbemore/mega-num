import {min, max, zero} from '../util/numUtils';
import {basicShiftUp, copy} from '../util/arrayUtils';
import ReverseAdditionMethod from '../add/reverseAdditionMethod';
import BasicAdditionMethod from '../add/basicAdditionMethod';
import BasicSubtractionMethod from '../sub/basicSubtractionMethod';

/*
  f(A) = A * B
  Overwrites A
  Assumes A > 0 and B > 0
  Assumes A and B are not the same array
  Explanation: https://en.wikipedia.org/wiki/Karatsuba_algorithm
*/
export default function KaratsubaMultiplicationMethod(A: number[], lenA: number, B: number[], lenB: number, base: number): number {
  return multiply(A, 0, lenA, B, 0, lenB, base);
}

function multiply(A: number[], minA: number, maxA: number, B: number[], minB: number, maxB: number, base: number): number {
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
  const mediumMaxB: number = BasicAdditionMethod(mediumB, 0, midB - minB, B, midB, maxB, base);

  //medium = lowA + highA
  const medium: number[] = new Array(midA - minA + 1 + mediumMaxB);
  copy(medium, 0, A, minA, midA);
  let mediumMax: number = BasicAdditionMethod(medium, 0, midA - minA, A, midA, maxA, base);

  //medium = medium * mediumB
  mediumMax = multiply(medium, 0, mediumMax, mediumB, 0, mediumMaxB, base);

  //Shift highA left
  A[maxA] = 0;
  basicShiftUp(A, midA, maxA, halfLen);

  //lowA = lowA * lowB
  const lowMax: number = multiply(A, minA, midA, B, minB, midB, base);

  //medium = medium - lowA
  mediumMax = BasicSubtractionMethod(medium, 0, mediumMax, A, minA, lowMax, base);

  //A = medium*(base^halfLen) + lowA
  if(midA === maxA || midB === maxB){
    return (mediumMax > lowMax - halfA) ?
      ReverseAdditionMethod(A, halfA, lowMax, medium, 0, mediumMax, base):
      BasicAdditionMethod(A, halfA, lowMax, medium, 0, mediumMax, base);
  }

  //Fill unused space with zero
  zero(A, lowMax, maxA);

  //highA = highA * highB
  const highMin: number = midA + halfLen;
  maxA = multiply(A, highMin, maxA + halfLen, B, midB, maxB, base);

  //medium = medium - highA
  mediumMax = BasicSubtractionMethod(medium, 0, mediumMax, A, highMin, maxA, base);

  //A = highA*(base^len) + medium*(base^halfLen) + lowA
  return BasicAdditionMethod(A, halfA, maxA, medium, 0, mediumMax, base);
}

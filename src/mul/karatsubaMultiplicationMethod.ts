import {basicShiftUp, copy, zero} from '../util';
import BasicAdditionMethod from '../add/basicAdditionMethod';
import BasicSubtractionMethod from '../sub/basicSubtractionMethod';
/*
  f(A) = A * B
  Overwrites A
  Assumes A and B are not the same array

  Explanation: https://en.wikipedia.org/wiki/Karatsuba_algorithm
*/
export default function KaratsubaMultiplicationMethod(A: Iterable<number>, lenA: number, B: Iterable<number>, lenB: number, base: number): number {
  let maxLen: number = lenA < lenB ? lenB : lenA;
  zero(A, lenA, maxLen);
  zero(B, lenB, maxLen);
  multiply(A, 0, maxLen, B, 0, maxLen, base);
  for(maxLen = lenA + lenB; A[maxLen - 1] === 0; --maxLen){
  }
  return maxLen;
}

function multiply(A: Iterable<number>, minA: number, maxA: number, B: Iterable<number>, minB: number, maxB: number, base: number): number {
  //console.log("A: ", print(A, minA, maxA), "B: ", print(B, minB, maxB));
  let halfLen: number = maxA - minA;

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
  const midA: number = minA + halfLen;
  const midB: number = minB + halfLen;

  //medium = lowA + highA
  const medium: Iterable<number> = new Array(2*halfLen + 2);
  copy(medium, 0, A, minA, midA);
  //console.log("medium = lowA: ", print(medium, 0, halfLen));
  let mediumMax: number = BasicAdditionMethod(medium, 0, halfLen, A, midA, maxA, base);
  //console.log("medium += highA: ", print(medium, 0, mediumMax));

  //mediumB = lowB + highB
  const mediumB: Iterable<number> = new Array(2*halfLen + 2);
  copy(mediumB, 0, B, minB, midB);
  //console.log("mediumB = lowB: ", print(mediumB, 0, halfLen));
  let mediumMaxB: number = BasicAdditionMethod(mediumB, 0, halfLen, B, midB, maxB, base);
  //console.log("mediumB += highB: ", print(mediumB, 0, mediumMaxB));

  //Normalize
  if(mediumMax < mediumMaxB){
    medium[mediumMax++] = 0;
  } else if(mediumMaxB < mediumMax){
    mediumB[mediumMaxB++] = 0;
  }
  //console.log("Normalized: ", print(medium, 0, mediumMax), print(mediumB, 0, mediumMaxB));

  //Shift highA left
  A[maxA] = 0;
  basicShiftUp(A, midA, maxA, halfLen);
  //console.log("Shift Up: ", print(A, minA, midA, maxA, maxA + halfLen));

  //lowA * lowA
  //console.group("lowA = lowA * lowB: ");
  let lowMax: number = multiply(A, minA, midA, B, minB, midB, base);
  //console.groupEnd(); //console.log("lowA = lowA * lowB: ", print(A, minA, lowMax));

  //Fill unused space with zero
  const highMin: number = midA + halfLen;
  zero(A, lowMax, highMin);

  //highA * highB
  //console.group("highA = highA * highB: ");
  maxA = multiply(A, highMin, maxA + halfLen, B, midB, maxB, base);
  //console.groupEnd(); //console.log("highA = highA * highB: ", print(A, highMin, maxA));

  //medium = (medium * mediumB)
  //console.group("medium = medium * mediumB: ");
  mediumMax = multiply(medium, 0, mediumMax, mediumB, 0, mediumMaxB, base);
  //console.groupEnd(); //console.log("medium = medium * mediumB: ", print(medium, 0, mediumMax));

  //medium = medium - (lowA * lowB) - (highA * highB)
  mediumMax = BasicSubtractionMethod(medium, 0, mediumMax, A, minA, lowMax, base);
  //console.log("medium = medium - lowA * lowB: ", print(medium, 0, mediumMax));
  mediumMax = BasicSubtractionMethod(medium, 0, mediumMax, A, highMin, maxA, base);
  //console.log("medium = medium - highA * highB: ", print(medium, 0, mediumMax));

  //A = high*(base^len) + medium*(base^halfLen) + low
  //console.log("A: ", print(A, minA, lowMax, highMin, maxA));
  maxA = BasicAdditionMethod(A, midA, maxA, medium, 0, mediumMax, base);
  //console.log("A = A + medium*(base^halfLen): ", print(A, minA, maxA));

  //Ignore leading zeros
  for(; maxA > minA && A[maxA-1] === 0; --maxA){
  }
  //console.log("Out: ", print(A, minA, maxA));

  //Return length
  return maxA;
}

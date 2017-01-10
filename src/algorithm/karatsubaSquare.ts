import {addition} from './addition';
import {subtraction} from './subtraction';
import {copy, unsafeShiftUp} from '../util/arrayUtils';
import {zero} from '../util/numUtils';

/*
  f(A) = A * A
  Overwrites A
  Assumes A > 0
  See: https://en.wikipedia.org/wiki/Karatsuba_algorithm
*/
export function karatsubaSquare(A: number[], min: number, max: number, base: number): number {
  let halfLen: number = max - min;

  //Base case
  if(halfLen < 2){
    halfLen = A[min] * A[min];
    if(halfLen < base){
      A[max] = 0;
    } else {
      A[max++] = 0 | (halfLen / base);
      halfLen = halfLen % base;
    }
    A[min] = halfLen;
    return max;
  }

  //Split the number in half
  halfLen = (halfLen + 1) >>> 1;
  const mid: number = min + halfLen;

  //medium = low + high
  const medium: number[] = new Array(2*halfLen + 2);
  copy(medium, 0, A, min, mid);
  let mediumMax: number = addition(medium, 0, halfLen, A, mid, max, base);

  //Shift high left
  A[max] = 0;
  unsafeShiftUp(A, mid, max, halfLen);

  //low * low
  const lowMax: number = karatsubaSquare(A, min, mid, base);

  //Fill unused space with zero
  zero(A, lowMax, max);

  //high * high
  const highMin = mid + halfLen;
  max = karatsubaSquare(A, highMin, max + halfLen, base);

  //medium = medium * medium - low - high
  mediumMax = karatsubaSquare(medium, 0, mediumMax, base);
  mediumMax = subtraction(medium, 0, mediumMax, A, min, lowMax, base);
  mediumMax = subtraction(medium, 0, mediumMax, A, highMin, max, base);

  //A = high*(base^len) + medium*(base ^ halfLen) + low
  return addition(A, mid, max, medium, 0, mediumMax, base);
}

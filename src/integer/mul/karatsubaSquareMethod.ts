import {basicShiftUp, copy, zero} from '../util';
import BasicAdditionMethod from '../add/basicAdditionMethod';
import BasicSubtractionMethod from '../sub/basicSubtractionMethod';

/*
  f(A) = A * A
  Overwrites A

  Explanation: https://en.wikipedia.org/wiki/Karatsuba_algorithm

  Performance Test:
  !function(){console.clear(); let a = (new BigNum.BigInteger(7654321)).mSetBase(10000000); let t0 = performance.now(); for(let i = 16; i > 0; --i){a.mSquare();} let t1 = performance.now(); console.log(a.integer, t1 - t0);}();
  Optimization Progress: 48520ms -> 6950ms -> 4ms ->
*/
export default function KaratsubaSquareMethod(A: Iterable<number>, len: number, base: number): number {
  A[len] = 0;
  return square(A, 0, len, base);
}

function square(A: Iterable<number>, min: number, max: number, base: number): number {
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
  halfLen = (halfLen + (halfLen & 1)) / 2;
  const mid: number = min + halfLen;

  //medium = low + high
  const medium: Iterable<number> = new Array(2*halfLen + 2);
  copy(medium, 0, A, min, mid);
  let mediumMax: number = BasicAdditionMethod(medium, 0, halfLen, A, mid, max, base);

  //Shift high left
  basicShiftUp(A, mid, max, halfLen);

  //low * low
  const lowMax: number = square(A, min, mid, base);

  const highMin = mid + halfLen;
  zero(A, lowMax, highMin);

  //high * high
  max = square(A, highMin, max + halfLen, base);

  //medium = medium * medium - low - high
  medium[mediumMax] = 0;
  mediumMax = square(medium, 0, mediumMax, base);
  mediumMax = BasicSubtractionMethod(medium, 0, mediumMax, A, min, lowMax, base);
  mediumMax = BasicSubtractionMethod(medium, 0, mediumMax, A, highMin, max, base);

  //A = high*(base^len) + medium*(base ^ halfLen) + low
  return BasicAdditionMethod(A, mid, max, medium, 0, mediumMax, base);
}

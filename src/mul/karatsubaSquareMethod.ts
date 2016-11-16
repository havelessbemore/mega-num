import {basicShiftUp, copy, zero} from '../util';
import BasicAdditionMethod from '../add/basicAdditionMethod';
import BasicSubtractionMethod from '../sub/basicSubtractionMethod';
/*
  f(A) = A * A
  Overwrites A

  Assumes A > 0

  See: https://en.wikipedia.org/wiki/Karatsuba_algorithm

  Performance Test:
  !function(){console.clear(); let a = (new BigNum.BigInt(7654321)).mSetBase(10000000); let t0 = performance.now(); for(let i = 16; i > 0; --i){a.mSquare();} let t1 = performance.now(); console.log(a.integer, t1 - t0);}();
  Optimization Progress: 48520ms -> 6950ms -> 4s -> 3s
*/
export default function KaratsubaSquareMethod(A: Iterable<number>, len: number, base: number): number {
  return square(A, 0, len, base);
}

function square(A: Iterable<number>, min: number, max: number, base: number): number {
  let halfLen: number = max - min;
  //console.log(print(A, min, max));

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
  const medium: Iterable<number> = new Array(2*halfLen + 2);
  copy(medium, 0, A, min, mid);
  //console.log("medium = low: ", print(medium, 0, halfLen));
  let mediumMax: number = BasicAdditionMethod(medium, 0, halfLen, A, mid, max, base);
  //console.log("medium += high: ", print(medium, 0, mediumMax));

  //Shift high left
  A[max] = 0;
  basicShiftUp(A, mid, max, halfLen);
  //console.log("Shift up: ", print(A, min, mid, max, max + halfLen));

  //low * low
  //console.group("low = low*low: ");
  const lowMax: number = square(A, min, mid, base);
  //console.groupEnd(); console.log("low = low*low: ", print(A, min, lowMax));

  //Fill unused space with zero
  const highMin = mid + halfLen;
  zero(A, lowMax, highMin);

  //high * high
  //console.group("high = high*high: ");
  max = square(A, highMin, max + halfLen, base);
  //console.groupEnd(); console.log("high = high*high: ", print(A, highMin, max));

  //medium = medium * medium - low - high
  //console.group("medium = medium*medium: ");
  mediumMax = square(medium, 0, mediumMax, base);
  //console.groupEnd(); console.log("medium = medium*medium: ", print(medium, 0, mediumMax));
  mediumMax = BasicSubtractionMethod(medium, 0, mediumMax, A, min, lowMax, base);
  //console.log("medium -= low: ", print(medium, 0, mediumMax));
  mediumMax = BasicSubtractionMethod(medium, 0, mediumMax, A, highMin, max, base);
  //console.log("medium -= high: ", print(medium, 0, mediumMax));

  //A = high*(base^len) + medium*(base ^ halfLen) + low
  //console.log("A: ", print(A, min, lowMax, highMin, max));
  return BasicAdditionMethod(A, mid, max, medium, 0, mediumMax, base);
  //console.log("Out: ", print(A, min, max));
}

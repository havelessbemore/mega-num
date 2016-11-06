/*
  f(A) = A * B
  Overwrites A
  Assumes A and B are not the same array

  Explanation: https://en.wikipedia.org/wiki/Karatsuba_algorithm

  Performance Test:
  !function(){console.clear(); let a = (new BigNum.BigInteger(1234567)).mSetBase(10000000); let b = a.clone(); let t0 = performance.now(); for(let i = 1024; i > 0; --i){a.mMultiply(b);} let t1 = performance.now(); console.log(a.integer, t1 - t0);}();
  Optimization Progress:
*/
export default function KaratsubaMultiplicationMethod(A: number[], lenA: number, B: number[], lenB: number, base: number): number {
  //A[len] = 0;
  return multiply(A, 0, lenA, B, 0, lenB, base);
}

function multiply(A: number[], minA: number, maxA: number, B: number[], minB: number, maxB: number, base: number): number {
  /*let halfLen: number = max - min;

  //Base case
  if(halfLen < 2){
    A[min] = A[min] * A[min];
    if(A[min] < base){
      A[max] = 0;
    } else {
      A[max++] = 0 | (A[min] / base);
      A[min] = A[min] % base;
    }
    return max;
  }

  //Split the number in half
  halfLen = (halfLen + 1) >> 1;
  const mid: number = min + halfLen;

  //medium = low + high
  const medium: number[] = A.slice(min, mid);
  let mediumMax: number = add(medium, 0, medium.length, A, mid, max, base);

  //Shift high left
  shift(A, mid, max, halfLen);

  //high * high
  const highMin = mid + halfLen;
  max = multiply(A, highMin, max + halfLen, base);

  //low * low
  const lowMax: number = multiply(A, min, mid, base);
  zero(A, lowMax, highMin);

  //medium = medium * medium - high - low
  medium[mediumMax] = 0;
  mediumMax = multiply(medium, 0, mediumMax, base);
  mediumMax = sub(medium, 0, mediumMax, A, min, lowMax, base);
  mediumMax = sub(medium, 0, mediumMax, A, highMin, max, base);

  //A = high*(base^len) + medium*(base ^ halfLen) + low
  return add(A, mid, max, medium, 0, mediumMax, base);
  */
  return null;
}

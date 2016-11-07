/*
  f(A) = A * B
  Overwrites A
  Assumes A and B are not the same array

  Explanation: https://en.wikipedia.org/wiki/Karatsuba_algorithm

  Performance Test:
  !function(){console.clear(); let a = (new BigNum.BigInteger(1234567)).mSetBase(10000000); let b = a.clone(); let t0 = performance.now(); for(let i = 1024; i > 0; --i){a.mMultiply(b);} let t1 = performance.now(); console.log(a.integer, t1 - t0);}();
  Optimization Progress:
*/
export default function KaratsubaMultiplicationMethod(A: Iterable<number>, lenA: number, B: Iterable<number>, lenB: number, base: number): number {
  //A[len] = 0;
  return multiply(A, 0, lenA, B, 0, lenB, base);
}

function multiply(A: Iterable<number>, minA: number, maxA: number, B: Iterable<number>, minB: number, maxB: number, base: number): number {
  return null;
}

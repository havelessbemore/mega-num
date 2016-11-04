/*
  f(A) = A * A
  Overwrites A

  Explanation: https://en.wikipedia.org/wiki/Karatsuba_algorithm

  !function(){console.clear(); let a = (new BigNum.BigInteger(7654321)).mSetBase(10000000); let t0 = performance.now(); for(let i = 16; i > 0; --i){a.mSquare();} let t1 = performance.now(); console.log(a.integer, t1 - t0);}();
  Optimization Progress: 48520ms -> 6950ms
*/
export default function KaratsubaSquareMethod(A: number[], len: number, base: number): number {
  A[len] = 0;
  return square(A, 0, len, base);
}

function square(A: number[], min: number, max: number, base: number): number {
  let halfLen: number = max - min;

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
  max = square(A, highMin, max + halfLen, base);

  //low * low
  const lowMax: number = square(A, min, mid, base);
  zero(A, lowMax, highMin);

  //medium = medium * medium - high - low
  mediumMax = square(medium, 0, mediumMax, base);
  mediumMax = sub(medium, 0, mediumMax, A, min, lowMax, base);
  mediumMax = sub(medium, 0, mediumMax, A, highMin, max, base);

  //A = high*(base^len) + medium*(base ^ halfLen) + low
  return add(A, mid, max, medium, 0, mediumMax, base);
}

//Assumes shifts >= max - min
function shift(A: number[], min: number, max: number, shifts: number): void {
  for(let i: number = min, j: number = min + shifts; i < max; A[j++] = A[i++]){
  }
}

function zero(A: number[], min: number, max: number): void {
  for(let i = min; i < max; A[i++] = 0){
  }
}

/*
  f(A, B) = A + B
  Assumes
     A.length >= B.length
     A and B not same array
  Note
     Overwrites A
*/
function add(A: number[], minA: number, maxA: number, B: number[], minB: number, maxB: number, base: number): number{
  let a: number = minA;
  let carry: number = 0;

  //Add common digits
  for(let b: number = minB; b < maxB; ++a, ++b){
    A[a] = A[a] + B[b] + carry;
    if(A[a] < base){
      carry = 0;
    } else {
      A[a] = A[a] - base;
      carry = 1;
    }
  }

  //Add carry
  if(carry > 0){
    for(carry = base - 1; a < maxA && A[a] === carry; A[a++] = 0){
    }
    if(a === maxA){
      A[maxA++] = 1;
    } else {
      A[a] = A[a] + 1;
    }
  }

  //Return length
  return maxA;
}

/*
  f(A, B) = A - B
  Assumes
     A >= B
  Note
     Overwrites A
*/
function sub(A: number[], minA: number, maxA: number, B: number[], minB: number, maxB: number, base: number): number {
  let a: number = minA;
  let borrow: number = 0;

  //Subtract common digits
  for(let b: number = minB; b < maxB; ++a, ++b){
    A[a] = A[a] - borrow - B[b];
    if(A[a] < 0){
      A[a] = A[a] + base;
      borrow = 1;
    } else {
      borrow = 0;
    }
  }

  //Subtract borrow
  if(borrow > 0){
    for(borrow = base - 1; A[a] === 0; A[a++] = borrow){
    }
    A[a] = A[a] - 1;
    ++a;
  }

  //Find new length
  if(a === maxA){
    for(; maxA > minA && A[maxA-1] === 0; --maxA){
    }
  }

  //Return length
  return maxA;
}

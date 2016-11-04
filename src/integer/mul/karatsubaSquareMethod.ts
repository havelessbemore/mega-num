/*
  f(A) = A * A
  Overwrites A

  Explanation: https://en.wikipedia.org/wiki/Karatsuba_algorithm
*/
export default function KaratsubaSquareMethod(A: number[], len: number, base: number): number {
  //console.log("Start", print(A, 0, 0, len, A.length));
  //console.log("Finish", print(A, 0, 0, len, A.length));
  return square(A, 0, len, base);
}

function square(A: number[], min: number, max: number, base: number): number {
  const len: number = max - min;

  //Base case
  if(len < 2){
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
  const halfLen: number = len >> 1;
  const mid: number = min + halfLen;
  //console.log("A: ", print(A, min, mid, max, max));

  //medium = low + high
  const medium: number[] = A.slice(mid, max);
  //console.log("medium = low: ", print(medium, 0, medium.length));
  let mediumMax: number = add(medium, 0, medium.length, A, min, mid, base);
  //console.log("medium = medium + high: ", print(medium, 0, mediumMax));

  //medium = medium * medium
  //console.group("medium = medium * medium...");
  mediumMax = square(medium, 0, mediumMax, base);
  //console.groupEnd(); console.log("medium = medium * medium: ", print(medium, 0, mediumMax), mediumMax);

  //Shift high left
  const highMin = mid + halfLen;
  shift(A, mid, max, halfLen);
  zero(A, mid, highMin);
  //console.log("high <--: ", print(A, min, highMin, max + halfLen, max + halfLen));

  //high * high
  //console.group("high = high * high...");
  max = square(A, highMin, max + halfLen, base);
  //console.groupEnd(); console.log("high = high * high: ", print(A, highMin, max));

  //low * low
  //console.group("low = low * low...");
  const lowMax: number = square(A, min, mid, base);
  //console.groupEnd(); console.log("low = low * low: ", print(A, min, lowMax));

  //medium = medium - high - low
  mediumMax = sub(medium, 0, mediumMax, A, highMin, max, base);
  //console.log("medium = medium - high: ", print(medium, 0, mediumMax), mediumMax);
  mediumMax = sub(medium, 0, mediumMax, A, min, lowMax, base);
  //console.log("medium = medium - low: ", print(medium, 0, mediumMax));

  //A = high*(base^len) + medium*(base ^ halfLen) + low
  //console.log("A: ", print(A, min, lowMax, highMin, max));
  return add(A, mid, max, medium, 0, mediumMax, base);
  //console.log("A = A + medium * (base & halfLen): ", print(A, min, mid, max, max));
}

function shift(A: number[], min: number, max: number, shifts: number): void {
  for(let c: number = max, n: number = max + shifts; c > min; A[--n] = A[--c]){
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

function print(A: number[], min: number, low: number, high?: number, max?: number): string{
  let s: string = "";
  if(high == null){
    high = max = low;
    low = min;
  }
  for(; min < low; s = " " + A[min++] + s){}
  s = " ]" + s;
  for(; min < high; s = " " + A[min++] + s){}
  s = " [" + s;
  for(; min < max; s = " " + A[min++] + s){}
  return s;
}

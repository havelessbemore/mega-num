import {compare, zero} from '../util';
//import BasicAdditionMethod from '../add/basicAdditionMethod';
import BasicSubtractionMethod from '../sub/basicSubtractionMethod';

/*
  f(A, B) = A / B
  Overwrites A
  Assumes no leading zeros
  Assumes A.length >= B.length >= 2
  See: http://cacr.uwaterloo.ca/hac/about/chap14.pdf
*/
export default function BasicDivisionMethod(A: number[], lenA: number, B: number[], lenB: number, base: number): [number[], number[], number, number] {
  return divide(A, lenA, B, lenB, base);
}

//INPUT: positive integers x = (xn ··· x1x0)b, y = (yt ··· y1y0)b with n ≥ t ≥ 1, yt != 0.
//OUTPUT: the quotient q = (qn−t ··· q1q0)b and remainder r = (rt ··· r1r0)b such that x = qy + r, 0 ≤ r < y.
function divide(X: number[], maxX: number, Y: number[], maxY: number, base: number): [number[], number[], number, number] {
  const n: number = maxX - 1;
  const t: number = maxY - 1;

  //1. Initialize the quotient
  const nMt: number = n - t;
  const Q: number[] = new Array(nMt + 1);
  zero(Q, 0, nMt);

  //2. While X ≥ Yb^(n−t)
  while(compare(X, nMt, maxX, Y, 0, maxY) >= 0){

    //Q[n−t] ← Q[n−t] + 1
    ++Q[nMt];

    //x ← x − Bb^(n−t)
    maxX = BasicSubtractionMethod(X, nMt, maxX, Y, 0, maxY, base);
  }

  //3. For i from n down to (t + 1)
  for(let i: number = n; i > t; --i){

    //3.1 If x[i] = y[t] then set q[i−t−1] ← b − 1; otherwise set q[i−t−1] ← (x[i]b + x[i−1]) / y[t]
    Q[i-t-1] = (X[i] === Y[t]) ? base - 1 : 0 | ((X[i]*base + X[i-1]) / Y[t]);

    //pre-3.2 q[i-t-1] * (y[t]b + y[t-1])
    const QY: number[] = new Array(3);
    let maxQY: number = mul(Y, t-1, 2, Q[i-t-1], QY, base);

    //3.2 While q[i−t−1] * (y[t]b + y[t−1]) > x[i]b^2 + x[i−1]b + x[i−2]
    while(compare(QY, 0, maxQY, X, i-2, i+1) > 0){

      //q[i−t−1] ← q[i−t−1] − 1
      maxQY = mul(Y, t-1, 2, --Q[i-t-1], QY, base);
    }

    //pre 3.3 q[i−t−1] * yb^(i−t−1)
    maxQY = mul(Y, 0, maxY, Q[i-t-1], QY, base);

    //3.3 x ← x − q[i−t−1]yb^(i−t−1)
    //3.4 If x < 0 then set x ← x + yb^(i−t−1) and q[i−t−1] ← q[i−t−1] − 1
    if(compare(QY, 0, maxQY, X, i-t-1, maxX) > 0){
      --Q[i-t-1];
      maxQY = BasicSubtractionMethod(QY, 0, maxQY, Y, 0, maxY, base);
    }
    maxX = BasicSubtractionMethod(X, i-t-1, maxX, QY, 0, maxQY, base);
  }

  //4. r ← x
  //5. Return(q,r)
  return [Q, X, (Q[nMt] === 0) ? nMt - 1 : nMt, maxX];
}

/*
function div(A: number[], lenA: number, divisor: number, base: number): number {

  //Check if dividing by 1
  if(divisor === 1){
    return lenA;
  }

  //Divide dividend by divisor
  for(let a: number = lenA; a > 0;){
    A[a-1] = A[a-1] + (A[a] % base) * base;
    A[a] = 0 | (A[a] / divisor);
  }

  //Return length
  return (A[lenA-1] === 0) ? lenA - 1 : lenA;
}
*/

function mul(A: number[], minA: number, lenA: number, multiplier: number, B: number[], base: number): number {

  //Check if multiplying by zero
  if(multiplier === 0){
    return 0;
  }

  //Multiply multiplicand by multiplier
  let b: number = 0;
  let carry: number = 0;
  while(b < lenA){
    B[b] = A[minA++] * multiplier + carry;
    if(B[b] < base){
      carry = 0;
    } else {
      carry = 0 | (B[b] / base);
      B[b] = B[b] % base;
    }
    ++b;
  }

  //Add remaining carry
  if(carry > 0){
    B[b++] = carry;
  }

  //Return length
  return b;
}

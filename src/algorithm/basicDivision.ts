import {singleDigitMultiplication} from './singleDigitMultiplication';
import {subtraction} from './subtraction';
import {copy, set} from '../util/arrayUtils';
import {compare} from '../util/numUtils';

/*
  f(A, B) = A / B
  Overwrites A
  Assumes no leading zeros
  Assumes A.length >= B.length >= 2
  See: http://cacr.uwaterloo.ca/hac/about/chap14.pdf
*/

//INPUT: positive integers x = (xn ··· x1x0)b, y = (yt ··· y1y0)b with n ≥ t ≥ 1, yt != 0.
//OUTPUT: the quotient q = (qn−t ··· q1q0)b and remainder r = (rt ··· r1r0)b such that x = qy + r, 0 ≤ r < y.
export function basicDivision(X: number[], minX: number, maxX: number, Y: number[], minY: number, maxY: number, base: number): [number[], number[], number, number] {

  //1. Initialize the quotient
  const lenY: number = maxY - minY;
  const nMt: number = maxX - minX - lenY;
  const Q: number[] = new Array(nMt + 1);
  set(Q, 0, nMt + 1, 0);

  //2. While X ≥ Yb^(n−t)
  let maxR: number = maxX;
  while(compare(X, minX + nMt, maxR, Y, minY, maxY) >= 0){

    //Q[n−t] ← Q[n−t] + 1
    ++Q[nMt];

    //x ← x − Bb^(n−t)
    maxR = subtraction(X, minX + nMt, maxR, Y, minY, maxY, base);
  }

  //3. For i from n down to (t + 1)
  const yt: number = Y[maxY-1];
  const ytm1: number = Y[maxY-2];
  const QY: number[] = new Array(lenY + 1);
  for(let i: number = maxX - 1, iMt: number = nMt; iMt-- > 0; --i){

    //3.1 If x[i] = y[t] then set q[i−t−1] ← b − 1; otherwise set q[i−t−1] ← (x[i]b + x[i−1]) / y[t]
    //3.2 While q[i−t−1] * (y[t]b + y[t−1]) > x[i]b^2 + x[i−1]b + x[i−2]
    Q[iMt] = divThreeHalvesByTwo(X[i], X[i-1], X[i-2], yt, ytm1, base);

    //3.3 x ← x − q[i−t−1] * yb^(i−t−1)
    //3.4 If x < 0 then set x ← x + yb^(i−t−1) and q[i−t−1] ← q[i−t−1] − 1
    let maxQY: number = 0;
    if(Q[iMt] !== 0){
      copy(QY, 0, Y, minY, maxY);
      maxQY = singleDigitMultiplication(QY, 0, lenY, Q[iMt], base);
    }
    if(compare(QY, 0, maxQY, X, minX + iMt, maxR) > 0){
      --Q[iMt];
      maxQY = subtraction(QY, 0, maxQY, Y, minY, maxY, base);
    }
    maxR = subtraction(X, minX + iMt, maxR, QY, 0, maxQY, base);

    //Get new length
    while(maxR > minX && X[maxR - 1] === 0){
      --maxR;
    }
  }

  //4. r ← x
  //5. Return(q,r)
  return [Q, X, (Q[nMt] === 0) ? nMt : nMt + 1, maxR];
}

/*
  See: http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.47.565&rep=rep1&type=pdf
*/
function divThreeHalvesByTwo(a1: number, a2: number, a3: number, b1: number, b2: number, base: number): number {
  let q: number = a1*base + a2;
  let r: number = q % b1;
  q = 0 | (q / b1);
  r = r*base - q*b2 + a3;
  if(r < 0){
    r = r + b1*base + b2;
    q = (r < 0) ? q - 2 : q - 1;
  }
  return q;
}

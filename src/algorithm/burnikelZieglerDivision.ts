/*
  f(A, B) = A / B
  Overwrites A
  Assumes no leading zeros
  Assumes A.length >= B.length >= 2
  See: http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.47.565&rep=rep1&type=pdf
*/
/*
function RecursiveDivision(digit_array A,digit_array B, integer n)
{
(19) if (n is odd or n <= DIV_LIMIT)
(20) SchoolDivision(A,B,Q,S); // base of the recursion
(21) else {
(22) Let [A1,A2,A3,A4]=A and [B1,B2]=B;
(23) [Q1,R]=DivThreeLongHalvesByTwo(A1,A2,A3,B1,B2,n/2);
(24) Let [R1,R2]=R;
(25) [Q2,S]=DivThreeLongHalvesByTwo(R1,R2,A4,B1,B2,n/2);
(26) }
(27) Return the quotient Q=[Q1,Q2] and the remainder S;
}

function DivTwoDigitsByOne(digit AH, digit AL, digit B)
{
(1) Let [a1,a2]=AH, [a3,a4]=AL, and [b1,b2]=B;
(2) [q1,R]=DivThreeHalvesByTwo(a1,a2,a3,b1,b2);
(3) Let [r1,r2]=R;
(4) [q2,S]=DivThreeHalvesByTwo(r1,r2,a4,b1,b2);
(5) Return the quotient Q=[q1,q2] and the remainder S;
}

function DivThreeHalvesByTwo(digit a1,a2,a3,b1,b2)
{
(6) Divide q = [a1,a2]/b1;
(7) Let c=[a1,a2]-q*b1;
(8) D = q*b2;
(9) Let R:=[r1,r2]=[c,a3]-D
(10) if (R<0) { // q is too large by at least one
(11) q--;
(12) R+=B;
(13) if (R<0) { // q is still too large
(14) q--;
(15) R+=B; // now R is correct
(16) }
(17) }
(18) Return the quotient q and the remainder R;
}

function DivThreeLongHalvesByTwo(digit a1,a2,a3,b1,b2)
{
(7) [Q,C]=RecursiveDivision([A1,A2],B1) ;
(8) D = q*b2;
(9) Let R:=[r1,r2]=[c,a3]-D
(10) if (R<0) { // q is too large by at least one
(11) q--;
(12) R+=B;
(13) if (R<0) { // q is still too large
(14) q--;
(15) R+=B; // now R is correct
(16) }
(17) }
(18) Return the quotient q and the remainder R;
}

function divThreeHalvesByTwo(a1: number, a2: number, a3: number, b1: number, b2: number, base: number): [number, number] {
  let q: number = a1*base + a2;
  let r: number = q % b1;
  q = 0 | (q / b1);
  r = r*base - q*b2 + a3;
  if(r < 0){
    const B: number = b1*base + b2;
    --q;
    r = r + B;
    if(r < 0){
      --q;
      r = r + B;
    }
  }
  return [q, r];
}
*/

export const CIPHER: string[] = [
  '0','1','2','3','4','5','6','7','8','9',
  'A','B','C','D','E','F','G','H','I','J',
  'K','L','M','N','O','P','Q','R','S','T',
  'U','V','W','X','Y','Z'
];

export function min(a: number, b: number): number {
  return (a > b) ? b : a;
}

export function max(a: number, b: number): number {
  return (a < b) ? b : a;
}

//Assumes valid inputs
//Assumes maxA >= minA
//Assumes maxB >= minB
//Assumes numbers are in same base
export function compare(A: number[], minA: number, maxA: number, B: number[], minB: number, maxB: number): number {

  //Compare number of digits
  const d: number = maxA - minA - maxB + minB;
  if(d !== 0){
    return d < 0 ? -1 : 1;
  }

  //Compare digits
  while(maxA > minA){
    if(A[--maxA] !== B[--maxB]){
      return A[maxA] < B[maxB] ? -1 : 1;
    }
  }

  //Numbers are equal
  return 0;
}

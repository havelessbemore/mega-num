
export const CIPHER: string[] = [
  '0','1','2','3','4','5','6','7','8','9',
  'A','B','C','D','E','F','G','H','I','J',
  'K','L','M','N','O','P','Q','R','S','T',
  'U','V','W','X','Y','Z'
];

//Assumes shifts >= max - min
export function basicShiftUp(A: Iterable<number>, min: number, max: number, shifts: number): void {
  for(let i: number = min + shifts; min < max; A[i++] = A[min++]){
  }
}

export function reverseShiftUp(A: Iterable<number>, min: number, max: number, shifts: number): void {
  for(let i: number = max + shifts; max > min; A[--i] = A[--max]){
  }
}

//Assumes shifts <= min
export function basicShiftDown(A: Iterable<number>, min: number, max: number, shifts: number): void {
  for(let i: number = min - shifts; min < max; A[i++] = A[min++]){
  }
}

//Converts indices between [min, max) to 0
export function zero(A: Iterable<number>, min: number, max: number): void {
  while(min < max){
    A[min++] = 0;
  }
}

//Assumes A and B not same array or A and B do not intersect
export function copy(A: Iterable<number>, minA: number, B: Iterable<number>, minB: number, maxB: number): void {
  while(minB < maxB){
    A[minA++] = B[minB++];
  }
}

//Helper method used for debugging
export function print(A: Iterable<number>, min: number, low: number, high?: number, max?: number): string{
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

export function min(a: number, b: number): number {
  return (a > b) ? b : a;
}

export function max(a: number, b: number): number {
  return (a < b) ? b : a;
}

////////////////////////
// TYPE GUARDS
////////////////////////

export function isNumber(n: any): n is number {
  return typeof n === "number";
}

export function isString(s: any): s is number {
  return typeof s === "string";
}

export function compare(A: Iterable<number>, minA: number, maxA: number, B: Iterable<number>, minB: number, maxB: number): number {

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

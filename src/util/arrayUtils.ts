
//Assumes shifts >= max - min
export function basicShiftUp(A: number[], min: number, max: number, shifts: number): void {
  for(let i: number = min + shifts; min < max; A[i++] = A[min++]){
  }
}

export function reverseShiftUp(A: number[], min: number, max: number, shifts: number): void {
  for(let i: number = max + shifts; max > min; A[--i] = A[--max]){
  }
}

//Assumes A and B not same array or sections A and B do not intersect
export function copy(A: number[], minA: number, B: number[], minB: number, maxB: number): void {
  while(minB < maxB){
    A[minA++] = B[minB++];
  }
}

//Helper method used for debugging
export function print(A: number[], min: number, low: number, high?: number, max?: number): string{
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

//Assumes shifts >= max - min
export function basicShiftUp(A: Iterable<number>, min: number, max: number, shifts: number): void {
  for(let i: number = min + shifts; min < max; A[i++] = A[min++]){
  }
}

//Assumes shifts <= max - min
export function reverseShiftUp(A: Iterable<number>, min: number, max: number, shifts: number): void {
  const mid: number = max - shifts;
  basicShiftUp(A, mid, max, shifts);
  basicShiftUp(A, min, mid, shifts);
}

//Assumes shifts <= min
export function basicShiftDown(A: Iterable<number>, min: number, max: number, shifts: number): void {
  for(let i: number = min - shifts; min < max; A[i++] = A[min++]){
  }
}

//Converts indices from min - max to 0
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

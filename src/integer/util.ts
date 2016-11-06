//Assumes shifts >= max - min
export function basicShiftUp(A: number[], min: number, max: number, shifts: number): void {
  for(let i: number = min + shifts; min < max; A[i++] = A[min++]){
  }
}

//Assumes shifts <= max - min
export function reverseShiftUp(A: number[], min: number, max: number, shifts: number): void {
  const mid: number = max - shifts;
  basicShiftUp(A, mid, max, shifts);
  basicShiftUp(A, min, mid, shifts);
}

//Assumes shifts <= min
export function basicShiftDown(A: number[], min: number, max: number, shifts: number): void {
  for(let i: number = min - shifts; min < max; A[i++] = A[min++]){
  }
}

//Converts indices from min - max to 0
export function zero(A: number[], min: number, max: number): void {
  while(min < max){
    A[min++] = 0;
  }
}

//Assumes A and B not same array or A and B do not intersect
export function copy(A: number[], minA: number, B: number[], minB: number, maxB: number): void {
  while(minB < maxB){
    A[minA++] = B[minB++];
  }
}

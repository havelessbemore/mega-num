
//Assumes shifts >= max - min
export function unsafeShiftUp(A: number[], min: number, max: number, shifts: number): void {
  for(let i: number = min + shifts; min < max; A[i++] = A[min++]){
  }
}

export function safeShiftUp(A: number[], min: number, max: number, shifts: number): void {
  for(let i: number = max + shifts; max > min; A[--i] = A[--max]){
  }
}

//Assumes A and B not same array or sections A and B do not intersect
export function copy(to: number[], minTo: number, from: number[], minFrom: number, maxFrom: number): void {
  while(minFrom < maxFrom){
    to[minTo++] = from[minFrom++];
  }
}

//Sets indices between [min, max) to v
export function set(A: number[], min: number, max: number, v: number): void {
  while(min < max){
    A[min++] = v;
  }
}

//Helper method used for debugging
export function print(A: number[], min: number, max: number): string {
  return "[" + A.slice(min, max).reverse().join(' ') + "]";
}


//Assumes shifts >= max - min, shifts > 0
export function unsafeShiftUp(A: any[], min: number, max: number, shifts: number): void {
  for(let i: number = min + shifts; min < max; A[i++] = A[min++]){
  }
}

export function safeShiftUp(A: any[], min: number, max: number, shifts: number): void {
  for(let i: number = max + shifts; max > min; A[--i] = A[--max]){
  }
}

//Assumes A and B not same array or sections A and B do not intersect
export function copy<T>(to: T[], minTo: number, from: T[], minFrom: number, maxFrom: number): void {
  while(minFrom < maxFrom){
    to[minTo++] = from[minFrom++];
  }
}

//Sets indices between [min, max) to v
export function set<T>(A: T[], min: number, max: number, v: T): void {
  while(min < max){
    A[min++] = v;
  }
}

//Helper method used for debugging
export function print(A: any[], min: number, max: number): string {
  return "[" + A.slice(min, max).reverse().join(', ') + "]";
}

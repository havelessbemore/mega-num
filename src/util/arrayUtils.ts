
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
export function copy<T>(to: T[], minTo: number, from: ReadonlyArray<T>, minFrom: number, maxFrom: number): void {
  while(minFrom < maxFrom){
    to[minTo++] = from[minFrom++];
  }
}

export function printArr(A: any[], min: number, max: number, minSub: number = min, maxSub: number = max): string {
  A = A.map(function(v){return (v == null || v !== v) ? v + '' : v;});
  return "[" +
    A.slice(min,minSub).join(', ') +
    "|" + A.slice(minSub,maxSub).join(', ') +
    "|" + A.slice(maxSub,max).join(', ') +
  "]";
}

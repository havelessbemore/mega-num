
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

export function printArr(A: any[], min: number, max: number, minSub: number = min, maxSub: number = max): string {
  function format(A: any[]): any[] {
    A.forEach((v: any, i: number, A: any[]) => {
      if(v == null || v !== v){
        A[i] = v + '';
      }
    });
    return A;
  }
  return "[" +
    format(A.slice(min,minSub)).join(', ') +
    "|" + format(A.slice(minSub,maxSub)).join(', ') +
    "|" + format(A.slice(maxSub,max)).join(', ') +
  "]";
}

import {Globals} from '../globals';

//Assumes A and B not same array or sections A and B do not intersect
export function copy<T>(to: T[], minTo: number, from: ReadonlyArray<T>, minFrom: number, maxFrom: number): void {
  while(minFrom < maxFrom){
    to[minTo++] = from[minFrom++];
  }
}

export function growArray<T>(A: T[], minNewLen: number, maxNewLen: number): void {
  let newLen: number = maxNewLen;
  if(newLen > Globals.MAX_PRECISION){
    if(minNewLen > Globals.MAX_PRECISION){
      throw new RangeError(
        `Array length greater than supported length ${Globals.MAX_PRECISION}`
      );
    }
    newLen = minNewLen;
  }

  if(A.length < newLen){
    A.length = newLen;
  }
}

export function printArr<T>(A: T[], min: number, max: number, minSub: number = min, maxSub: number = max): string {
  const B = A.map(v => (v == null || v !== v) ? v + '' : v);
  return "[" +
    B.slice(min,minSub).join(', ') +
    "|" + B.slice(minSub,maxSub).join(', ') +
    "|" + B.slice(maxSub,max).join(', ') +
  "]";
}

export function safeShiftUp<T>(A: T[], min: number, max: number, shifts: number): void {
  for(let i: number = max + shifts; max > min; A[--i] = A[--max]){
  }
}

export function shiftDown<T>(A: T[], min: number, max: number, shifts: number): void {
  for(let i: number = min - shifts; min < max; A[i++] = A[min++]){
  }
}

//Assumes shifts >= max - min, shifts > 0
export function unsafeShiftUp<T>(A: T[], min: number, max: number, shifts: number): void {
  for(let i: number = min + shifts; min < max; A[i++] = A[min++]){
  }
}

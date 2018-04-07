import {Globals} from '../globals';

//Assumes A and B not same array or sections A and B do not intersect
export function copy<T>(to: T[], minTo: number, from: ReadonlyArray<T>, minFrom: number, maxFrom: number): void {
  while(minFrom < maxFrom){
    to[minTo++] = from[minFrom++];
  }
}

// tslint:disable-next-line:no-any
export function growArray(A: any[], minNewLen: number, maxNewLen: number): void {
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

// tslint:disable-next-line:no-any
export function printArr(A: any[], min: number, max: number, minSub: number = min, maxSub: number = max): string {
  A = A.map(v => (v == null || v !== v) ? v + '' : v);
  return "[" +
    A.slice(min,minSub).join(', ') +
    "|" + A.slice(minSub,maxSub).join(', ') +
    "|" + A.slice(maxSub,max).join(', ') +
  "]";
}

// tslint:disable-next-line:no-any
export function safeShiftUp(A: any[], min: number, max: number, shifts: number): void {
  for(let i: number = max + shifts; max > min; A[--i] = A[--max]){
  }
}

//Assumes shifts >= max - min, shifts > 0
// tslint:disable-next-line:no-any
export function unsafeShiftUp(A: any[], min: number, max: number, shifts: number): void {
  for(let i: number = min + shifts; min < max; A[i++] = A[min++]){
  }
}

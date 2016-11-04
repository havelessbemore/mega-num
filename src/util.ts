module Util {
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
}

export default Util;

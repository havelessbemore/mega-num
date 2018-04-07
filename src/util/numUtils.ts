export function max(a: number, b: number): number {
  return (a < b) ? b : a;
}

export function min(a: number, b: number): number {
  return (a > b) ? b : a;
}

export function strToDigits(s: string): [number[], boolean] {
  s = s.trim();

  //Check if empty string
  if(s.length < 1){
    throw new TypeError("NaN");
  }

  //Check for leading sign
  const isNegative: boolean = s[0] === '-';

  //Trim signs, leading zeros and decimal part
  s = s.replace(/^[-+]?0*/, '').replace(/\.[0-9]+$/, '');

  //Check if string is not a number
  if(s.match(/[^\d]/)){
    throw new TypeError("NaN");
  }

  //If zero
  const precision: number = s.length;
  if(precision === 0){
    return [[], false];
  }

  //Convert to decimal array
  const digits: number[] = new Array<number>(precision);
  for(let i = 0, j = precision; j > 0; ++i){
    digits[i] = +s[--j];
  }

  return [digits, isNegative];
}

//Sets indices between [min, max) to 0
export function zero(A: number[], min: number, max: number): void {
  while(min < max){
    A[min++] = 0;
  }
}

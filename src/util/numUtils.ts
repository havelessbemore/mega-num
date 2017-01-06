
//Assumes valid inputs
export function changeBase(A: number[], minA: number, maxA: number, curBase: number, newBase: number): [number[], number] {

  //If zero or same base
  if(maxA === minA || curBase === newBase){
    return [A, maxA];
  }

  //Create new array
  let maxB: number = 0;
  const B: number[] = new Array(Math.ceil(
    (maxA - minA) * Math.log(curBase) / Math.log(newBase)
  ));

  //Return number in newBase
  do {
    let remainder: number = 0;
    for(let i: number = maxA; i > minA; remainder = remainder % newBase){
      remainder = remainder*curBase + A[--i];
      A[i] = 0 | (remainder / newBase);
    }
    B[maxB++] = remainder;
    while(A[maxA - 1] === 0){
      if(--maxA === minA){
        return [B, maxB];
      }
    }
  } while(true);
}

//Assumes valid inputs
//Assumes numbers are in same base
export function compare(A: number[], minA: number, maxA: number, B: number[], minB: number, maxB: number): number {

  //Compare number of digits
  const d: number = maxA - minA - maxB + minB;
  if(d !== 0){
    return d < 0 ? -1 : 1;
  }

  //Compare digits
  while(maxA > minA){
    if(A[--maxA] !== B[--maxB]){
      return A[maxA] < B[maxB] ? -1 : 1;
    }
  }

  //Numbers are equal
  return 0;
}

export function isEven(A: number[], minA: number, maxA: number, base: number): boolean {

  //If zero
  if(minA === maxA){
    return true;
  }

  //If even base
  if((base & 1) === 0){
    return (A[minA] & 1) === 0;
  }

  //If odd base
  let xor: number = 0;
  while(minA < maxA){
    xor = xor ^ A[minA++];
  }
  return (xor & 1) === 0;
}

export function max(a: number, b: number): number {
  return (a < b) ? b : a;
}

export function min(a: number, b: number): number {
  return (a > b) ? b : a;
}

export function strToDigits(s: String): [number[], boolean] {
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
    digits[i] = 0 | <any>s[--j];
  }

  return [digits, isNegative];
}

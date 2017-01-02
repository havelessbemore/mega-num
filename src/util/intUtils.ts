import {Integer} from '../type/integer';

export function setOne<T extends Integer>(int: T): T {
  int.precision = 1;
  int.digits.length = 1;
  int.digits[0] = 1;
  int.isNegative = false;
  return int;
}

export function setZero<T extends Integer>(int: T): T {
  int.precision = 0;
  int.digits.length = 0;
  int.isNegative = false;
  return int;
}

export function strToDecArray(s: String): [number[], boolean] {
  s = s.trim();

  //Check if string is a number
  if(Number.isNaN(<any>s)){
    throw TypeError("NaN");
  }

  //Check for leading sign
  const isNegative: boolean = s[0] === '-';

  //Trim signs, leading zeros and decimal part
  s = s.replace(/^[-+]?0+|\.[0-9]+$/gm, '');

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

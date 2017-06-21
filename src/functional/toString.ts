import {Globals} from '../globals';
import {Integer} from '../integer';

//Assumes input cipher is adequate for base
export function toString(A: Integer): string {
  const cipher = Globals.CIPHER;

  //If zero
  if(A.precision === 0){
    return (cipher.length < A.base) ? '0' : cipher[0];
  }

  //If negative
  const sign: string = A.isNegative ? "-" : "";

  //Print without cipher if cipher too small for base
  if(cipher.length < A.base){
    return sign + A.digits.slice(0, A.precision).reverse().join(':');
  }

  //Print with cipher
  let i: number = 0;
  let n: number = A.precision;
  const digits = A.digits;
  const strings = new Array(n);
  while(n > 0){
    strings[i++] = cipher[digits[--n]];
  }
  return sign + strings.join('');
}

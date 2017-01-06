import {CIPHER} from '../constants';
import {Integer} from '../integer';

export function toString(A: Integer, sep: string = null, cipher: ReadonlyArray<string> = null): string {
  const sign: string = A.isNegative ? "-" : "";
  if(cipher == null && CIPHER.length < A.base){
    sep = (sep == null) ? ":": sep;
    return sign + A.digits.slice(0).reverse().join(sep);
  }
  sep = (sep == null) ? "" : sep;
  cipher = (cipher == null) ? CIPHER : cipher;
  return sign + A.digits.map(v => cipher[v]).reverse().join(sep);
}

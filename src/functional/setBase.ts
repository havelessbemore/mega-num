import {Globals} from '../globals';
import {Integer} from '../integer';
import {setBase as _setBase} from '../algorithm/setBase';

export function setBase(A: Integer, base: number): Integer {

  //Sanitize base
  base = 0 | base;

  //If new base too low
  if(base < Globals.MIN_BASE){
    throw RangeError(`${base} < MIN_BASE (${Globals.MIN_BASE})`);
  }

  //If new base too high
  if(base > Globals.MAX_BASE){
    throw RangeError(`${base} > MAX_BASE (${Globals.MAX_BASE})`);
  }

  //Convert to base
  [A.digits, A.precision] = _setBase(A.digits, 0, A.precision, A.base, base);
  A.base = base;
  return A;
}

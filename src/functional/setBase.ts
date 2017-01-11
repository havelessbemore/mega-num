import {Globals} from '../globals';
import {Integer} from '../integer';
import {changeBase, tryMutable} from '../util/intUtils';

export function setBase(A: Integer, base: number, isMutable?: boolean): Integer {

  //Sanitize base
  base = 0 | base;

  //If new base too low
  if(base < Globals.MIN_BASE){
    throw RangeError(base + " < MIN_BASE (" + Globals.MIN_BASE + ")");
  }

  //If new base too high
  if(base > Globals.MAX_BASE){
    throw RangeError(base + " > MAX_BASE (" + Globals.MAX_BASE + ")");
  }

  //Convert to base
  return changeBase(tryMutable(A, isMutable), base);
}

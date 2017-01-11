import {Integer} from '../integer';
import {compare} from './compare';
import {tryMutable} from '../util/intUtils';

export function max(A: Integer, B: Integer, isMutable?: boolean): Integer {
  return tryMutable(compare(A, B) < 0 ? B : A, isMutable);
}

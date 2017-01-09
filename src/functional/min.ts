import {Integer} from '../integer';
import {clone} from './clone';
import {compare} from './compare';

export function min(A: Integer, B: Integer, isMutable: boolean = false): Integer {
  A = (compare(A, B) > 0) ? B : A;
  return (isMutable) ? A : clone(A);
}

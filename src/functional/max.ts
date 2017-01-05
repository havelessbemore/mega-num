import {Integer} from '../integer';
import {compare} from './compare';

export function max(A: Integer, B: Integer): Integer {
  return (compare(A, B) < 0) ? B : A;
}

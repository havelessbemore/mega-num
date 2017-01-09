import {Integer} from '../integer';
import {copy} from './copy';

export function clone(A: Integer) : Integer {
  return copy({}, A);
}

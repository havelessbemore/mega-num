import {Integer} from '../integer';
import {assign} from './assign';

export function copy(target: any, source: Integer): Integer {
  assign(target, source);
  target.digits = target.digits.slice(0, target.precision);
  return target;
}

import {Integer} from '../integer';
import {assign} from '../util/intUtils';

export function copy(target: any, source: Integer): Integer {
  assign(target, source);
  target.digits = target.digits.slice(0, target.precision);
  return target;
}

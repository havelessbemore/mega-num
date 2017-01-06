import {Integer} from '../integer';

export function assign(target: any, source: Integer): Integer {
  target.base = source.base;
  target.digits = source.digits;
  target.precision = source.precision;
  target.isNegative = source.isNegative;
  return target;
}

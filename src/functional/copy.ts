import {Integer} from '../integer';
import {copy as _copy} from '../util/intUtils';

export function copy(target: any, source: Integer): Integer {
  return _copy(target, source);
}

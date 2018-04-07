import {Integer} from '../integer';
import {copy as _copy} from '../util/intUtils';

// tslint:disable-next-line:no-any
export function copy(target: any, source: Integer): Integer {
  return _copy(target, source);
}

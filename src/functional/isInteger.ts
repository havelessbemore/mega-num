import {Integer} from '../integer';

// tslint:disable-next-line:no-any
export function isInteger(A: any): A is Integer {
  return A.hasOwnProperty('base')
  && A.hasOwnProperty('digits')
  && A.hasOwnProperty('precision')
  && A.hasOwnProperty('isNegative');
}

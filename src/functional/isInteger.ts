import {Integer} from '../integer';

export function isInteger(A: any): A is Integer {
  return A.hasOwnProperty('base')
  && A.hasOwnProperty('digits')
  && A.hasOwnProperty('precision')
  && A.hasOwnProperty('isNegative');
}

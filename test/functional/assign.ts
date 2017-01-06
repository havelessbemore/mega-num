import {assert} from 'chai';
import {Integer} from '../../src/integer';
import * as util from '../../src/functional/assign';

function toInteger(digits: number[], precision: number, isNegative: boolean, base: number): Integer {
  return {
    base: base,
    digits: digits,
    precision: precision,
    isNegative: isNegative
  };
}

describe('assign', function(){
  it('should assign source property values to target', () => {
    const source: Integer = toInteger([1,2,3,4,5], 5, true, 125);
    const target: Integer = toInteger([6,7,8], 3, false, 10);
    const actual: Integer = util.assign(target, source);
    assert.equal(actual, target);
    assert.deepEqual(actual, source);
    assert.equal(actual.digits, source.digits);
  });
});

import {assert} from 'chai';
import {Integer} from '../../src/integer';
import {clone} from '../../src/functional/clone';

function toInteger(digits: number[], precision: number, isNegative: boolean, base: number): Integer {
  return {
    base: base,
    digits: digits,
    precision: precision,
    isNegative: isNegative
  };
}

describe('clone', function(){
  it('should clone source property values with target', function(){
    const input: Integer = toInteger([1,2,3,4,5], 5, true, 125);
    const output: Integer = clone(input);
    assert.notEqual(input, output);
    assert.deepEqual(input, output);
    assert.notEqual(input.digits, output.digits);
  });
});

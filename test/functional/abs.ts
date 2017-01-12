import {assert} from 'chai';
import {Integer} from '../../src/integer';
import {abs} from '../../src/functional/abs';

function toInteger(digits: number[], precision: number, isNegative: boolean, base: number): Integer {
  return {
    base: base,
    digits: digits,
    precision: precision,
    isNegative: isNegative
  };
}

describe('abs', function(){
  it('should return the absolute value of a positive input', function(){
    const input: Integer = toInteger([1,2,3,4,5], 5, false, 125);
    const output: Integer = abs(input, true);
    assert.equal(input, output);
    assert.deepEqual(input, output);
    assert.equal(output.isNegative, false);
  });

  it('should return the absolute value of a negative input', function(){
    const input: Integer = toInteger([1,2,3,4,5], 5, true, 125);
    const output: Integer = abs(input, true);
    assert.equal(input, output);
    assert.deepEqual(input, output);
    assert.equal(output.isNegative, false);
  });

  it('should return a copy of the absolute value of a positive input', function(){
    const input: Integer = toInteger([1,2,3,4,5], 5, false, 125);
    const output: Integer = abs(input, false);
    assert.notEqual(input, output);
    assert.equal(output.isNegative, false);
    assert.deepEqual(input, output);
  });

  it('should return a copy of the absolute value of a negative input', function(){
    const input: Integer = toInteger([1,2,3,4,5], 5, true, 125);
    const output: Integer = abs(input, false);
    assert.notEqual(input, output);
    assert.equal(output.isNegative, false);
    output.isNegative = input.isNegative;
    assert.deepEqual(input, output);
  });
});

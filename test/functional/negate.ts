import {assert} from 'chai';
import {Integer} from '../../src/integer';
import {negate} from '../../src/functional/negate';

function toInteger(digits: number[], precision: number, isNegative: boolean, base: number): Integer {
  return {
    base: base,
    digits: digits,
    precision: precision,
    isNegative: isNegative
  };
}

describe('negate', function(){
  it('should return the negative value of a positive input', function(){
    const input: Integer = toInteger([1,2,3,4,5], 5, false, 125);
    const output: Integer = negate(input, true);
    assert.equal(input, output);
    assert.equal(output.isNegative, true);
    output.isNegative = input.isNegative;
    assert.deepEqual(input, output);
  });

  it('should return the negative value of a negative input', function(){
    const input: Integer = toInteger([1,2,3,4,5], 5, true, 125);
    const output: Integer = negate(input, true);
    assert.equal(input, output);
    assert.equal(output.isNegative, false);
    output.isNegative = input.isNegative;
    assert.deepEqual(input, output);
  });

  it('should return a copy of the negative value of a positive input', function(){
    const input: Integer = toInteger([1,2,3,4,5], 5, false, 125);
    const output: Integer = negate(input, false);
    assert.notEqual(input, output);
    assert.equal(output.isNegative, true);
    output.isNegative = input.isNegative;
    assert.deepEqual(input, output);
  });

  it('should return a copy of the negative value of a negative input', function(){
    const input: Integer = toInteger([1,2,3,4,5], 5, true, 125);
    const output: Integer = negate(input, false);
    assert.notEqual(input, output);
    assert.equal(output.isNegative, false);
    output.isNegative = input.isNegative;
    assert.deepEqual(input, output);
  });
});

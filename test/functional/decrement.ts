import {assert} from 'chai';
import {Integer} from '../../src/integer';
import {toInteger} from '../../src/util/intUtils';
import {decrement} from '../../src/functional/decrement';

describe('decrement', function(){

  it('should return -1 - 1 in base 10', function(){
    const input: Integer = toInteger([1], 1, true, 10);
    const expected: Integer = toInteger([2], 1, true, 10);
    const actual: Integer = decrement(input, true);
    actual.digits.length = actual.precision;
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 0-1 in base 10', function(){
    const input: Integer = toInteger([], 0, false, 10);
    const expected: Integer = toInteger([1], 1, true, 10);
    const actual: Integer = decrement(input, true);
    actual.digits.length = actual.precision;
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 1-1 in base 10', function(){
    const input: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([], 0, false, 10);
    const actual: Integer = decrement(input, true);
    actual.digits.length = actual.precision;
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 2-1 in base 10', function(){
    const input: Integer = toInteger([2], 1, false, 10);
    const expected: Integer = toInteger([1], 1, false, 10);
    const actual: Integer = decrement(input, true);
    actual.digits.length = actual.precision;
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 10-1 in base 10', function(){
    const input: Integer = toInteger([0,1], 2, false, 10);
    const expected: Integer = toInteger([9], 1, false, 10);
    const actual: Integer = decrement(input, true);
    actual.digits.length = actual.precision;
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 11-1 in base 10', function(){
    const input: Integer = toInteger([1,1], 2, false, 10);
    const expected: Integer = toInteger([0,1], 2, false, 10);
    const actual: Integer = decrement(input, true);
    actual.digits.length = actual.precision;
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 99-1 in base 10', function(){
    const input: Integer = toInteger([9,9], 2, false, 10);
    const expected: Integer = toInteger([8,9], 2, false, 10);
    const actual: Integer = decrement(input, true);
    actual.digits.length = actual.precision;
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 100000-1 in base 10', function(){
    const input: Integer = toInteger([0,0,0,0,0,1], 6, false, 10);
    const expected: Integer = toInteger([9,9,9,9,9], 5, false, 10);
    const actual: Integer = decrement(input, true);
    actual.digits.length = actual.precision;
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 300000-1 in base 10', function(){
    const input: Integer = toInteger([0,0,0,0,0,3], 6, false, 10);
    const expected: Integer = toInteger([9,9,9,9,9,2], 6, false, 10);
    const actual: Integer = decrement(input, true);
    actual.digits.length = actual.precision;
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 321-1 in base 179', function(){
    const input: Integer = toInteger([142, 1], 2, false, 179);
    const expected: Integer = toInteger([141, 1], 2, false, 179);
    const actual: Integer = decrement(input, true);
    actual.digits.length = actual.precision;
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 28,676,695-1 in base 179', function(){
    const input: Integer = toInteger([0,0,0,5], 4, false, 179);
    const expected: Integer = toInteger([178,178,178,4], 4, false, 179);
    const actual: Integer = decrement(input, true);
    actual.digits.length = actual.precision;
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 72-1 in base 2', function(){
    const input: Integer = toInteger([0,0,0,1,0,0,1], 7, false, 2);
    const expected: Integer = toInteger([1,1,1,0,0,0,1], 7, false, 2);
    const actual: Integer = decrement(input, true);
    actual.digits.length = actual.precision;
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });
});

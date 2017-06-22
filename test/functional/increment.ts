import {assert} from 'chai';
import {Integer} from '../../src/integer';
import {toInteger} from '../../src/util/intUtils';
import {increment} from '../../src/functional/increment';

describe('increment', function(){

  it('should return -2+1 in base 10', function(){
    const input: Integer = toInteger([2], 1, true, 10);
    const expected: Integer = toInteger([1], 1, true, 10);
    const actual: Integer = increment(input);
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return -1+1 in base 10', function(){
    const input: Integer = toInteger([1], 1, true, 10);
    const expected: Integer = toInteger([], 0, false, 10);
    const actual: Integer = increment(input);
    actual.digits.length = actual.precision;
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 0+1 in base 10', function(){
    const input: Integer = toInteger([], 0, false, 10);
    const expected: Integer = toInteger([1], 1, false, 10);
    const actual: Integer = increment(input);
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 1+1 in base 10', function(){
    const input: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([2], 1, false, 10);
    const actual: Integer = increment(input);
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 9+1 in base 10', function(){
    const input: Integer = toInteger([9], 1, false, 10);
    const expected: Integer = toInteger([0,1], 2, false, 10);
    const actual: Integer = increment(input);
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 15+1 in base 10', function(){
    const input: Integer = toInteger([5,1], 2, false, 10);
    const expected: Integer = toInteger([6,1], 2, false, 10);
    const actual: Integer = increment(input);
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 99+1 in base 10', function(){
      const input: Integer = toInteger([9,9], 2, false, 10);
      const expected: Integer = toInteger([0,0,1], 3, false, 10);
      const actual: Integer = increment(input);
      assert.equal(actual, input);
      assert.deepEqual(actual, expected);
  });

  it('should return 100000+1 in base 10', function(){
    const input: Integer = toInteger([0,0,0,0,0,1], 6, false, 10);
    const expected: Integer = toInteger([1,0,0,0,0,1], 6, false, 10);
    const actual: Integer = increment(input);
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });

  it('should return 1007999+1 in base 10', function(){
      const input: Integer = toInteger([9,9,9,7,0,0,1], 7, false, 10);
      const expected: Integer = toInteger([0,0,0,8,0,0,1], 7, false, 10);
      const actual: Integer = increment(input);
      assert.equal(actual, input);
      assert.deepEqual(actual, expected);
  });

  it('should return 357+1 in base 179', function(){
    const input: Integer = toInteger([178, 1], 2, false, 179);
    const expected: Integer = toInteger([0,2], 2, false, 179);
    const actual: Integer = increment(input);
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
  });
});

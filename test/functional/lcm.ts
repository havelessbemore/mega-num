import {assert} from 'chai';
import {Integer} from '../../src/integer';
import {lcm} from '../../src/functional/lcm';
import {toInteger} from '../../src/util/intUtils';

describe('lcm', function(){

  it('should return lcm(A,A) = A in base 10', function(){
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    const expected: Integer = toInteger([3,2,1], 3, false, 10);

    //Run method
    const actual: Integer = lcm(A, A);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return lcm(0,B) = 0 in base 10', function(){
    const A: Integer = toInteger([], 0, false, 10);
    const B: Integer = toInteger([3,2,1], 3, false, 10);
    const expected: Integer = toInteger([], 0, false, 10);

    //Run method
    const actual: Integer = lcm(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return lcm(A,1) = A in base 10', function(){
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    const B: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([3,2,1], 3, false, 10);

    //Run method
    const actual: Integer = lcm(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return lcm(A,0) = 0 in base 10', function(){
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    const B: Integer = toInteger([], 0, false, 10);
    const expected: Integer = toInteger([], 0, false, 10);

    //Run method
    const actual: Integer = lcm(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return lcm(1,B) = B in base 10', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([3,2,1], 3, false, 10);
    const expected: Integer = toInteger([3,2,1], 3, false, 10);

    //Run method
    const actual: Integer = lcm(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return lcm(1,1) = 1 in base 10', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([1], 1, false, 10);

    //Run method
    const actual: Integer = lcm(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return lcm(4,6) = 12 in base 10', function(){
    const A: Integer = toInteger([4], 1, false, 10);
    const B: Integer = toInteger([6], 1, false, 10);
    const expected: Integer = toInteger([2,1], 2, false, 10);

    //Run method
    const actual: Integer = lcm(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return lcm(21,6) = 42 in base 10', function(){
    const A: Integer = toInteger([1,2], 2, false, 10);
    const B: Integer = toInteger([6], 1, false, 10);
    const expected: Integer = toInteger([2,4], 2, false, 10);

    //Run method
    const actual: Integer = lcm(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return lcm(21,6) = 42 in base 2', function(){
    const A: Integer = toInteger([1,0,1,0,1], 5, false, 2);
    const B: Integer = toInteger([0,1,1], 3, false, 2);
    const expected: Integer = toInteger([0,1,0,1,0,1], 6, false, 2);

    //Run method
    const actual: Integer = lcm(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return lcm(21,6) = 42 in base 3', function(){
    const A: Integer = toInteger([0,1,2], 3, false, 3);
    const B: Integer = toInteger([0,2], 2, false, 3);
    const expected: Integer = toInteger([0,2,1,1], 4, false, 3);

    //Run method
    const actual: Integer = lcm(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return lcm(21,6) = 42 in base 5', function(){
    const A: Integer = toInteger([1,4], 2, false, 5);
    const B: Integer = toInteger([1,1], 2, false, 5);
    const expected: Integer = toInteger([2,3,1], 3, false, 5);

    //Run method
    const actual: Integer = lcm(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return lcm(21,6) = 42 in base 16', function(){
    const A: Integer = toInteger([5,1], 2, false, 16);
    const B: Integer = toInteger([6], 1, false, 16);
    const expected: Integer = toInteger([10,2], 2, false, 16);

    //Run method
    const actual: Integer = lcm(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

});

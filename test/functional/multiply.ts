import {assert} from 'chai';
import {Integer} from '../../src/integer';
import {multiply} from '../../src/functional/multiply';
import {toInteger} from '../../src/util/intUtils';

describe('multiply', function(){

  it('should return A*A in base 10', function(){
    const A: Integer = toInteger([2], 1, false, 10);
    const expected: Integer = toInteger([4], 1, false, 10);

    //Run method
    const actual: Integer = multiply(A, A, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 0*123 in base 10', function(){
    const A: Integer = toInteger([], 0, false, 10);
    const B: Integer = toInteger([3,2,1], 3, false, 10);
    const expected: Integer = toInteger([], 0, false, 10);

    //Run method
    const actual: Integer = multiply(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 123*0 in base 10', function(){
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    const B: Integer = toInteger([], 0, false, 10);
    const expected: Integer = toInteger([], 0, false, 10);

    //Run method
    const actual: Integer = multiply(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 1*1 in base 10', function(){
      const A: Integer = toInteger([1], 1, false, 10);
      const B: Integer = toInteger([1], 1, false, 10);
      const expected: Integer = toInteger([1], 1, false, 10);

      //Run method
      const actual: Integer = multiply(A, B, true);
      actual.digits.length = actual.precision;

      //Verify method
      assert.equal(actual, A);
      assert.deepEqual(actual, expected);
  });

  it('should return 1*10 in base 10', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([0,1], 2, false, 10);
    const expected: Integer = toInteger([0,1], 2, false, 10);

    //Run method
    const actual: Integer = multiply(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 1*100 in base 10', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([0,0,1], 3, false, 10);
    const expected: Integer = toInteger([0,0,1], 3, false, 10);

    //Run method
    const actual: Integer = multiply(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 9*8 in base 10', function(){
    const A: Integer = toInteger([9], 1, false, 10);
    const B: Integer = toInteger([8], 1, false, 10);
    const expected: Integer = toInteger([2,7], 2, false, 10);

    //Run method
    const actual: Integer = multiply(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 8*9 in base 10', function(){
    const A: Integer = toInteger([8], 1, false, 10);
    const B: Integer = toInteger([9], 1, false, 10);
    const expected: Integer = toInteger([2,7], 2, false, 10);

    //Run method
    const actual: Integer = multiply(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 123 * 2 in base 10', function(){
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    const B: Integer = toInteger([2], 1, false, 10);
    const expected: Integer = toInteger([6,4,2], 3, false, 10);

    //Run method
    const actual: Integer = multiply(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 2 * 123 in base 10', function(){
    const A: Integer = toInteger([2], 1, false, 10);
    const B: Integer = toInteger([3,2,1], 3, false, 10);
    const expected: Integer = toInteger([6,4,2], 3, false, 10);

    //Run method
    const actual: Integer = multiply(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 3 * 123 in base 10', function(){
    const A: Integer = toInteger([3], 1, false, 10);
    const B: Integer = toInteger([3,2,1], 3, false, 10);
    const expected: Integer = toInteger([9,6,3], 3, false, 10);

    //Run method
    const actual: Integer = multiply(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 123 * 456789 in base 10', function(){
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    const B: Integer = toInteger([9,8,7,6,5,4], 6, false, 10);
    const expected: Integer = toInteger([7,4,0,5,8,1,6,5], 8, false, 10);

    //Run method
    const actual: Integer = multiply(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 456789 * 123 in base 2', function(){
    const A: Integer = toInteger([1,0,1,0,1,0,1,0,0,0,0,1,1,1,1,1,0,1,1], 19, false, 2);
    const B: Integer = toInteger([1,1,0,1,1,1,1], 7, false, 2);
    const expected: Integer = toInteger([1,1,1,0,1,0,1,1,0,0,0,0,1,0,1,0,1,0,0,1,1,0,1,0,1,1], 26, false, 2);

    //Run method
    const actual: Integer = multiply(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return [100 digit number] ^ [100 digit number] in base 10', function(){
    const A: Integer = toInteger([
      6,9,5,9,8,3,4,7,9,9,2,4,9,1,1,6,6,1,8,2,9,0,8,2,4,2,6,2,4,2,
      5,3,5,9,3,1,0,1,1,6,2,7,6,7,1,9,8,7,5,8,4,2,7,9,7,2,8,2,3,4,
      3,7,5,0,1,2,8,3,3,9,4,9,9,0,7,8,9,7,8,2,7,7,5,6,1,6,7,5,9,4,
      8,8,6,0,5,7,9,2,4,6
    ], 100, false, 10);
    const B: Integer = toInteger([
      6,9,5,9,8,3,4,7,9,9,2,4,9,1,1,6,6,1,8,2,9,0,8,2,4,2,6,2,4,2,
      5,3,5,9,3,1,0,1,1,6,2,7,6,7,1,9,8,7,5,8,4,2,7,9,7,2,8,2,3,4,
      3,7,5,0,1,2,8,3,3,9,4,9,9,0,7,8,9,7,8,2,7,7,5,6,1,6,7,5,9,4,
      8,8,6,0,5,7,9,2,4,6
    ], 100, false, 10);
    const expected: Integer = toInteger([
      6,1,2,3,4,0,3,9,7,2,5,4,6,5,5,1,7,5,4,0,3,6,6,8,3,6,4,5,3,0,
      6,6,3,4,9,9,9,9,6,1,1,8,7,4,8,2,9,8,9,9,4,3,9,5,2,0,2,7,7,2,
      9,1,0,5,0,6,4,3,0,2,8,7,7,1,1,3,5,4,1,5,8,1,3,4,8,3,5,9,5,9,
      6,7,9,5,9,0,6,1,2,6,5,9,9,7,2,3,4,1,7,9,7,4,2,4,3,7,6,1,4,1,
      4,0,1,3,2,5,9,5,7,4,9,7,0,2,5,8,5,3,5,4,0,8,4,4,0,6,8,1,7,1,
      4,3,6,4,5,3,7,7,4,7,1,8,0,7,1,6,4,5,4,9,6,6,6,6,7,0,3,7,7,9,
      3,6,0,1,2,7,1,1,2,6,1,9,3,9,6,1,4,3,1,4
    ], 200, false, 10);

    //Run method
    const actual: Integer = multiply(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

});

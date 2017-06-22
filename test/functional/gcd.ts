import {assert} from 'chai';
import {Integer} from '../../src/integer';
import {gcd} from '../../src/functional/gcd';
import {toInteger} from '../../src/util/intUtils';

describe('gcd', function(){

  it('should return should return gcd(A,A) = A in base 10', function(){
    const A: Integer = toInteger([3,2,1], 1, false, 10);
    const expected: Integer = toInteger([3,2,1], 1, false, 10);

    //Run method
    const actual: Integer = gcd(A, A);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return should return gcd(A,0) = A in base 10', function(){
    const A: Integer = toInteger([3,2,1], 1, false, 10);
    const B: Integer = toInteger([], 0, false, 10);
    const expected: Integer = toInteger([3,2,1], 1, false, 10);

    //Run method
    const actual: Integer = gcd(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return should return gcd(0,B) = B in base 10', function(){
    const A: Integer = toInteger([], 0, false, 10);
    const B: Integer = toInteger([3,2,1], 3, false, 10);
    const expected: Integer = toInteger([3,2,1], 3, false, 10);

    //Run method
    const actual: Integer = gcd(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return should return gcd(1,1) = 1 in base 10', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([1], 1, false, 10);

    //Run method
    const actual: Integer = gcd(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return should return gcd(18,84) = 6 in base 10', function(){
    const A: Integer = toInteger([8,1], 2, false, 10);
    const B: Integer = toInteger([4,8], 2, false, 10);
    const expected: Integer = toInteger([6], 1, false, 10);

    //Run method
    const actual: Integer = gcd(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return should return gcd(-48,18) = 6 in base 10', function(){
    const A: Integer = toInteger([8,4], 2, true, 10);
    const B: Integer = toInteger([8,1], 2, false, 10);
    const expected: Integer = toInteger([6], 1, false, 10);

    //Run method
    const actual: Integer = gcd(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return gcd(42, -56) = 14 in base 10', function(){
    const A: Integer = toInteger([2,4], 2, false, 10);
    const B: Integer = toInteger([6,5], 2, true, 10);
    const expected: Integer = toInteger([4,1], 2, false, 10);

    //Run method
    const actual: Integer = gcd(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return gcd(-2345, -72) = 1 in base 10', function(){
    const A: Integer = toInteger([5,4,3,2], 4, true, 10);
    const B: Integer = toInteger([2,7], 2, true, 10);
    const expected: Integer = toInteger([1], 1, false, 10);

    //Run method
    const actual: Integer = gcd(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return gcd(1368, 339) = 3 in base 10', function(){
    const A: Integer = toInteger([8,6,3,1], 4, false, 10);
    const B: Integer = toInteger([9,3,3], 3, false, 10);
    const expected: Integer = toInteger([3], 1, false, 10);

    //Run method
    const actual: Integer = gcd(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return gcd(1071, 462) = 21 in base 10', function(){
    const A: Integer = toInteger([1,7,0,1], 4, false, 10);
    const B: Integer = toInteger([2,6,4], 3, false, 10);
    const expected: Integer = toInteger([1,2], 2, false, 10);

    //Run method
    const actual: Integer = gcd(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);

  });

  it('should return gcd(55534, 434334) = 2 in base 10', function(){
    const A: Integer = toInteger([4,3,5,5,5], 5, false, 10);
    const B: Integer = toInteger([4,3,3,4,3,4], 6, false, 10);
    const expected: Integer = toInteger([2], 1, false, 10);

    //Run method
    const actual: Integer = gcd(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

});

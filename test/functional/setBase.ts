import {assert, expect} from 'chai';
import {Globals} from '../../src/globals';
import {Integer} from '../../src/integer';
import {toInteger} from '../../src/util/intUtils';
import {setBase} from '../../src/functional/setBase';

describe('setBase', () => {

  it('should return error when base too low', () => {
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    expect(() => setBase(A, Globals.MIN_BASE - 1)).to.throw(RangeError);
  });

  it('should return error when base too high', () => {
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    expect(() => setBase(A, Globals.MAX_BASE + 1)).to.throw(RangeError);
  });

  it('should return zero when input is zero', () => {
    const A: Integer = toInteger([], 0, false, 10);
    const expected: Integer = toInteger([], 0, false, 2);

    //Run method
    const actual: Integer = setBase(A, 2);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return one when input is one', () => {
    const A: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([1], 1, false, 2);

    //Run method
    const actual: Integer = setBase(A, 2);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should change 2 in base 10 to base 2', () => {
    const A: Integer = toInteger([2], 1, false, 10);
    const expected: Integer = toInteger([0,1], 2, false, 2);

    //Run method
    const actual: Integer = setBase(A, 2);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should change 10 in base 10 to base 2', () => {
    const A: Integer = toInteger([0,1], 2, false, 10);
    const expected: Integer = toInteger([0,1,0,1], 4, false, 2);

    //Run method
    const actual: Integer = setBase(A, 2);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should change 16 in base 10 to base 2', () => {
    const A: Integer = toInteger([6,1], 2, false, 10);
    const expected: Integer = toInteger([0,0,0,0,1], 5, false, 2);

    //Run method
    const actual: Integer = setBase(A, 2);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should change 31 in base 10 to base 2', () => {
    const A: Integer = toInteger([1,3], 2, false, 10);
    const expected: Integer = toInteger([1,1,1,1,1], 5, false, 2);

    //Run method
    const actual: Integer = setBase(A, 2);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should change 2 in base 7 to base 19', () => {
    const A: Integer = toInteger([2], 1, false, 7);
    const expected: Integer = toInteger([2], 1, false, 19);

    //Run method
    const actual: Integer = setBase(A, 19);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should change 7 in base 7 to base 19', () => {
    const A: Integer = toInteger([0,1], 2, false, 7);
    const expected: Integer = toInteger([7], 1, false, 19);

    //Run method
    const actual: Integer = setBase(A, 19);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should change 19 in base 7 to base 19', () => {
    const A: Integer = toInteger([5,2], 2, false, 7);
    const expected: Integer = toInteger([0,1], 2, false, 19);

    //Run method
    const actual: Integer = setBase(A, 19);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should change 373 in base 7 to base 19', () => {
    const A: Integer = toInteger([2,4,0,1], 4, false, 7);
    const expected: Integer = toInteger([12,0,1], 3, false, 19);

    //Run method
    const actual: Integer = setBase(A, 19);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should change 130321 in base 7 to base 19', () => {
    const A: Integer = toInteger([1,4,6,1,5,0,1], 7, false, 7);
    const expected: Integer = toInteger([18,18,18,18], 4, false, 19);

    //Run method
    const actual: Integer = setBase(A, 19);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

});

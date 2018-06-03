import {assert} from 'chai';
import {default as sinon} from 'sinon';
import rewire = require('rewire');
import {Integer} from '../../src/integer';
import {subtract} from '../../src/functional/subtract';
import {toInteger} from '../../src/util/intUtils';
const rewireSubtract = rewire<SubtractFunc>('../../src/functional/subtract');

interface SubtractFunc {
  subtract: (A: Integer, B: Integer, m?: boolean) => Integer;
}

describe('subtract', () => {

  ////////////////////////
  //A >= B
  ////////////////////////

  it('should return 0-0 in base 10', () => {
    const A: Integer = toInteger([], 0, false, 10);
    const B: Integer = toInteger([], 0, false, 10);
    const expected: Integer = toInteger([], 0, false, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 1-1 in base 10', () => {
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([], 0, false, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 10-10 in base 10', () => {
    const A: Integer = toInteger([0,1], 2, false, 10);
    const B: Integer = toInteger([0,1], 2, false, 10);
    const expected: Integer = toInteger([], 0, false, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 9-1 in base 10', () => {
    const A: Integer = toInteger([9], 1, false, 10);
    const B: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([8], 1, false, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 456789-123 in base 10', () => {
    const A: Integer = toInteger([9,8,7,6,5,4], 6, false, 10);
    const B: Integer = toInteger([3,2,1], 3, false, 10);
    const expected: Integer = toInteger([6,6,6,6,5,4], 6, false, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 456789-123 in base 2', () => {
    const A: Integer = toInteger([1,0,1,0,1,0,1,0,0,0,0,1,1,1,1,1,0,1,1], 19, false, 2);
    const B: Integer = toInteger([1,1,0,1,1,1,1], 7, false, 2);
    const expected: Integer = toInteger([0,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,1], 19, false, 2);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 9,870,006,540,003,210-123,000,456,000,789 in base 10', () => {
    const A: Integer = toInteger([0,1,2,3,0,0,0,4,5,6,0,0,0,7,8,9], 16, false, 10);
    const B: Integer = toInteger([9,8,7,0,0,0,6,5,4,0,0,0,3,2,1], 15, false, 10);
    const expected: Integer = toInteger([1,2,4,2,0,0,4,8,0,6,0,0,7,4,7,9], 16, false, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 1,524,155,677,489-1,524,155,677,489 in base 10', () => {
    const A: Integer = toInteger([9,8,4,7,7,6,5,5,1,4,2,5,1], 13, false, 10);
    const B: Integer = toInteger([9,8,4,7,7,6,5,5,1,4,2,5,1], 13, false, 10);
    const expected: Integer = toInteger([], 0, false, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 10,000,000-1 in base 10', () => {
    const A: Integer = toInteger([0,0,0,0,0,0,0,1], 8, false, 10);
    const B: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([9,9,9,9,9,9,9], 7, false, 10);

    //Run method
    const actual: Integer = subtract(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 10,100,000-1 in base 10', () => {
    const A: Integer = toInteger([0,0,0,0,0,1,0,1], 8, false, 10);
    const B: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([9,9,9,9,9,0,0,1], 8, false, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  ////////////////////////
  // A < B
  ////////////////////////

  it('should return 0-1 in base 10', () => {
    const A: Integer = toInteger([], 0, false, 10);
    const B: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([1], 1, true, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 1-2 in base 10', () => {
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([2], 1, false, 10);
    const expected: Integer = toInteger([1], 1, true, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 10-11 in base 10', () => {
    const A: Integer = toInteger([0,1], 2, true, 10);
    const B: Integer = toInteger([1,1], 2, true, 10);
    const expected: Integer = toInteger([1], 1, false, 10);

    //Run method
    const actual: Integer = subtract(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 1-9 in base 10', () => {
    const A: Integer = toInteger([1], 1, true, 10);
    const B: Integer = toInteger([9], 1, true, 10);
    const expected: Integer = toInteger([8], 1, false, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 123-456789 in base 10', () => {
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    const B: Integer = toInteger([9,8,7,6,5,4], 6, false, 10);
    const expected: Integer = toInteger([6,6,6,6,5,4], 6, true, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 123-456789 in base 2', () => {
    const A: Integer = toInteger([1,1,0,1,1,1,1], 7, false, 2);
    const B: Integer = toInteger([1,0,1,0,1,0,1,0,0,0,0,1,1,1,1,1,0,1,1], 19, false, 2);
    const expected: Integer = toInteger([0,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,1], 19, true, 2);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 123,000,456,000,789-9,870,006,540,003,210 in base 10', () => {
    const A: Integer = toInteger([9,8,7,0,0,0,6,5,4,0,0,0,3,2,1], 15, false, 10);
    const B: Integer = toInteger([0,1,2,3,0,0,0,4,5,6,0,0,0,7,8,9], 16, false, 10);
    const expected: Integer = toInteger([1,2,4,2,0,0,4,8,0,6,0,0,7,4,7,9], 16, true, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 1,524,155,677,489-1,524,155,677,490 in base 10', () => {
    const A: Integer = toInteger([9,8,4,7,7,6,5,5,1,4,2,5,1], 13, false, 10);
    const B: Integer = toInteger([0,9,4,7,7,6,5,5,1,4,2,5,1], 13, false, 10);
    const expected: Integer = toInteger([1], 1, true, 10);

    //Run method
    const actual: Integer = subtract(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 1-10,000,000 in base 10', () => {
    const A: Integer = toInteger([1], 1, true, 10);
    const B: Integer = toInteger([0,0,0,0,0,0,0,1], 8, true, 10);
    const expected: Integer = toInteger([9,9,9,9,9,9,9], 7, false, 10);

    //Run method
    const actual: Integer = subtract(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 1-10,100,000 in base 10', () => {
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([0,0,0,0,0,1,0,1], 8, false, 10);
    const expected: Integer = toInteger([9,9,9,9,9,0,0,1], 8, true, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  ////////////////////////
  // Integration
  ////////////////////////

  it('should set A to zero if A === B', () => {
    const A: Integer = toInteger([1,2,3], 3, false, 10);
    const expected: Integer = toInteger([], 0, false, 10);

    //Run method
    const actual: Integer = subtract(A, A);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return A if B = 0', () => {
    const A: Integer = toInteger([1,2,3], 3, false, 10);
    const B: Integer = toInteger([], 0, false, 10);
    const expected: Integer = toInteger([1,2,3], 3, false, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should set A to -B if A = 0', () => {
    const A: Integer = toInteger([], 0, false, 10);
    const B: Integer = toInteger([1,2,3], 3, false, 10);
    const expected: Integer = toInteger([1,2,3], 3, true, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it("should set A to -B in A's base if A = 0", () => {
    const A: Integer = toInteger([], 0, false, 2);
    const B: Integer = toInteger([1,2,3], 3, false, 10);
    const expected: Integer = toInteger([1,0,0,0,0,0,1,0,1], 9, true, 2);

    //Run method
    const actual: Integer = subtract(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should add if signs of A and B differ', () => {
    const A: Integer = toInteger([3], 1, false, 10);
    const B: Integer = toInteger([1], 1, true, 10);
    const expected: Integer = toInteger([4], 1, false, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should use negate() and add() correctly if signs of A and B differ', () => {
    const A: Integer = toInteger([3], 1, false, 10);
    const B: Integer = toInteger([2], 1, true, 10);

    //Create mocks
    const negate = rewireSubtract.__get__('negate_1');
    const negateMock: sinon.SinonMock = sinon.mock(negate);
    negateMock.expects('negate').twice().withExactArgs(A);

    const add = rewireSubtract.__get__('add_1');
    const addMock: sinon.SinonMock = sinon.mock(add);
    addMock.expects("add").once().withExactArgs(A, B);

    //Rewire and run method
    rewireSubtract.__with__({
      'add_1.add': add.add
    })(() => rewireSubtract.subtract(A, B));

    //Verify mocks
    negateMock.verify();
    addMock.verify();
  });

  it('should return zero if A == B', () => {
    const A: Integer = toInteger([1,2,3], 3, false, 10);
    const B: Integer = toInteger([1,2,3], 3, false, 10);
    const expected: Integer = toInteger([], 0, false, 10);

    //Run method
    const actual: Integer = subtract(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });
});

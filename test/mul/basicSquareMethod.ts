import assert = require('assert');
import BasicSquareMethod from '../../src/mul/basicSquareMethod';

describe('BasicSquareMethod', function(){
  it('should return 1^2 in base 10', function(){
    const A: number[] = [1];
    const len: number = A.length = BasicSquareMethod(A, A.length, 10);
    assert.equal(len, 1);
    assert.deepEqual(A, [1]);
  });

  it('should return 2^2 in base 10', function(){
    const A: number[] = [2];
    const len: number = A.length = BasicSquareMethod(A, A.length, 10);
    assert.equal(len, 1);
    assert.deepEqual(A, [4]);
  });

  it('should return 4^2 in base 10', function(){
    const A: number[] = [4];
    const len: number = A.length = BasicSquareMethod(A, A.length, 10);
    assert.equal(len, 2);
    assert.deepEqual(A, [6, 1]);
  });

  it('should return 1234567^2 in base 10', function(){
    const A: number[] = [7,6,5,4,3,2,1];
    const len: number = A.length = BasicSquareMethod(A, A.length, 10);
    assert.equal(len, 13);
    assert.deepEqual(A, [9,8,4,7,7,6,5,5,1,4,2,5,1]);
  });

  it('should return 1234567^4 in base 10', function(){
    const actual: number[] = [9,8,4,7,7,6,5,5,1,4,2,5,1];
    const expected: number[] = [1,2,1,5,4,3,1,8,5,2,5,9,1,2,2,9,2,5,0,5,0,3,2,3,2];
    let len: number = actual.length = BasicSquareMethod(actual, actual.length, 10);
    assert.equal(len, expected.length);
    assert.deepEqual(actual, expected);
  });

  it('should return 7654321^2 in base 10', function(){
    const actual: number[] = [1,2,3,4,5,6,7];
    const expected: number[] = [1,4,0,1,7,9,9,2,6,8,8,5,8,5];
    let len: number = actual.length = BasicSquareMethod(actual, actual.length, 10);
    assert.equal(len, expected.length);
    assert.deepEqual(actual, expected);
  });

  it('should return 7654321^4 in base 10', function(){
    const actual: number[] = [1,4,0,1,7,9,9,2,6,8,8,5,8,5];
    const expected: number[] = [1,8,6,3,2,6,8,9,4,8,2,7,3,6,5,3,8,8,1,6,5,7,2,6,2,3,4,3];
    let len: number = actual.length = BasicSquareMethod(actual, actual.length, 10);
    assert.equal(len, expected.length);
    assert.deepEqual(actual, expected);
  });

  it('should return 9^2 in base 11', function(){
    const actual: number[] = [9];
    const expected: number[] = [4, 7];
    let len: number = actual.length = BasicSquareMethod(actual, actual.length, 11);
    assert.equal(len, expected.length);
    assert.deepEqual(actual, expected);
  });

  it('should return 9999999^2 in base 10000000', function(){
    const actual: number[] = [9999999];
    const expected: number[] = [1, 9999998];
    let len: number = actual.length = BasicSquareMethod(actual, actual.length, 10000000);
    assert.equal(len, expected.length);
    assert.deepEqual(actual, expected);
  });
});

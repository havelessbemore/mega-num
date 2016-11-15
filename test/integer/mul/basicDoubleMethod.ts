import assert = require('assert');
import BasicDoubleMethod from '../../../src/integer/mul/basicDoubleMethod';

describe('BasicDoubleMethod', function(){

  it('should return 0*2 in base 10', function(){
    const A: number[] = [0];
    const len: number = A.length = BasicDoubleMethod(A, A.length, 10);
    assert.equal(len, 1);
    assert.deepEqual(A, [0]);
  });

  it('should return 1*2 in base 10', function(){
    const A: number[] = [1];
    const len: number = A.length = BasicDoubleMethod(A, A.length, 10);
    assert.equal(len, 1);
    assert.deepEqual(A, [2]);
  });

  it('should return 2*2 in base 10', function(){
    const A: number[] = [2];
    const len: number = A.length = BasicDoubleMethod(A, A.length, 10);
    assert.equal(len, 1);
    assert.deepEqual(A, [4]);
  });

  it('should return 7*2 in base 10', function(){
    const A: number[] = [7];
    const len: number = A.length = BasicDoubleMethod(A, A.length, 10);
    assert.equal(len, 2);
    assert.deepEqual(A, [4, 1]);
  });

  it('should return 1234567*2 in base 10', function(){
    const A: number[] = [7,6,5,4,3,2,1];
    const len: number = A.length = BasicDoubleMethod(A, A.length, 10);
    assert.equal(len, 7);
    assert.deepEqual(A, [4,3,1,9,6,4,2]);
  });

  it('should return 7654321*2 in base 10', function(){
    const actual: number[] = [1,2,3,4,5,6,7];
    const expected: number[] = [2,4,6,8,0,3,5,1];
    let len: number = actual.length = BasicDoubleMethod(actual, actual.length, 10);
    assert.equal(len, expected.length);
    assert.deepEqual(actual, expected);
  });

  it('should return 854,839,628,132,734,960,159,624 * 2 in base 94906265', function(){
    const actual: number[] = [94906264, 94906264, 94906264];
    const expected: number[] = [94906263, 94906264, 94906264, 1];
    let len: number = actual.length = BasicDoubleMethod(actual, actual.length, 94906265);
    assert.equal(len, expected.length);
    assert.deepEqual(actual, expected);
  });
});

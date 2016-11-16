import assert = require('assert');
import KaratsubaMultiplicationMethod from '../../src/mul/karatsubaMultiplicationMethod';

describe('KaratsubaMultiplicationMethod', function(){

  it('should return 1*1 in base 10', function(){
    const A: number[] = [1];
    const B: number[] = [1];
    const C: number[] = [1];
    const len: number = A.length = KaratsubaMultiplicationMethod(A, A.length, B, B.length, 10);
    assert.equal(len, C.length);
    assert.deepEqual(A, C);
  });

  it('should return 1*9 in base 10', function(){
    const A: number[] = [1];
    const B: number[] = [9];
    const C: number[] = [9];
    const len: number = A.length = KaratsubaMultiplicationMethod(A, A.length, B, B.length, 10);
    assert.equal(len, C.length);
    assert.deepEqual(A, C);
  });

  it('should return 9*8 in base 10', function(){
    const A: number[] = [9];
    const B: number[] = [8];
    const C: number[] = [2, 7];
    const len: number = A.length = KaratsubaMultiplicationMethod(A, A.length, B, B.length, 10);
    assert.equal(len, C.length);
    assert.deepEqual(A, C);
  });

  it('should return 8*9 in base 10', function(){
    const A: number[] = [8];
    const B: number[] = [9];
    const C: number[] = [2, 7];
    const len: number = A.length = KaratsubaMultiplicationMethod(A, A.length, B, B.length, 10);
    assert.equal(len, C.length);
    assert.deepEqual(A, C);
  });

  it('should return 123 * 456789 in base 10', function(){
    const A: number[] = [3,2,1];
    const B: number[] = [9,8,7,6,5,4];
    const C: number[] = [7,4,0,5,8,1,6,5];
    const len: number = A.length = KaratsubaMultiplicationMethod(A, A.length, B, B.length, 10);
    assert.equal(len, C.length);
    assert.deepEqual(A, C);
  });

  it('should return 456789 * 123 in base 2', function(){
    const A: number[] = [1,0,1,0,1,0,1,0,0,0,0,1,1,1,1,1,0,1,1];
    const B: number[] = [1,1,0,1,1,1,1];
    const C: number[] = [1,1,1,0,1,0,1,1,0,0,0,0,1,0,1,0,1,0,0,1,1,0,1,0,1,1];
    const len: number = A.length = KaratsubaMultiplicationMethod(A, A.length, B, B.length, 2);
    assert.equal(len, C.length);
    assert.deepEqual(A, C);
  });

  it('should return 987654 * 321 in base 179', function(){
    const A: number[] = [111, 147, 30];
    const B: number[] = [142, 1];
    const C: number[] = [10,130,49,55];
    const len: number = A.length = KaratsubaMultiplicationMethod(A, A.length, B, B.length, 179);
    assert.equal(len, C.length);
    assert.deepEqual(A, C);
  });

  it('should return 1234567 * 1234567 in base 10', function(){
    const A: number[] = [7,6,5,4,3,2,1];
    const B: number[] = [7,6,5,4,3,2,1];
    const C: number[] = [9,8,4,7,7,6,5,5,1,4,2,5,1];
    const len: number = A.length = KaratsubaMultiplicationMethod(A, A.length, B, B.length, 10);
    assert.equal(len, C.length);
    assert.deepEqual(A, C);
  });

  it('should return 1234567 * 1,524,155,677,489 in base 10', function(){
    const A: number[] = [7,6,5,4,3,2,1];
    const B: number[] = [9,8,4,7,7,6,5,5,1,4,2,5,1];
    const C: number[] = [3,6,2,2,6,5,0,9,2,2,0,3,2,7,6,1,8,8,1];
    const len: number = A.length = KaratsubaMultiplicationMethod(A, A.length, B, B.length, 10);
    assert.equal(len, C.length);
    assert.deepEqual(A, C);
  });

  it('should return 1,524,155,677,489 * 1,524,155,677,489 in base 10', function(){
    const A: number[] = [9,8,4,7,7,6,5,5,1,4,2,5,1];
    const B: number[] = [9,8,4,7,7,6,5,5,1,4,2,5,1];
    const C: number[] = [1,2,1,5,4,3,1,8,5,2,5,9,1,2,2,9,2,5,0,5,0,3,2,3,2];
    const len: number = A.length = KaratsubaMultiplicationMethod(A, A.length, B, B.length, 10);
    assert.equal(len, C.length);
    assert.deepEqual(A, C);
  });
});

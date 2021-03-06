import {assert} from 'chai';
import {longMultiplication} from '../../src/algorithm/longMultiplication';

function test(A: number[], minA: number, maxA: number, B: number[], minB: number, maxB: number, C: number[], maxC: number, base: number): void {
  const D: number[] = B.slice();
  const len: number = A.length = longMultiplication(A, minA, maxA, B, minB, maxB, base);
  assert.equal(B.length, D.length);
  assert.deepEqual(B, D);
  assert.equal(len, maxC);
  assert.deepEqual(A, C);
}

describe('longMultiplication', () => {

  it('should return 1*1 in base 10', () => {
    test([1], 0, 1, [1], 0, 1, [1], 1, 10);
  });

  it('should return 1*9 in base 10', () => {
    test([1], 0, 1, [9], 0, 1, [9], 1, 10);
  });

  it('should return 9*8 in base 10', () => {
    test([9], 0, 1, [8], 0, 1, [2,7], 2, 10);
  });

  it('should return 8*9 in base 10', () => {
    test([8], 0, 1, [9], 0, 1, [2,7], 2, 10);
  });

  it('should return 123 * 456789 in base 10', () => {
    test([3,2,1], 0, 3, [9,8,7,6,5,4], 0, 6, [7,4,0,5,8,1,6,5], 8, 10);
  });

  it('should return 456789 * 123 in base 2', () => {
    test(
      [1,0,1,0,1,0,1,0,0,0,0,1,1,1,1,1,0,1,1], 0, 19,
      [1,1,0,1,1,1,1], 0, 7,
      [1,1,1,0,1,0,1,1,0,0,0,0,1,0,1,0,1,0,0,1,1,0,1,0,1,1], 26, 2
    );
  });

  it('should return 987654 * 321 in base 179', () => {
    test(
      [111, 147, 30], 0, 3,
      [142, 1], 0, 2,
      [10,130,49,55], 4, 179
    );
  });

  it('should return 1234567 * 1234567 in base 10', () => {
    test(
      [7,6,5,4,3,2,1], 0, 7,
      [7,6,5,4,3,2,1], 0, 7,
      [9,8,4,7,7,6,5,5,1,4,2,5,1], 13, 10
    );
  });

  it('should return 1234567 * 1,524,155,677,489 in base 10', () => {
    test(
      [7,6,5,4,3,2,1], 0, 7,
      [9,8,4,7,7,6,5,5,1,4,2,5,1], 0, 13,
      [3,6,2,2,6,5,0,9,2,2,0,3,2,7,6,1,8,8,1], 19, 10
    );
  });

  it('should return 9,870,006,540,003,210 * 123,000,456,000,789 in base 10', () => {
    test(
      [0,1,2,3,0,0,0,4,5,6,0,0,0,7,8,9], 0, 16,
      [9,8,7,0,0,0,6,5,4,0,0,0,3,2,1], 0, 15,
      [0,9,6,2,3,5,2,2,8,3,2,6,6,0,5,4,6,1,1,5,1,5,0,3,5,1,0,4,1,2,1], 31, 10
    );
  });

  it('should return 123,000,456,000,789 * 9,870,006,540,003,210 in base 10', () => {
    test(
      [9,8,7,0,0,0,6,5,4,0,0,0,3,2,1], 0, 15,
      [0,1,2,3,0,0,0,4,5,6,0,0,0,7,8,9], 0, 16,
      [0,9,6,2,3,5,2,2,8,3,2,6,6,0,5,4,6,1,1,5,1,5,0,3,5,1,0,4,1,2,1], 31, 10
    );
  });

  it('should return 1,524,155,677,489 * 1,524,155,677,489 in base 10', () => {
      test(
        [9,8,4,7,7,6,5,5,1,4,2,5,1], 0, 13,
        [9,8,4,7,7,6,5,5,1,4,2,5,1], 0, 13,
        [1,2,1,5,4,3,1,8,5,2,5,9,1,2,2,9,2,5,0,5,0,3,2,3,2], 25, 10
      );
      test(
        [0,0,9,8,4,7,7,6,5,5,1,4,2,5,1], 2, 15,
        [9,8,4,7,7,6,5,5,1,4,2,5,1], 0, 13,
        [0,0,1,2,1,5,4,3,1,8,5,2,5,9,1,2,2,9,2,5,0,5,0,3,2,3,2], 27, 10
      );
      test(
        [9,8,4,7,7,6,5,5,1,4,2,5,1], 0, 13,
        [0,0,9,8,4,7,7,6,5,5,1,4,2,5,1], 2, 15,
        [1,2,1,5,4,3,1,8,5,2,5,9,1,2,2,9,2,5,0,5,0,3,2,3,2], 25, 10
      );
      test(
        [0,0,0,9,8,4,7,7,6,5,5,1,4,2,5,1], 3, 16,
        [0,9,8,4,7,7,6,5,5,1,4,2,5,1], 1, 14,
        [0,0,0,1,2,1,5,4,3,1,8,5,2,5,9,1,2,2,9,2,5,0,5,0,3,2,3,2], 28, 10
      );
  });

});

import {assert} from 'chai';
import {longSquare} from '../../src/algorithm/longSquare';

function test(A: number[], minA: number, maxA: number, B: number[], maxB: number, base: number): void {
  const len: number = A.length = longSquare(A, minA, maxA, base);
  assert.equal(len, maxB);
  assert.deepEqual(A, B);
}

describe('longSquare', () => {

  it('should return 1^2 in base 10', () => {
    test([1], 0, 1, [1], 1, 10);
  });

  it('should return 2^2 in base 10', () => {
    test([2], 0, 1, [4], 1, 10);
  });

  it('should return 4^2 in base 10', () => {
    test([4], 0, 1, [6,1], 2, 10);
  });

  it('should return 1234567^2 in base 10', () => {
    test(
      [7,6,5,4,3,2,1], 0, 7,
      [9,8,4,7,7,6,5,5,1,4,2,5,1], 13, 10
    );
  });

  it('should return 1234567^4 in base 10', () => {
    test(
      [9,8,4,7,7,6,5,5,1,4,2,5,1], 0, 13,
      [1,2,1,5,4,3,1,8,5,2,5,9,1,2,2,9,2,5,0,5,0,3,2,3,2], 25, 10
    );
  });

  it('should return 7654321^2 in base 10', () => {
    test(
      [1,2,3,4,5,6,7], 0, 7,
      [1,4,0,1,7,9,9,2,6,8,8,5,8,5], 14, 10
    );
  });

  it('should return 7654321^4 in base 10', () => {
    test(
      [1,4,0,1,7,9,9,2,6,8,8,5,8,5], 0, 14,
      [1,8,6,3,2,6,8,9,4,8,2,7,3,6,5,3,8,8,1,6,5,7,2,6,2,3,4,3], 28, 10
    );
  });

  it('should return 9^2 in base 11', () => {
    test([9], 0, 1, [4,7], 2, 11);
  });

  it('should return 9999999^2 in base 10000000', () => {
    test(
      [9999999], 0, 1,
      [1, 9999998], 2, 10000000
    );
  });

  it('should return 10000001^2 in base 10', () => {
    test(
      [1,0,0,0,0,0,0,1], 0, 8,
      [1,0,0,0,0,0,0,2,0,0,0,0,0,0,1], 15, 10
    );
  });

  it('should return 90000009^2 in base 10',
    () => {
      test(
        [9,0,0,0,0,0,0,9], 0, 8,
        [1,8,0,0,0,0,0,2,6,1,0,0,0,0,1,8], 16, 10
      );
      test(
        [0,0,9,0,0,0,0,0,0,9], 2, 10,
        [0,0,1,8,0,0,0,0,0,2,6,1,0,0,0,0,1,8], 18, 10
      );
      test(
        [9,0,0,0,0,0,0,9,0,0,0], 0, 8,
        [1,8,0,0,0,0,0,2,6,1,0,0,0,0,1,8], 16, 10
      );
      test(
        [0,0,0,0,0,0,9,0,0,0,0,0,0,9,0,0,0], 6, 14,
        [0,0,0,0,0,0,1,8,0,0,0,0,0,2,6,1,0,0,0,0,1,8], 22, 10
      );
  });

});
